'use client';

import { Button } from 'antd';
import { useStore } from '@/store/example/example.store';

import { useTranslations } from 'next-intl'; 

export default function Home() {
  const { count, inc } = useStore();
  const t = useTranslations('Home');

  return (
    
      <>
          

      
          <main className="flex  gap-20 row-start-7 items-center ">

            <section className="grid gap-6  min-h-20 items-center w-full">
              <h1 className="text-4xl font-bold">{t("title")}</h1>
              <p className="text-lg">{t("description")}</p>
            </section>

            <section className="grid gap-6  min-h-20 items-center justify-end w-full">
            <Button type="primary" onClick={() => inc()}>
              { t('Buttons.increment') }
            </Button>

            <div className="grid">{ t('Texts.count')}: {count}</div>
            </section>
          </main>
          </>

  );
}
