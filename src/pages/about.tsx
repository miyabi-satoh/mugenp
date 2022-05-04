import { Container, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { MathJax } from "better-react-mathjax";
import type { NextPage } from "next";
import { PropsWithChildren } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Layout } from "~/components/layout";

const Heading2 = ({ children }: PropsWithChildren<{}>) => (
  <Heading as="h2" size="lg" mb={4}>
    {children}
  </Heading>
);

const Heading3 = ({ children }: PropsWithChildren<{}>) => (
  <Heading
    as="h3"
    size="md"
    mt={8}
    mb={4}
    pl={2}
    py={2}
    borderLeftColor="tomato"
    borderLeftWidth={10}
  >
    {children}
  </Heading>
);

const Heading4 = ({ children }: PropsWithChildren<{}>) => (
  <Heading as="h4" size="sm" mb={1}>
    {children}
  </Heading>
);

const Paragraph = ({ children }: PropsWithChildren<{}>) => (
  <Text as="p" mb={3}>
    {children}
  </Text>
);

const ExternalLink = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => (
  <Link href={href} isExternal d="inline-flex" alignItems="center" color="teal">
    {children}
    <Icon as={FaExternalLinkAlt} mx={2} />
  </Link>
);

const About: NextPage = () => {
  return (
    <Layout>
      <Container p={4} maxW="container.md">
        <Heading2>このサイトについて</Heading2>
        <Paragraph>
          現役の塾講師が作成した、公立の中学校における数学の主要な計算問題を無限に演習できる無料サイトです。
        </Paragraph>

        <Heading3>計算能力の向上に役立ちます</Heading3>
        <Paragraph>
          計算能力を向上させるには、一にも二にも反復演習です。
          <br />
          このサイトは問題をランダムに自動生成するので、様々なパターンの問題を繰り返し演習することができます。
        </Paragraph>
        <Paragraph>
          また、独自の判定ロジックにより、正解数に応じて問題のパターンが変化するようになっています。
          これにより適度なレベルの演習を積むことができます。
        </Paragraph>

        <Heading3>速い・安い・便利</Heading3>
        <Paragraph>
          このサイトのコンテンツはすべて無料で利用できます。
          <br />
          面倒なユーザー登録などもありません。
        </Paragraph>
        <Paragraph>
          問題生成は端末側で行われるので、ページが表示された後はサーバーとの通信を必要としません。
        </Paragraph>

        <Heading3>主要な技術的要素</Heading3>
        <Paragraph>
          このサイトは主に以下のプロダクトやサービスを使用しています。
        </Paragraph>

        <Heading4>
          <ExternalLink href="https://nextjs.org/">Next.js</ExternalLink>
        </Heading4>
        <Paragraph>
          強力な React フレームワークです。
          <ExternalLink href="https://ja.reactjs.org/">React</ExternalLink>
          はインタラクティブなユーザインターフェイス構築のための JavaScript
          ライブラリです。
          <ExternalLink href="https://developer.mozilla.org/ja/docs/Web/JavaScript">
            JavaScript
          </ExternalLink>
          はウェブページでよく使用されるスクリプト言語ですが、このサイトではTypeScriptを採用しています。
          <ExternalLink href="https://www.typescriptlang.org/">
            TypeScript
          </ExternalLink>
          はマイクロソフトによって開発されたJavaScriptの拡張言語で、静的型付けやクラスベースオブジェクト指向が特徴です。
        </Paragraph>

        <Heading4>
          <ExternalLink href="https://chakra-ui.com/">Chakra UI</ExternalLink>
        </Heading4>
        <Paragraph>シンプルなUIコンポーネントフレームワークです。</Paragraph>

        <Heading4>
          <ExternalLink href="https://github.com/fast-reflexes/better-react-mathjax">
            better-react-mathjax
          </ExternalLink>
        </Heading4>
        <Paragraph>
          MathJaxを使うためのReactコンポーネントです。
          <ExternalLink href="https://github.com/mathjax/MathJax">
            MathJax
          </ExternalLink>
          は<MathJax inline>{"\\(\\LaTeX\\)"}</MathJax>
          等で記述された数式をウェブブラウザで表示するJavaScriptライブラリです。
          <ExternalLink href="https://ja.wikipedia.org/wiki/LaTeX">
            <MathJax inline>{"\\(\\LaTeX\\)"}</MathJax>
          </ExternalLink>
          は学術論文などでも使用される、テキストベースの組版処理システムです。
        </Paragraph>

        <Heading4>
          <ExternalLink href="https://jestjs.io/ja/">Jest</ExternalLink>
        </Heading4>
        <Paragraph>
          シンプルさを重視した、 快適な JavaScript
          テスティングフレームワークです。
        </Paragraph>

        <Heading4>
          <ExternalLink href="https://github.com/puppeteer/puppeteer">
            Puppeteer
          </ExternalLink>
        </Heading4>
        <Paragraph>
          ChromeまたはChromiumを制御するためのライブラリです。
          問題をランダムに生成する性質上、 Jestだけではテストできないので
          Puppeteerでスクリーンショットを撮り、問題・解答を目視で検証しています。
        </Paragraph>

        <Heading4>
          <ExternalLink href="https://web.arena.ne.jp/vps-cloud/">
            WebARENA VPSクラウド
          </ExternalLink>
        </Heading4>
        <Paragraph>
          このサイトをホスティングしているNTTPCコミュニケーションズ様のサービスです。
          いっちゃん安い月額396円（税込）のプランを使っています。
          <ExternalLink href="https://ja.wikipedia.org/wiki/VPS">
            VPS
          </ExternalLink>
          は Virtual Private Server
          の略称で、一台の物理的なサーバコンピュータ上に構築された仮想的なサーバコンピュータのことです。
        </Paragraph>

        <Heading3>製作者について</Heading3>
        <Paragraph>
          某個別指導塾で講師をしています。
          某大学の工学部情報処理学科卒、某この木なんの木気になる木系列の会社でSEをしていたという経歴はありますがプログラミングはすべて独学です。
        </Paragraph>
        <Paragraph>
          プログラミングに限らず、何事もすべて独力で学べます。
          学ぶためのツールやリソースは探せばいくらでもあります。
          大切なのは、易しすぎず難しすぎず、適切なレベルの教材に出会えるか？です。
        </Paragraph>
        <Paragraph>
          このサイトが、利用するすべての人にとって「適切なレベル」であるように研究を続けます。
        </Paragraph>
      </Container>
    </Layout>
  );
};

export default About;
