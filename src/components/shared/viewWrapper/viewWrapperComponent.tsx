'use client';

import { useLoadingStore } from '../../../store/loading/loading.store';

import { Spin } from 'antd';

import HeaderComponent from '../../../components/shared/headerComponent/headerWrapperComponent';
import NotificationComponent from '../../../components/shared/notificationComponent/notificationComponent';

export default function ViewWrapper({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { loading } = useLoadingStore();

  return (
    <div className="grid  gap-y-8 font-[family-name:var(--font-geist-sans)]">
      <div className={!!loading ? ' hidden' : ''}>
        <HeaderComponent />
        <div className="h-full min-h-[calc(100vh-6rem)] flex-col justify-center flex">
          {children}
        </div>
      </div>

      <div
        className={
          'h-[calc(100vh-6rem)] flex items-center justify-center' +
          (loading ? '' : ' hidden')
        }
      >
        <Spin size="large" />
      </div>

      <NotificationComponent />
    </div>
  );
}
