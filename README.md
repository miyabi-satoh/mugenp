2022.05.16

![OGP Image](public/mugenp.png)

[Node.js](https://nodejs.org/) v16 環境で開発・運用しています。<br />
公開サイトは https://mugenp.amiiby.com です。

[React](https://reactjs.org/) フレームワークに [Next.js](https://nextjs.org/) v12 を使用しています。<br />
基本的に [TypeScript](https://www.typescriptlang.org/) で記述しています。

UI フレームワークに [Chakra-UI](https://chakra-ui.com/) v2 を使用しています。

数式の表示に [better-react-mathjax](https://github.com/fast-reflexes/better-react-mathjax) を使用しています。

有理数の処理に [Fraction.js](https://github.com/infusion/Fraction.js/) を使用しています。

前身のプロジェクトとして [mosq](https://github.com/miyabi-satoh/mosq) があります。<br />
このときはバックエンドに [Django](https://www.djangoproject.com/) を使用して、事前にデータベースへ問題を登録していました。
また、画面上に問題を表示するのではなく、サーバー側で LaTeX ファイルから PDF ファイルを生成して表示する仕組みでした。

あるとき、ふと「リアルタイムにランダムに問題生成して画面表示で良くない？ 直近の出題とかぶらなければ良くない？」と思ってリライトした次第です。

最終的には、単元を横断して問題を出せるようにしたい。
というか、数学が得意だろうと苦手だろうと、役に立つサイトにしたい。
