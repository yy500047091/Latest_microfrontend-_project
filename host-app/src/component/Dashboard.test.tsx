
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './dashboard';
// Adjust the import path

jest.mock('remoteComponents/App', () => ({
  __esModule: true,
  default: () => <div data-testid="remote-app">Remote Music Player</div>,
}));

const mockLocalStorage = (role: string | null) => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => role),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    mockLocalStorage(null); // Set a default role for each test
  });

  test('renders the welcome message', () => {
    render(<Dashboard />);
    expect(screen.getByText('Welcome to Music Library')).toBeInTheDocument();
  });

  test('renders "SELECT THE SONG" for non-admin users', () => {
    mockLocalStorage('user');
    render(<Dashboard />);
    expect(screen.getByText('SELECT THE SONG')).toBeInTheDocument();
    expect(screen.queryByText('Add Song')).not.toBeInTheDocument();
  });

  test('renders "Add Song" button for admin users', () => {
    mockLocalStorage('admin');
    render(<Dashboard />);
    expect(screen.getByText('Add Song')).toBeInTheDocument();
    expect(screen.queryByText('SELECT THE SONG')).not.toBeInTheDocument();
    expect(screen.getByTestId('remote-app')).toBeInTheDocument(); // Ensure RemoteApp is rendered
  });

  test('opens "Add New Song" form when "Add Song" button is clicked', () => {
    mockLocalStorage('admin');
    render(<Dashboard />);
    fireEvent.click(screen.getByText('Add Song'));
    expect(screen.getByText('Add New Song')).toBeInTheDocument();
    expect(screen.getByLabelText('Title:')).toBeInTheDocument();
    expect(screen.getByLabelText('Artist:')).toBeInTheDocument();
    expect(screen.getByLabelText('Album:')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('calls handleAddSongSubmit and resets form on submission', () => {
    mockLocalStorage('admin');
    render(<Dashboard />);
    fireEvent.click(screen.getByText('Add Song'));

    fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText('Artist:'), { target: { value: 'Test Artist' } });
    fireEvent.change(screen.getByLabelText('Album:'), { target: { value: 'Test Album' } });

    const consoleLogSpy = jest.spyOn(console, 'log');
    fireEvent.click(screen.getByText('Add'));

    expect(consoleLogSpy).toHaveBeenCalledWith('New Song Details:', {
      title: 'Test Title',
      artist: 'Test Artist',
      album: 'Test Album',
    });

    expect(screen.queryByText('Add New Song')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Title:')).not.toBeInTheDocument();
    consoleLogSpy.mockRestore();
  });

  test('closes "Add New Song" form when "Cancel" button is clicked', () => {
    mockLocalStorage('admin');
    render(<Dashboard />);
    fireEvent.click(screen.getByText('Add Song'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Add New Song')).not.toBeInTheDocument();
  });
});