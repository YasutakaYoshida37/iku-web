import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const appStoreUrl = 'https://apps.apple.com/app/id6769068322';

const pages = [
  {
    slug: 'tired',
    title: '疲れているけど誘いに行くか迷うとき | Iku?',
    description:
      '疲れているけど誘いに行くか迷うとき、楽しさ・体力・翌日の負担・関係性を5問で整理。Iku?は予定にする前の迷いを考えるiPhoneアプリです。',
    ogDescription: '疲れているけど誘いに行くか迷うとき、楽しさ・体力・翌日の負担・関係性を5問で整理。',
    eyebrow: '疲れているけど誘いに行くか迷うとき',
    h1: '疲れてる。でも、行けば楽しいかもしれない。',
    lead:
      '体力は少ない。でも会いたい気持ちも少しある。Iku? は、今の余力と行く理由を分けて見ながら、予定にする前の迷いを整理します。',
    summaryLabel: '確認すること',
    points: [
      '今の体力はどれくらい残っているか',
      '帰宅時間や翌日の予定に響かないか',
      'その場で得られそうなものがあるか',
      '見送った後に気になり続けそうか',
      '無理していないか'
    ],
    sections: [
      {
        heading: '疲れている日は、楽しさだけで決めにくい',
        body:
          '予定そのものが嫌ではなくても、体力が残っていない日は判断が重くなります。行ったら楽しいかもしれない気持ちと、休みたい気持ちを同時に扱う必要があります。'
      },
      {
        heading: '余力を予定の前に見えるようにする',
        body:
          'Iku? は、期待値だけでなく体力・時間・翌日の負担も判断材料にします。行くなら納得して行く。休むなら必要な休みとして選ぶ。そのための5問です。'
      }
    ],
    links: [
      { href: '/overbooked/', label: '予定を入れすぎて疲れるとき' },
      { href: '/after-work/', label: '仕事終わりの予定に迷うとき' },
      { href: '/solo-time/', label: '一人の時間がほしいとき' }
    ]
  },
  {
    slug: 'money',
    title: 'お金がきつい予定に行くか迷うとき | Iku?',
    description:
      'お金がきつい予定に行くか迷うとき、会いたい気持ち・出費・後悔・関係性を5問で整理。Iku?はお誘いの迷いを考えるiPhoneアプリです。',
    ogDescription: 'お金がきつい予定に行くか迷うとき、会いたい気持ち・出費・後悔・関係性を5問で整理。',
    eyebrow: 'お金がきつい予定に行くか迷うとき',
    h1: '会いたい。でも、今月の出費が気になる。',
    lead:
      '楽しい予定でも、会費・交通費・二次会まで考えると迷うことがあります。Iku? は、お金の負担を無視せずに行くか見送るかを整理します。',
    summaryLabel: '見るポイント',
    points: [
      '今回の出費は今月の負担になりすぎないか',
      'その相手や場に今お金を使いたいか',
      '見送ったときの後悔は大きそうか',
      '安く済ませる選択肢はあるか',
      '無理な支出を正当化していないか'
    ],
    sections: [
      {
        heading: 'お金の迷いは、気持ちの弱さではありません',
        body:
          '「お金がきついから迷う」と感じても、それは大事な判断材料です。予定の楽しさと生活の安心は、どちらも軽く扱わなくていいものです。'
      },
      {
        heading: '行く理由と守れるものを並べて見る',
        body:
          'Iku? は、行くメリットと見送ることで守れるお金・時間・体力を分けて整理します。断るためではなく、納得して選ぶためのアプリです。'
      }
    ],
    links: [
      { href: '/drink/', label: '飲み会に行くか迷うとき' },
      { href: '/date/', label: 'デートに行くべきか迷ったとき' },
      { href: '/decline/', label: '断ると気まずいとき' }
    ]
  },
  {
    slug: 'friend',
    title: '友人の誘いに行くか迷うとき | Iku?',
    description:
      '友人の誘いに行くか迷うとき、会いたい気持ち・疲れ・関係性・後悔を5問で整理。Iku?は予定にする前の迷いを考えるiPhoneアプリです。',
    ogDescription: '友人の誘いに行くか迷うとき、会いたい気持ち・疲れ・関係性・後悔を5問で整理。',
    eyebrow: '友人の誘いに行くか迷うとき',
    h1: '友達だからこそ、迷う日がある。',
    lead:
      '大事な友人でも、毎回すぐ行けるわけではありません。Iku? は、会いたい気持ちと今の自分の余力を一緒に見て、予定にする前の迷いを整理します。',
    summaryLabel: '整理すること',
    points: [
      'その友人に今会いたい気持ちがあるか',
      '疲れや予定の詰まり具合はどうか',
      '見送ったら関係に響きそうか',
      '別の日に変える余地があるか',
      '行かない選択に罪悪感だけで反応していないか'
    ],
    sections: [
      {
        heading: '友人の誘いは、断りにくさも混ざる',
        body:
          '好きな相手からの誘いほど、迷いは複雑です。行きたい気持ちがある一方で、疲れや他の予定が重なることもあります。'
      },
      {
        heading: '関係性と自分の余力を両方見る',
        body:
          'Iku? は、友人との関係だけでなく、自分の体力や時間も判断材料にします。大事な関係を続けるためにも、毎回の無理を当たり前にしない視点が必要です。'
      }
    ],
    links: [
      { href: '/overbooked/', label: '予定を入れすぎて疲れるとき' },
      { href: '/solo-time/', label: '一人の時間がほしいとき' },
      { href: '/decline/', label: '断ると気まずいとき' }
    ]
  },
  {
    slug: 'family',
    title: '家族の予定に行くか迷うとき | Iku?',
    description:
      '家族の予定に行くか迷うとき、関係性・負担・気持ち・後悔を5問で整理。Iku?はお誘いの迷いを考えるiPhoneアプリです。',
    ogDescription: '家族の予定に行くか迷うとき、関係性・負担・気持ち・後悔を5問で整理。',
    eyebrow: '家族の予定に行くか迷うとき',
    h1: '家族だから、断りにくい。',
    lead:
      '帰省、食事、親戚の集まり。家族の予定は、行きたいかどうかだけでは決めにくいことがあります。Iku? は、関係性と負担を分けて整理します。',
    summaryLabel: '判断材料',
    points: [
      '自分にとって意味のある時間になりそうか',
      '移動・時間・気持ちの負担は重すぎないか',
      '見送ることで困る人がいるか',
      '代わりの連絡や別日の選択肢はあるか',
      '義務感だけで決めようとしていないか'
    ],
    sections: [
      {
        heading: '家族の予定は、気持ちと義務が絡みやすい',
        body:
          '家族だから行くべき、と思う一方で、自分の時間や体力を守りたい日もあります。その両方を認めないと、判断が苦しくなります。'
      },
      {
        heading: '行く理由を持つか、見送る理由を言語化する',
        body:
          'Iku? は、予定を一方的に減らすアプリではありません。行くなら自分なりの理由を持って行く。見送るなら何を守るのかを整理する。そのための短い5問です。'
      }
    ],
    links: [
      { href: '/relationship/', label: '人間関係で断れないとき' },
      { href: '/tired/', label: '疲れているけど迷うとき' },
      { href: '/decline/', label: '断ると気まずいとき' }
    ]
  },
  {
    slug: 'matching',
    title: 'マッチングアプリの誘いに行くか迷うとき | Iku?',
    description:
      'マッチングアプリの誘いに行くか迷うとき、期待・安全面・違和感・負担を5問で整理。Iku?はデート前の迷いを考えるiPhoneアプリです。',
    ogDescription: 'マッチングアプリの誘いに行くか迷うとき、期待・安全面・違和感・負担を5問で整理。',
    eyebrow: 'マッチングアプリの誘いに行くか迷うとき',
    h1: '会ってみたい。でも、少し慎重でいたい。',
    lead:
      'メッセージは悪くない。でも初対面だから気になることもある。Iku? は、期待と違和感を一緒に見ながら、会う前の迷いを5問で整理します。',
    summaryLabel: '確認すること',
    points: [
      '会ってみたい期待があるか',
      '場所や時間に安心できるか',
      'やり取りの中に違和感がないか',
      '当日の負担が大きすぎないか',
      '断ってもよい感覚を持てているか'
    ],
    sections: [
      {
        heading: '初対面の予定は、期待と警戒が同時にある',
        body:
          'マッチングアプリの誘いは、会ってみたい気持ちだけでなく、安全面や小さな違和感も判断材料になります。迷うこと自体は自然です。'
      },
      {
        heading: '違和感を小さく扱わない',
        body:
          'Iku? は、楽しそうかどうかだけでなく、安心して行けそうかも確認します。会うなら気持ちよく会うために、見送るなら無理をしないために、整理してから決められます。'
      }
    ],
    links: [
      { href: '/date/', label: 'デートに行くべきか迷ったとき' },
      { href: '/relationship/', label: '人間関係で断れないとき' },
      { href: '/decline/', label: '断ると気まずいとき' }
    ]
  },
  {
    slug: 'weekend',
    title: '休日の予定に行くか迷うとき | Iku?',
    description:
      '休日の予定に行くか迷うとき、休みたい気持ち・会いたい気持ち・負担・後悔を5問で整理。Iku?は予定前の迷いを考えるiPhoneアプリです。',
    ogDescription: '休日の予定に行くか迷うとき、休みたい気持ち・会いたい気持ち・負担・後悔を5問で整理。',
    eyebrow: '休日の予定に行くか迷うとき',
    h1: '休みたい休日と、会いたい気持ち。',
    lead:
      'せっかくの休日だから出かけたい。でも何もしない時間もほしい。Iku? は、休日の予定を入れる前に、自分の余力と期待を整理します。',
    summaryLabel: '見るポイント',
    points: [
      '休む時間をどれくらい必要としているか',
      'その予定に休日を使いたいと思えるか',
      '移動や準備の負担は重くないか',
      '行かない後悔と休まない後悔はどちらが大きそうか',
      '予定を短くする選択肢はあるか'
    ],
    sections: [
      {
        heading: '休日は、空けることにも価値がある',
        body:
          '休日の予定は楽しい一方で、休息の時間も奪います。予定を入れることと、空白を残すことのどちらにも意味があります。'
      },
      {
        heading: '休みたい気持ちも判断材料にする',
        body:
          'Iku? は、休日をどう使うかを5問で整理します。行くかどうかだけでなく、今の自分に必要な時間を見失わないためのアプリです。'
      }
    ],
    links: [
      { href: '/solo-time/', label: '一人の時間がほしいとき' },
      { href: '/overbooked/', label: '予定を入れすぎて疲れるとき' },
      { href: '/friend/', label: '友人の誘いに迷うとき' }
    ]
  },
  {
    slug: 'after-work',
    title: '仕事終わりの予定に行くか迷うとき | Iku?',
    description:
      '仕事終わりの予定に行くか迷うとき、疲れ・翌日・関係性・楽しさを5問で整理。Iku?は予定にする前の迷いを考えるiPhoneアプリです。',
    ogDescription: '仕事終わりの予定に行くか迷うとき、疲れ・翌日・関係性・楽しさを5問で整理。',
    eyebrow: '仕事終わりの予定に行くか迷うとき',
    h1: '今日の自分に、まだ余力はあるか。',
    lead:
      '仕事後の予定は、その日の疲れで急に重くなることがあります。Iku? は、行くメリットと帰って休むメリットを並べて整理します。',
    summaryLabel: '整理すること',
    points: [
      '今の疲れはどれくらい強いか',
      '帰宅時間や睡眠に響かないか',
      '行くことで得られる関係性や楽しさはあるか',
      '見送っても別日にできるか',
      '仕事の疲れで判断が雑になっていないか'
    ],
    sections: [
      {
        heading: '朝は行くつもりでも、夜には迷うことがある',
        body:
          '仕事が終わる頃には、体力も気分も変わっています。予定を入れた時点の自分と、今の自分が違うなら、改めて考えても構いません。'
      },
      {
        heading: 'その日の余力で決める',
        body:
          'Iku? は、仕事終わりの疲れや翌日の負担を判断材料に入れます。勢いで行く前に、5問だけ確認してから予定にできます。'
      }
    ],
    links: [
      { href: '/work/', label: '仕事の付き合いに迷うとき' },
      { href: '/tired/', label: '疲れているけど迷うとき' },
      { href: '/drink/', label: '飲み会に行くか迷うとき' }
    ]
  },
  {
    slug: 'fomo',
    title: '行かないと後悔しそうな予定に迷うとき | Iku?',
    description:
      '行かないと後悔しそうな予定に迷うとき、得られるもの・逃しそうなもの・負担を5問で整理。Iku?はお誘いの迷いを考えるiPhoneアプリです。',
    ogDescription: '行かないと後悔しそうな予定に迷うとき、得られるもの・逃しそうなもの・負担を5問で整理。',
    eyebrow: '行かないと後悔しそうな予定に迷うとき',
    h1: '逃したくない気持ちも、判断材料。',
    lead:
      'みんなが行く、話題になりそう、ここで行かないと後悔しそう。Iku? は、その気持ちと実際の負担を分けて整理します。',
    summaryLabel: '確認すること',
    points: [
      '行くことで得られそうなものは何か',
      '見送った後に本当に後悔しそうか',
      '今の体力や時間に無理はないか',
      '周りに合わせたいだけになっていないか',
      '短時間だけ参加する選択肢はあるか'
    ],
    sections: [
      {
        heading: '行かない後悔は、強く見えやすい',
        body:
          '楽しそうな予定ほど、見送ることが損に感じられます。ただ、その場の勢いだけで判断すると、自分の負担を後回しにしてしまうこともあります。'
      },
      {
        heading: '後悔と負担を同じ画面に置く',
        body:
          'Iku? は、行くことで得られるものと、見送ることで守れるものを一緒に見ます。行かない後悔だけでなく、行った後の疲れも含めて整理できます。'
      }
    ],
    links: [
      { href: '/friend/', label: '友人の誘いに迷うとき' },
      { href: '/weekend/', label: '休日の予定に迷うとき' },
      { href: '/overbooked/', label: '予定を入れすぎて疲れるとき' }
    ]
  },
  {
    slug: 'relationship',
    title: '人間関係で誘いを断れないとき | Iku?',
    description:
      '人間関係で誘いを断れないとき、関係性・罪悪感・自分の余力・後悔を5問で整理。Iku?はお誘いの迷いを考えるiPhoneアプリです。',
    ogDescription: '人間関係で誘いを断れないとき、関係性・罪悪感・自分の余力・後悔を5問で整理。',
    eyebrow: '人間関係で誘いを断れないとき',
    h1: '関係を壊したくなくて、迷うときに。',
    lead:
      '本当は休みたい。でも断ったら悪く思われそう。Iku? は、相手との関係と自分の余力を分けて見ながら、行くかどうかを整理します。',
    summaryLabel: '見るポイント',
    points: [
      '断ったら本当に関係が悪くなりそうか',
      '行くことで関係に良い意味がありそうか',
      '自分の負担を軽く見積もっていないか',
      '代替案や別日の提案ができそうか',
      '罪悪感だけで予定を入れていないか'
    ],
    sections: [
      {
        heading: '断れない理由は、予定そのものの外にある',
        body:
          '誘いを断れないとき、迷いの中心は予定の内容ではなく人間関係かもしれません。その場合は、相手への気遣いと自分の余力を分けて見る必要があります。'
      },
      {
        heading: '相手も自分も雑に扱わない',
        body:
          'Iku? は、相手との関係を大事にしながら、自分の体力や時間も判断材料にします。無理して行く以外の選択肢を考えるきっかけになります。'
      }
    ],
    links: [
      { href: '/decline/', label: '断ると気まずいとき' },
      { href: '/family/', label: '家族の予定に迷うとき' },
      { href: '/work/', label: '仕事の付き合いに迷うとき' }
    ]
  },
  {
    slug: 'solo-time',
    title: '一人の時間がほしいのに予定に迷うとき | Iku?',
    description:
      '一人の時間がほしいのに予定に迷うとき、休む必要・会いたい気持ち・関係性・後悔を5問で整理。Iku?は予定前の迷いを考えるiPhoneアプリです。',
    ogDescription: '一人の時間がほしいのに予定に迷うとき、休む必要・会いたい気持ち・関係性・後悔を5問で整理。',
    eyebrow: '一人の時間がほしいのに予定に迷うとき',
    h1: '一人でいたい気持ちも、大事な予定。',
    lead:
      '誰かと会うのが嫌なわけではない。ただ、一人で回復する時間がほしい。Iku? は、その感覚を予定の判断材料として扱います。',
    summaryLabel: '整理すること',
    points: [
      '今どれくらい一人の時間が必要か',
      '会うことで得られそうなものはあるか',
      '見送った後の関係はどうなりそうか',
      '短時間や別日に変えられるか',
      '休むことに罪悪感を持ちすぎていないか'
    ],
    sections: [
      {
        heading: '一人の時間は、余った時間ではありません',
        body:
          '回復する時間が必要な日はあります。予定を入れないことは、誰かを大事にしていないという意味ではありません。'
      },
      {
        heading: '休む理由を自分の中で持つ',
        body:
          'Iku? は、会いたい気持ちと休みたい気持ちを同時に整理します。行くなら気持ちよく、見送るなら必要な回復として選べるようにします。'
      }
    ],
    links: [
      { href: '/weekend/', label: '休日の予定に迷うとき' },
      { href: '/tired/', label: '疲れているけど迷うとき' },
      { href: '/friend/', label: '友人の誘いに迷うとき' }
    ]
  }
];

function renderLinks(links) {
  return links.map((link) => `            <a href="${link.href}">${link.label}</a>`).join('\n');
}

function renderPoints(points) {
  return points.map((point) => `              <li>${point}</li>`).join('\n');
}

function renderSections(sections) {
  return sections
    .map(
      (section) => `          <h2>${section.heading}</h2>
          <p>
            ${section.body}
          </p>`
    )
    .join('\n');
}

function renderPage(page) {
  const canonical = `https://ikuapp.jp/${page.slug}/`;

  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${page.title}</title>
    <meta name="description" content="${page.description}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:site_name" content="Iku?">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.ogDescription}">
    <meta property="og:url" content="${canonical}">
    <meta name="twitter:card" content="summary">
    <link rel="stylesheet" href="/assets/styles.css">
    <script>
      window.plausible = window.plausible || function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
    </script>
    <script defer data-domain="ikuapp.jp" src="https://plausible.io/js/script.js"></script>
    <script defer src="/assets/analytics.js"></script>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="/">Iku?</a>
      <nav class="nav" aria-label="Main navigation">
        <a href="/#demo-title">Demo</a>
        <a href="/drink/">Drink</a>
        <a href="/date/">Date</a>
        <a href="/support/">Support</a>
      </nav>
    </header>

    <main>
      <article class="guide-hero">
        <div class="container guide-layout">
          <div>
            <p class="eyebrow">${page.eyebrow}</p>
            <h1>${page.h1}</h1>
            <p class="lead">
              ${page.lead}
            </p>
            <div class="actions left">
              <a class="button primary" href="${appStoreUrl}">App Storeで見る</a>
              <a class="button secondary" href="/#demo-title">Webで5問を試す</a>
            </div>
          </div>
          <aside class="guide-summary" aria-label="${page.eyebrow}の整理">
            <strong>${page.summaryLabel}</strong>
            <ol>
${renderPoints(page.points)}
            </ol>
          </aside>
        </div>
      </article>

      <section class="section">
        <div class="container article-body">
${renderSections(page.sections)}
          <div class="guide-links">
${renderLinks(page.links)}
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <strong>Iku?</strong>
        <nav class="footer-links" aria-label="Footer navigation">
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms</a>
          <a href="/support/">Support</a>
        </nav>
      </div>
    </footer>
  </body>
</html>
`;
}

for (const page of pages) {
  const dir = path.join(root, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderPage(page));
}

console.log(`Generated ${pages.length} extra guide pages.`);
