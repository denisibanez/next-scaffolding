'use client'

import { useTranslations } from 'next-intl';


import { useLoadingStore } from '../../lib/store/loading/loading.store';
import { useNotificationStore } from '../../lib/store/notification/notification.store';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import dynamicService from '../../lib/services/plugins/dynamicInjection.service';
import mountUrl from '../../utils/mountParams.utils';
import { RequestParams } from '../../types/request';

interface ResponseInterface {
  data?: { name: string; id: string }[];
  message?: string;
  error?: string;
}

export default function FormExamplePage() {
  const { status, data:session } = useSession();
  const unauthenticated = status === 'unauthenticated';
  if (unauthenticated) {
    redirect('/auth');
  }

  const { setLoading } = useLoadingStore();
  const { setNotification } = useNotificationStore();
  const t = useTranslations('Home');

  const [exampleList, setExampleList] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    if(status === 'authenticated') {
      getExampleUser();
      getExampleByUser();
    }
  }, [status, setExampleList]);

  const getExampleUser = () => {
    setLoading(true);
    const urlParams = {
      path: `/api/example?email=${session?.user?.email}`,
    };
    const requestParams: RequestParams = {
      type: 'get', 
      url: mountUrl(urlParams),
      baseUrl: process.env.NEXT_PUBLIC_API_INTERNAL_URL,
    };

    dynamicService(requestParams)
      .then((response: unknown) => {
        const value = (response as ResponseInterface)?.data;
        if (value) {
          console.log(value);

          setNotification({
            model: true,
            message: t('Feedback.success'),
            type: 'success',
          });

          return;
        }

        setNotification({
          model: true,
          message:
            (response as ResponseInterface)?.message || t('Feedback.error'),
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      }); 
  };

  const getExampleByUser = () => {
    setLoading(true);
    const urlParams = {
      path: `/api/example/${session?.user?.id}`,
    };
    const requestParams: RequestParams = {
      type: 'get', 
      url: mountUrl(urlParams),
      baseUrl: process.env.NEXT_PUBLIC_API_INTERNAL_URL,
    };

    dynamicService(requestParams)
      .then((response: unknown) => {
        const value = (response as ResponseInterface)?.data as { name: string; id: string }[];
        if (value) {
          setExampleList(value);

          setNotification({
            model: true,
            message: t('Feedback.success'),
            type: 'success',
          });

          return;
        }

        setNotification({
          model: true,
          message:
            (response as ResponseInterface)?.message || t('Feedback.error'),
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      }); 
  };

  return (
    <div>
      <h1>List examples:</h1>
      { exampleList && exampleList.map((example : { name: string, id: string}, index) => (
        <div key={index}>
          <p>{example?.name}</p>
          </div>
      ))}
    </div>
  )
}