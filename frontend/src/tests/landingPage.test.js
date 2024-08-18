import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import LandingPage from '../components/LandingPage';
import store from '../redux/store';
import UserSignIn from '../components/user/UserSignIn';
import PlaceOrder from '../components/user/PlaceOrder';
import RestMenu from '../components/restaurant/RestMenu';

test('renders Customer Dashboard', () => {
    render(
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <LandingPage />
                </Router>
            </Provider>
        </React.StrictMode>);

    const linkElement = screen.getByText(/Delivery/i);
    expect(linkElement).toBeInTheDocument();
});


test('renders Customer Login Page', () => {
    render(
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <UserSignIn />
                </Router>
            </Provider>
        </React.StrictMode>);

    const linkElement = screen.getByText(/Login/i, { selector: 'button' });
    expect(linkElement).toBeInTheDocument();
});


test('renders Order Page', () => {
    render(
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <PlaceOrder />
                </Router>
            </Provider>
        </React.StrictMode>);

    const linkElement = screen.getByText(/Place Order/i, { selector: 'button' });
    expect(linkElement).toBeInTheDocument();
});


test('renders Restaurant-side Menu Page', () => {
    render(
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <RestMenu />
                </Router>
            </Provider>
        </React.StrictMode>);

    const linkElement = screen.getByText(/Add Item/i);
    expect(linkElement).toBeInTheDocument();
});

