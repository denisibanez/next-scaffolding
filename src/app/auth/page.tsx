'use client';
import React, { useEffect } from 'react';

import { redirect } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import { Button } from 'antd';
import { useLoadingStore } from '@/store/loading/loading.store';

export default function AuthView() {
  const { status } = useSession();
  const { setLoading } = useLoadingStore();
  
  const authenticated = status === 'authenticated';

  if (authenticated) {
    redirect('/');
  }

  useEffect(() => {
    setLoading(status === 'loading');
  }, [status, setLoading]);

  async function handleLogin() {
    await signIn();
  }

  return (
    <section className="w-full flex items-center  min-h-screen">
      <div className="rounded p-36 md:p-52 flex items-center justify-between mx-auto shadow-sm bg-white">
        {status === 'loading' && <span> Carregando...</span>}

        {status === 'unauthenticated' && (
          <Button type="primary" size="large" onClick={handleLogin}>
            Login
          </Button>
        )}
      </div>
    </section>
  );
}
