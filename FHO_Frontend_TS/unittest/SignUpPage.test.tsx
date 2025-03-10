import { describe, it, expect, beforeAll, afterEach, afterAll , vi} from 'vitest';
import SignUpPage from '../src/SignUpPage';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter, createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';

import { server } from '../src/mswBrowser' ;
 
import LoginPage from '../src/LoginPage';

describe.skip('SignUpPage', () => {

    // async function enableMocking() {
        
    //     // `worker.start()` returns a Promise that resolves
    //     // once the Service Worker is up and ready to intercept requests.
    //     return worker.start();
    // }

    beforeAll(() => {
        server.listen();

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
              matches: false,
              media: query,
              onchange: null,
              addListener: vi.fn(), // deprecated
              removeListener: vi.fn(), // deprecated
              addEventListener: vi.fn(),
              removeEventListener: vi.fn(),
              dispatchEvent: vi.fn(),
            })),
          })
    
    });

    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    const userE = userEvent.setup();

    const treeStructure = createBrowserRouter ([ 

        {path : "/",
            element : <SignUpPage />
        },
        { path : "/login",
        element : <LoginPage />,
        },
        
    ]
    );

    it('should render SignUpPage', async () => {
        
        server.events.on('request:start', ({ request }) => {
            console.log('MSW intercepted:', request.method, request.url)
        });

        //render(<SignUpPage />, { wrapper: BrowserRouter });
        render(<Routes>
            <Route path="/" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />

        </Routes>, {wrapper: BrowserRouter});
        const username = screen.getByLabelText("Username :");
        expect(username).toBeInTheDocument();
        const password = screen.getByLabelText("Password :");
        expect(password).toBeInTheDocument();

        screen.debug();

        

        const username1 = await screen.findByTestId("testlogin_username");
        expect(username1).toBeInTheDocument();
        const password1 = await screen.findByTestId("testlogin_password");
        expect(password1).toBeInTheDocument();
        await userE.type(username, "test");
        await userE.type(password, "wwx");

        const signupButton = screen.getByRole('button', { name : "Submit"})
        expect(signupButton).toBeInTheDocument();

        await userE.click(signupButton);

        expect(username).toHaveValue("test");
        expect(password).toHaveValue("wwx");
        screen.debug();

        //expect(window.location.pathname).toBe("http://localhost:3001/login");

        const loginGroup = await screen.findByText(/login/i);
        expect(loginGroup).toBeInTheDocument();
        
        
    });
});