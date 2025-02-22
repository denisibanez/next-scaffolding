import { render, screen } from '@testing-library/react';
import Page from '../app/home';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../i18n/messages/en.json';

const locale = 'en';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ status: 'authenticated' })),
}));

const items = [
  { name: 'item1', url: 'url1' },
  { name: 'item2', url: 'url2' },
];

describe('Page Component', () => {
  it('renders without crashing', () => {
    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Page items={items} />
      </NextIntlClientProvider>
    );
  });

  it('displays a button', () => {
    render(
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Page items={items} />
      </NextIntlClientProvider>
    );

    const button = screen.getByTestId('example-post');
    expect(button).toBeInTheDocument();
  });
});
