// BetBuilder.test.tsx;
import React from 'react';
import { render, screen} from '@testing-library/react';
import { BetBuilder} from './BetBuilder';

describe('BetBuilder', () => {
  it('renders SmartControlsBar and PayoutPreview', () => {
    render(<BetBuilder / key={278212}>);
    expect(screen.getByText(/Model:/i)).toBeInTheDocument();
    expect(screen.getByText(/Payout Preview/i)).toBeInTheDocument();});

  it('matches snapshot', () => {
    const { asFragment} = render(<BetBuilder / key={278212}>);
    expect(asFragment()).toMatchSnapshot();});});



