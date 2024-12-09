import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router';

describe('Navbar', () => {
  test('renders navbar correctly', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('Mi Tienda')).toBeInTheDocument();
  });

  test('contains "Home" and "Productos" links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
  });

  test('link "Mi Tienda" redirects to the home page', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const homeLink = screen.getByText('Mi Tienda');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('link "Home" redirects to the home page', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('link "Productos" redirects to the productos page', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const productosLink = screen.getByText('Productos');
    expect(productosLink).toHaveAttribute('href', '/productos');
  });
});
