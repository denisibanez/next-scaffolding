import { render, screen } from '@testing-library/react';
import Page from '@/app/page';

describe('Page Component', () => {
  it('renders without crashing', () => {
    render(<Page />);
  });

  it('displays a button', () => {
    render(<Page />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });
});
