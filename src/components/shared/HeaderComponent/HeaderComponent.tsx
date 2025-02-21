'use client';

import { signOut, useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Button, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import LocaleSwitcher from '@/components/shared/localeSwitcher/localeSwitcher';
import Image from 'next/image';
import Logo from '@/assets/images/banner/next.png';
import Link from 'next/link';

export default function HeaderComponent() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const t = useTranslations('Home');

  async function handleLogout() {
    await signOut();
    redirect('/auth');
  }

  return (
    <>
      {pathname !== '/auth' && (
        <div className="flex justify-between h-16 items-center w-full">
          <Link href="/" className="cursor-pointer">
            <Image src={Logo} alt="Next.js Logo" width={60} height={60}  />
          </Link>

          <div className="flex items-center">
            <Avatar
              style={
                !session?.user?.image ? { backgroundColor: '#00b96b' } : {}
              }
              icon={<UserOutlined />}
              src={session?.user?.image}
            />
            <div className="mx-4 text-white font-semibold">
              {t('Texts.welcome')}, {session?.user?.name}!
            </div>
            <LocaleSwitcher />
            <Button
              type="primary"
              onClick={handleLogout}
              icon={<LogoutOutlined />}
              size="small"
            />
          </div>
        </div>
      )}
    </>
  );
}
