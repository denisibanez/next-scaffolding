'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Image, { StaticImageData } from 'next/image';

import ptImage from '@/assets/images/locale/br.png';
import enImage from '@/assets/images/locale/en.png';

interface LanguagesOptionsInterface {
  name: string;
  code: string;
  flag: StaticImageData;
}

export default function LocaleSwitcher() {
  const router = useRouter();

  const [locale, setLocale] = useState<string>('');
  const [languages] = useState<LanguagesOptionsInterface[]>([
    {
      name: 'Português',
      code: 'pt',
      flag: ptImage,
    },
    {
      name: 'English',
      code: 'en',
      flag: enImage,
    },
  ]);

  const handleSelectLang = async (language: string) => {
    setLocale(language);
    document.cookie = `NEXT_LOCALE=${language}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  useEffect(() => {
    const cookieLocale = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('NEXT_LOCALE='))
      ?.split('=')[1];

    if (cookieLocale && cookieLocale === locale) {
      return;
    }

    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      if (browserLocale === locale) {
        return;
      }
      setLocale(browserLocale);
    }
  }, [router, locale]);

  return (
    <ul className="p-5 flex gap-3">
      {languages.map((lang) => (
        <li key={lang.code} className="cursor-pointer">
          <Image
            src={lang.flag}
            alt={lang.name}
            width={20}
            height={20}
            onClick={() => handleSelectLang(lang.code)}
          />
        </li>
      ))}
    </ul>
  );
}
