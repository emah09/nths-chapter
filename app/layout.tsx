import type { Metadata } from "next";
import type { ReactNode } from "react";
import chapter from "@/content/chapter.json";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: chapter.name, template: `%s | ${chapter.name}` },
  description: chapter.welcome,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:m-3 focus:rounded focus:bg-surface focus:p-3">
          Skip to content
        </a>
        <Header school={chapter.school} />
        <main id="main" tabIndex={-1} className="flex-1">{children}</main>
        <footer className="border-t border-line bg-surface">
          <div className="site-width flex flex-wrap items-center justify-between gap-3 py-6 text-sm">
            <span className="font-semibold">{chapter.name}</span>
            <a className="text-link" href={`mailto:${chapter.email}`}>{chapter.email}</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
