import React from 'react';
import {fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const header = screen.getByText(/Contact Form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)
    const firstInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstInput, 'bil');
    expect(screen.getByText(/Error: firstName must have at least 5 characters./i)).toBeInTheDocument()
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
    const form = screen.getByTestId('form')
    fireEvent.submit(form)
    expect(screen.getByText(/Error: firstName must have at least 5 characters./i)).toBeInTheDocument();
    expect(screen.getByText(/Error: lastName is a required field./i)).toBeInTheDocument();
    expect(screen.getByText(/Error: email must be a valid email address./i)).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
    const firstInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstInput, 'billy');
    const secondInput = screen.getByLabelText(/Last Name/i)
    userEvent.type(secondInput,'Myers')


    //const submit = screen.getByl
    const form = screen.getByTestId('form')
    fireEvent.submit(form)
    expect(screen.getByText(/Error: email must be a valid email address./i)).toBeInTheDocument();
//    expect(screen.getByText(/Error: email must be a valid email address./i))
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)
    const thirdInput = screen.getByLabelText(/Email/i)
    userEvent.type(thirdInput,'billy')
    expect(screen.getByText(/Error: email must be a valid email address./i)).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
    const form = screen.getByTestId('form')
    fireEvent.submit(form)
    expect(screen.getByText(/Error: lastName is a required field./i)).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    const firstInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstInput, 'billy');
    const secondInput = screen.getByLabelText(/Last Name/i)
    userEvent.type(secondInput,'Myers')
    const thirdInput = screen.getByLabelText(/Email/i)
    userEvent.type(thirdInput,'billymyers223@gmail.com')
    const form = screen.getByTestId('form')
    fireEvent.submit(form)
    expect(screen.getByText(/First Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();

    const fourthInput = screen.getByLabelText(/Message/i)

    userEvent.type(fourthInput,'Hello!');
    expect(screen.getByText(/Message:/i)).toBeInTheDocument();

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    const firstInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstInput, 'billy');
    const secondInput = screen.getByLabelText(/Last Name/i)
    userEvent.type(secondInput,'Myers')
    const thirdInput = screen.getByLabelText(/Email/i)
    userEvent.type(thirdInput,'billymyers223@gmail.com')
    const fourthInput = screen.getByLabelText(/Message/i)
    userEvent.type(fourthInput,'Hello!');
    const form = screen.getByTestId('form')
    fireEvent.submit(form)
    expect(screen.getByText(/First Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByText(/Message:/i)).toBeInTheDocument();

});