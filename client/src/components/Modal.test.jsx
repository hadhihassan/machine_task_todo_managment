import react from 'react'
import { render } from '@testing-library/react';
import { Modal } from './Modal';
import { describe, it, expect } from '@jest/globals';

describe('Modal', () => {
    it('renders the modal when isOpen is true', () => {
        const { getByText } = render(<Modal isOpen={true} onClose={() => { }} />);

        expect(getByText('Close')).toBeInTheDocument();
    });

    it('does not render the modal when isOpen is false', () => {
        const { queryByText } = render(<Modal isOpen={false} onClose={() => { }} />);

        expect(queryByText('Close')).not.toBeInTheDocument();
    });
});