import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "날씨 앱",
  description: "날씨 정보를 확인하세요",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="h-screen bg-blue-500 relative">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={inter.className}>
        {/* <header>
          <h1>{metadata.title}</h1>
          <p>{metadata.description}</p>
        </header> */}
        <main>{children}</main>
        <footer>{/* 푸터 */}</footer>
      </body>
    </html>
  );
}
