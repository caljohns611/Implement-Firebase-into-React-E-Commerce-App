import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddProductForm from '../Products Components/CreateProduct';
import { addDoc } from 'firebase/firestore';
import { db } from '../firebase';

jest.mock('firebase/firestore', () => ({
    addDoc: jest.fn(),
    collection: jest.fn(),
}));

describe('AddProductForm', () => {
    beforeEach(() => {
        addDoc.mockClear();
    });

    test('renders AddProductionForm', () => {
        render(<AddProductForm />);

        expect(screen.getByPlaceholderText(/Product/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Price/i)).toBeInTheDocument();
        expect(screen.getByText(/Add product/i)).toBeInTheDocument();
    });

    test('allows user to type in the product and price fields', () => {
        render(<AddProductForm />);

        const productInput = screen.getByPlaceholderText(/Product/i);
        const priceInput = screen.getByPlaceholderText(/Price/i);

        fireEvent.change(productInput, { target: { value: 'Test Product' } });
        fireEvent.change(priceInput, { target: { value: '99' } });

        expect(productInput.value).toBe('Test Product');
        expect(priceInput.value).toBe('99');
    });

    test('submits the form and calls adDoc with the correct data', async () => {
        render(<AddProductForm />);

        const productInput = screen.getByPlaceholderText(/Product/i);
        const priceInput = screen.getByPlaceholderText(/Price/i);
        const submitButton = screen.getByText(/Add product/i);

        fireEvent.change(productInput, { target: { value: 'Test Product' } });
        fireEvent.change(priceInput, { target: { value: '100' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(addDoc).toHaveBeenCalledTimes(1);
            expect(addDoc).toHaveBeenCalledTimes(
                expect.anything(),
                { product: 'Test Product', price: 100 }
            );
        });

        expect(productInput.value).toBe('');
        expect(priceInput.value).toBe('0');
    });

    test('shows alert when data is added successfully', async () => {
        global.alert = jest.fn();
        render(<AddProductForm />);

        const productInput = screen.getByPlaceholderText(/Product/i);
        const priceInput = screen.getByPlaceholderText(/Price/i);
        const submitButton = screen.getByText(/Add product/i);

        fireEvent.change(productInput, { target: { value: 'Test Product' } });
        fireEvent.change(priceInput, { target: { value: '100' } });


        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith('Data added');
        });
    });

    test('handles error during form submission', async () => {
        addDoc.mockRejectedValueOnce(new Error('Firestore error'));
        render(<AddProductForm />);

        const productInput = screen.getByPlaceholderText(/Product/i);
        const priceInput = screen.getByPlaceholderText(/Price/i);
        const submitButton = screen.getByText(/Add product/i);

        fireEvent.change(productInput, { target: { value: 'Test Product' } });
        fireEvent.change(priceInput, { target: { value: '100' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith('Error adding document: ', expect.any(Error));
        });
    });
});