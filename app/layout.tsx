import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IT略語即時参照サービス",
  description: "IT分野の略語を瞬時に検索・参照できるサービス",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
