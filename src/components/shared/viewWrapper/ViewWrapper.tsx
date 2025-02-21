'use client'

import { useEffect } from 'react';

import { useLoadingStore } from '@/store/loading/loading.store';

import { Spin } from 'antd';

import HeaderComponent from '@/components/shared/headerComponent/headerComponent';

export default function ViewWrapper({ children }: { children?: React.ReactNode }){
  const { loading } = useLoadingStore();

  useEffect(() => {
    console.log('loading', loading);
  }, [loading]);

  return (
    <>
    <div className="grid  gap-y-8 font-[family-name:var(--font-geist-sans)]">

      <div className={
        (!!loading ? ' hidden' : '')
      }>
        <HeaderComponent />
        <div className='h-[calc(100vh-6rem)] flex items-center'>
          {children}
        </div>
      </div> 
     

      <div
        className={
          'h-[calc(100vh-6rem)] flex items-center justify-center'+
          (loading ? '' : ' hidden')
        }>
        <Spin size="large" />
      </div>

    </div></>
  );
}