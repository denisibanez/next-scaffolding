import './globals.css';

import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';

import '@ant-design/v5-patch-for-react-19';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

import themeConfig from '@/theme/themeConfig';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import HeaderComponent from '@/components/shared/HeaderComponent/HeaderComponent';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <section className="container m-auto min-h-[calc(100vh - 30px)]">
          <div className="grid  gap-y-16 font-[family-name:var(--font-geist-sans)]">
            <NextIntlClientProvider messages={messages}>
              <HeaderComponent />
              <AntdRegistry>
                <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
              </AntdRegistry>
            </NextIntlClientProvider>
          </div>
        </section>
      </body>
    </html>
  );
}
