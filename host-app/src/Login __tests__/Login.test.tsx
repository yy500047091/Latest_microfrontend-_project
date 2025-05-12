
import 'whatwg-fetch';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from "../component/Login";

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    mockNavigate.mockClear();
    localStorage.clear();
  });

  test('renders the username and password input fields', () => {
    render(<Login />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('updates username state when username input changes', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText('Username') as HTMLInputElement;
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    // You might need to add an assertion here if you expose the state for testing
  });

  test('calls handleSubmit function and navigates to dashboard on form submission', () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText('Username') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const roleSelect = screen.getByLabelText('User Role') as HTMLSelectElement;
    const signInButton = screen.getByText('Sign In');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(roleSelect, { target: { value: 'user' } });
    fireEvent.click(signInButton);

    expect(localStorage.getItem('userRole')).toBe('user');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('calls handleSubmit function and sets user role in local storage', () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText('Username') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const roleSelect = screen.getByLabelText('User Role') as HTMLSelectElement;
    const signInButton = screen.getByText('Sign In');

    fireEvent.change(usernameInput, { target: { value: 'adminuser' } });
    fireEvent.change(passwordInput, { target: { value: 'adminpassword' } });
    fireEvent.change(roleSelect, { target: { value: 'admin' } });
    fireEvent.click(signInButton);

    expect(localStorage.getItem('userRole')).toBe('admin');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  // Add more tests for invalid inputs, etc.
});