'use client';

import { useTranslations } from 'next-intl';

import { Button, Form } from 'antd';
import { useStore } from '@/store/example/example.store';
import { useLoadingStore } from '@/store/loading/loading.store';
import { useNotificationStore } from '@/store/notification/notification.store';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import dynamicService from '@/services/plugins/dynamicInjection.service';
import mountUrl from '@/utils/mountParams.utils';
import { RequestParams } from '@/types/request';

interface HomeViewProps  {
  items: { name: string; url: string }[];
};

export default function HomeView({ items }: HomeViewProps) {
  const { status } = useSession();
  const unauthenticated = status === 'unauthenticated';
  if (unauthenticated) {
    redirect('/auth');
  }

  const { count, inc } = useStore();
  const { setLoading } = useLoadingStore();
  const { setNotification } = useNotificationStore();
  const t = useTranslations('Home');

  useEffect(() => {
    setLoading(status === 'loading');
  }, [status, setLoading]);

  const postExample = () => {
    setLoading(true);
    const urlParams = {
      path: `/api/v2/pokemon`,
    };
    const requestParams: RequestParams = {
      type: 'get', // changeto post in real case
      url: mountUrl(urlParams),
      payload: {
        teste: 1,
      },
    };

    dynamicService(requestParams)
      .then((response: unknown) => {
        const data = response?.data;
        if (data) {
          console.log(data);

          setNotification({
            model: true,
            message: t('Feedback.success'),
            type: 'success',
          });

          return;
        }

        setNotification({
          model: true,
          message: data?.message || t('Feedback.error'),
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <section className="flex flex-col text-center md:flex-row md:text-left  gap-20 row-start-7 items-center w-full mt-20 md:mt-0">
        <div className="grid gap-6  min-h-20 items-center w-full">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="text-lg">{t('description')}</p>
        </div>

        <div className="grid gap-6  min-h-20 items-center md:justify-end w-full  justify-center">
          <Button type="primary" size="large" onClick={() => inc()}>
            {t('Buttons.increment')}
          </Button>

          <div className="grid">
            <p className="text-4xl">
              {t('Texts.count')}: {count}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6  md:before:min-h-20 mt-16  p-10 md:p-0">
        <h1>Dados Carregados pelo Server</h1>
        <ul className="flex gap-5 flex-col md:flex-row">
          {items &&
            items.map((item: { name: string; url: string }, key: number) => (
              <li key={key}>{item.name}</li>
            ))}
        </ul>
      </section>

      <section className="flex gap-6  min-h-20 mt-8 flex-col md:flex-row items-center md:items-start">
        <h1>Simulando post examplo</h1>
        <Form onFinish={postExample}>
          <Button type="primary" size="large" htmlType="submit" data-testid="example-post">
            Post Exemplo
          </Button>
        </Form>
      </section>
    </>
  );
}
