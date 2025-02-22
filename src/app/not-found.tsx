'use client';

import { useEffect } from 'react';

import { redirect } from 'next/navigation';

import { Button } from 'antd';
import NotFoundImage from '../assets/images/banner/not-found-image.svg';
import Image from 'next/image';

import { useLoadingStore } from '../store/loading/loading.store';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const { setLoading } = useLoadingStore();
  const t = useTranslations('NotFound');

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="flex justify-center items-center  flex-col gap-6 w-full">
      <Image
        src={NotFoundImage}
        alt="Not Found"
        className="w-56 h-56 md:h-96 md:w-96"
      />
      <h1 className="text-3xl md:text-6xl">{t('title')}</h1>
      <p>{t('description')}</p>
      <Button type="primary" onClick={() => redirect('/')}>
        {t('backButton')}
      </Button>
    </div>
  );
}
