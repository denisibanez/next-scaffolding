'use client';

import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

import { redirect } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Button } from 'antd';
import { useStore } from '@/store/example/example.store';
import { useLoadingStore } from '@/store/loading/loading.store';

import dynamicService from '@/services/plugins/dynamicInjection.service';
import mountUrl from '@/utils/mountParams.utils';

import { RequestParams } from '@/types/request';

export default function Home() {
  const { status } = useSession();

  const unauthenticated = status === 'unauthenticated';
  if (unauthenticated) {
    redirect('/auth');
  }

  const { count, inc } = useStore();
  const { setLoading } = useLoadingStore();
  const t = useTranslations('Home');

  const getExample = async () => {
    const urlParams = {
      path: `/api/v2/`,
    };
    const requestParams: RequestParams = {
      type: 'get',
      url: mountUrl(urlParams),
      loading: true,
    };

    await dynamicService(requestParams).then((response: unknown) => {
      const data = response;
      if (data) {
        console.log(data);
      }
    });
  };

  useEffect(() => {
    getExample();
  }, []);

  useEffect(() => {
    setLoading(status === 'loading');
  }, [status, setLoading]);


  return (
    <>
      <main className="flex  gap-20 row-start-7 items-center w-full ">
        <section className="grid gap-6  min-h-20 items-center w-full">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="text-lg">{t('description')}</p>
        </section>

        <section className="grid gap-6  min-h-20 items-center justify-end w-full">
          <Button type="primary" onClick={() => inc()}>
            {t('Buttons.increment')}
          </Button>

          <div className="grid">
            {t('Texts.count')}: {count}
          </div>
        </section>
      </main>
    </>
  );
}
