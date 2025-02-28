'use client';

import { useTranslations } from 'next-intl';

import type { FormProps } from 'antd';
import { Button, Form, Input, List, Typography, Divider } from 'antd';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

import { useLoadingStore } from '../../lib/store/loading/loading.store';
import { useNotificationStore } from '../../lib/store/notification/notification.store';

import dynamicService from '../../lib/services/plugins/dynamicInjection.service';
import mountUrl from '../../utils/mountParams.utils';
import { RequestParams } from '../../types/request';

interface ResponseInterface {
  data?: { name: string; id: string }[];
  message?: string;
  error?: string;
}

type FieldType = {
  name: string;
};


export default function FormExamplePage() {
  const { status, data: session } = useSession();
  const unauthenticated = status === 'unauthenticated';
  if (unauthenticated) {
    redirect('/auth');
  }

  const { setLoading } = useLoadingStore();
  const { setNotification } = useNotificationStore();
  const t = useTranslations('Home');

  const [form] = Form.useForm();

  const [exampleList, setExampleList] = useState<
    { name: string; id: string }[]
  >([]);

  useEffect(() => {
    if (status === 'authenticated') {
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
        const value = (response as ResponseInterface)?.data as {
          name: string;
          id: string;
        }[];
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

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setLoading(true);
    const urlParams = {
      path: `/api/example/${session?.user?.id}`,
    };
    const requestParams: RequestParams = {
      type: 'post',
      url: mountUrl(urlParams),
      baseUrl: process.env.NEXT_PUBLIC_API_INTERNAL_URL,
      payload: {
        name: values.name,
        userId: session?.user?.id,
      }
    };

    dynamicService(requestParams)
      .then((response: unknown) => {
      
        if (response) {
          setNotification({
            model: true,
            message: t('Feedback.success'),
            type: 'success',
          });

          getExampleByUser();

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
        form.resetFields();
      });
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (

      <div className="flex gap-8">

        <div className='flex-col w-1/2 justify-center bg-white p-10 rounded-md'>
            <Divider orientation="left">List examples:</Divider>
        <List
      bordered
      dataSource={exampleList}
      renderItem={(example: { name: string; id: string }, index: number) => (
        <List.Item key={index}>
          <Typography.Text>{example?.name}</Typography.Text> 
        </List.Item>
      )}
    />

      </div>

        <div className="form flex flex-col w-1/2 justify-center">
          <div className="bg-white p-10 rounded-md">


          <Form
            form={form}
            name="basic"
            layout={'vertical'}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true, layout: 'vertical' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
           </Form>
           </div>
        </div>
    </div>
  
  );
}
