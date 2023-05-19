import './globals.css';
import { Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import LoginModal from './components/Modals/LoginModal';
import RegisterModal from './components/Modals/RegisterModal';
import RentModal from './components/Modals/RentModal';
import SearchModal from './components/Modals/SearchModal';
import ToastProvider from './providers/ToastProvider';

import getCurrentUser from './actions/getCurrentUser';
import Head from 'next/head';

export const metadata = {
  title: 'HomeSafari',
  description: 'An Airbnb clone website',
};

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <SearchModal />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
