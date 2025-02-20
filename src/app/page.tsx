'use client';

import { Button } from 'antd';
import { useStore } from '../store/example/example.store';

export default function Home() {
  const { count, inc } = useStore();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Button type="primary" onClick={() => inc()}>Button</Button>

        <div className="grid">
          Contador: {count}
        </div>
      </main>
    </div>
  );
}
