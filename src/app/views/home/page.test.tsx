import { render, screen } from '@testing-library/react';
import Page from '@/app/page';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/i18n/messages/en';

const locale = 'en';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ status: 'authenticated' })),
}));

describe('Page Component', () => {
  it('renders without crashing', () => {
    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Page />
      </NextIntlClientProvider>
    );
  });

  it('displays a button', () => {
    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Page />
      </NextIntlClientProvider>
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });
});
