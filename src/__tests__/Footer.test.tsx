import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Footer from '@/components/Footer';

describe('Footer', () => {
  it('renders the footer with the current year', () => {
    render(<Footer />);
    const footerText = screen.getByText(`© ${new Date().getFullYear()} David Woods`);
    expect(footerText).toBeInTheDocument();
  });
});