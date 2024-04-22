import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather",
  description: "날씨 정보를 확인하세요",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-screen bg-red-200 relative">
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
