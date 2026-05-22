import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicPages = [
  { file: 'index.html', canonical: 'https://ikuapp.jp/' },
  { file: 'privacy/index.html', canonical: 'https://ikuapp.jp/privacy/' },
  { file: 'terms/index.html', canonical: 'https://ikuapp.jp/terms/' },
  { file: 'support/index.html', canonical: 'https://ikuapp.jp/support/' },
  { file: 'drink/index.html', canonical: 'https://ikuapp.jp/drink/' },
  { file: 'date/index.html', canonical: 'https://ikuapp.jp/date/' },
  { file: 'work/index.html', canonical: 'https://ikuapp.jp/work/' },
  { file: 'friend/index.html', canonical: 'https://ikuapp.jp/friend/' },
  { file: 'family/index.html', canonical: 'https://ikuapp.jp/family/' },
  { file: 'matching/index.html', canonical: 'https://ikuapp.jp/matching/' },
  { file: 'tired/index.html', canonical: 'https://ikuapp.jp/tired/' },
  { file: 'money/index.html', canonical: 'https://ikuapp.jp/money/' },
  { file: 'weekend/index.html', canonical: 'https://ikuapp.jp/weekend/' },
  { file: 'after-work/index.html', canonical: 'https://ikuapp.jp/after-work/' },
  { file: 'overbooked/index.html', canonical: 'https://ikuapp.jp/overbooked/' },
  { file: 'solo-time/index.html', canonical: 'https://ikuapp.jp/solo-time/' },
  { file: 'fomo/index.html', canonical: 'https://ikuapp.jp/fomo/' },
  { file: 'relationship/index.html', canonical: 'https://ikuapp.jp/relationship/' },
  { file: 'decline/index.html', canonical: 'https://ikuapp.jp/decline/' },
];
const allPages = [...publicPages, { file: '404.html' }];

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function localPathForUrl(url) {
  if (url === '/') {
    return 'index.html';
  }

  let nextPath = url.replace(/^\//, '');
  if (nextPath.endsWith('/')) {
    nextPath += 'index.html';
  }

  return nextPath;
}

for (const { file } of allPages) {
  const html = read(file);
  assert(/<title>[^<]+<\/title>/.test(html), `${file}: missing title`);
  assert(html.includes('data-domain="ikuapp.jp" src="https://plausible.io/js/script.js"'), `${file}: missing Plausible script`);
  assert(html.includes('src="/assets/analytics.js"'), `${file}: missing local analytics script`);

  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const targetPath = localPathForUrl(match[1]);
    assert(fs.existsSync(path.join(root, targetPath)), `${file}: missing local target ${match[1]}`);
  }
}

for (const { file, canonical } of publicPages) {
  const html = read(file);
  assert(html.includes(`<link rel="canonical" href="${canonical}">`), `${file}: missing canonical`);
  assert(html.includes(`<meta property="og:url" content="${canonical}">`), `${file}: missing og:url`);
  assert(/<meta property="og:title" content="[^"]+">/.test(html), `${file}: missing og:title`);
  assert(/<meta property="og:description" content="[^"]+">/.test(html), `${file}: missing og:description`);
  assert(html.includes('<meta name="twitter:card" content="summary">'), `${file}: missing twitter card`);
}

const robots = read('robots.txt');
assert(robots.includes('Sitemap: https://ikuapp.jp/sitemap.xml'), 'robots.txt: missing sitemap');

const sitemap = read('sitemap.xml');
for (const { canonical } of publicPages) {
  assert(sitemap.includes(`<loc>${canonical}</loc>`), `sitemap.xml: missing ${canonical}`);
}

const analytics = read('assets/analytics.js');
assert(analytics.includes('App Store Click'), 'assets/analytics.js: missing App Store click tracking');
assert(analytics.includes('iku_latest_touch'), 'assets/analytics.js: missing attribution storage');

console.log('Static site checks passed.');
