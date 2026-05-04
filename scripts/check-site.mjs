import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicPages = [
  { file: 'index.html', canonical: 'https://ikuapp.jp/' },
  { file: 'privacy/index.html', canonical: 'https://ikuapp.jp/privacy/' },
  { file: 'terms/index.html', canonical: 'https://ikuapp.jp/terms/' },
  { file: 'support/index.html', canonical: 'https://ikuapp.jp/support/' },
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

console.log('Static site checks passed.');
