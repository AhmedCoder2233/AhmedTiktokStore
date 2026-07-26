import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from './components/CartContext';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ahmed Memon · AI Dev',
  description: 'Master n8n, AI Calling Agnets & Automation – courses & done‑for‑you services.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
            {children}
      </body>
    </html>
  );
}
