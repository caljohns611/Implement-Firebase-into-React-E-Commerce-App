import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DisplayData from '../User Components/Delete';
import { deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

jest.mock('firebase/firestore', () => ({
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  collection: jest.fn(),
}));

describe('DisplayData - Delete User', () => {
  const mockUsers = [
    { id: '1', name: 'John Doe', age: 30 },
    { id: '2', name: 'Jane Smith', age: 25 },
  ];

  beforeEach(() => {
    deleteDoc.mockClear();
  });

  test('deletes the user when the delete button is clicked', async () => {
    render(<DisplayData />);
    await waitFor(() => expect(screen.getByText(/John Doe/i)).toBeInTheDocument());
    
    const deleteButton = screen.getAllByText('Delete User')[0];

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteDoc).toHaveBeenCalledWith(expect.anything());
    });
  });
});