import { Inter } from "next/font/google";
import "./globals.css";
import styles from './Header.module.css';
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/">
              Pokédex
            </Link>
          </li>
          <li>
            <Link href="/connexion">
              My account
            </Link>
          </li>
          <li>
            <Link href="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
        {children}</body>
    </html>
  );
}
