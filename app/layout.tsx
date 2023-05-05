import './globals.css';
import { Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import RegisterModal from './components/Modals/RegisterModal';

export const metadata = {
  title: 'AirBnb',
  description: 'AirBnb clone',
};

const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
