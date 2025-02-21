'use client';
import React from 'react';

import { redirect } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import { Button } from 'antd';

export default function AuthView() {
  const { status } = useSession();
  const authenticated = status === 'authenticated';

  if (authenticated) {
    redirect('/');
  }

  async function handleLogin() {
    await signIn();
  }

  return (

        <section className="w-full flex items-center  min-h-screen">
          <div className="rounded p-52 flex items-center justify-between mx-auto shadow-sm bg-white">
            {status === 'loading' && <span> Carregando...</span>}

            {status === 'unauthenticated' && (
              <Button type="primary" onClick={handleLogin}>
                Login
              </Button>
            )}
          </div>
        </section>

  );
}
