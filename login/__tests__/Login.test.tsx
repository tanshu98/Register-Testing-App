import { fireEvent, render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Login from "../Login"
import SignUp from "../../signUp/SignUp";
import Home from "../../home/Home";

describe('Register app routing each component rendering', () => {
    test('Login page heading checking', () => {
        const { getByTestId } = render(<BrowserRouter><Login /></BrowserRouter>)
        const headingEl = getByTestId('loginHeading')
        expect(headingEl).toHaveTextContent('Login')
        expect(headingEl).toBeInTheDocument()
    });

    test('navigate login page to signup page when signup btn clicks', () => {
        const { getByTestId } = render(<BrowserRouter><Login /></BrowserRouter>)
        const signUpBtn = getByTestId('navigateToSignUp')
        fireEvent.click(signUpBtn)
        expect(signUpBtn).toBeInTheDocument()
        expect(render(<BrowserRouter><SignUp /></BrowserRouter>))
    })

    test('submit login existed & correct credentials to navigate home page', async () => {
        const userslist = [{ name: 'prasanna', mobile: '9876543210', email: 'prasanna@example.com', password: 'Prasanna@123' }]
        localStorage.setItem('userList', JSON.stringify(userslist))

        const { getByTestId, getByPlaceholderText } = render(<BrowserRouter><Login /></BrowserRouter>)
        const emailInput = getByPlaceholderText('Enter your email id')
        fireEvent.change(emailInput, { target: { value: 'prasanna@example.com' } })

        const passwordInput = getByPlaceholderText('Enter password')
        fireEvent.change(passwordInput, { target: { value: 'Prasanna@123' } })

        const logInBtn = getByTestId('loginToHome')
        expect(logInBtn).toBeInTheDocument()
        fireEvent.click(logInBtn)

        expect(render(<BrowserRouter><Home /></BrowserRouter>))
    })

    test('submit login wrong password', async () => {
        const userslist = [{ name: 'prasanna', mobile: '9876543210', email: 'prasanna@example.com', password: 'Prasanna@123' }]
        localStorage.setItem('userList', JSON.stringify(userslist))

        const { getByTestId, getByPlaceholderText } = render(<BrowserRouter><Login /></BrowserRouter>)
        const emailInput = getByPlaceholderText('Enter your email id')
        fireEvent.change(emailInput, { target: { value: 'prasanna@example.com' } })
        
        const passwordInput = getByPlaceholderText('Enter password')
        fireEvent.change(passwordInput, { target: { value: 'Prasan@12' } })

        const logInBtn = getByTestId('loginToHome')
        fireEvent.click(logInBtn)
    })

    test('submit login with not existed user/registered user', () => {
        const usersList = [{ name: 'prasanna', mobile: '9876543210', email: 'prasanna@example.com', password: 'Prasanna@123' }]
        localStorage.setItem('userList', JSON.stringify(usersList))

        const { getByTestId, getByPlaceholderText } = render(<BrowserRouter><Login /></BrowserRouter>)
        const emailInput = getByPlaceholderText('Enter your email id')
        fireEvent.change(emailInput, { target: { value: 'prasanna@e.com' } })

        const passwordInput = getByPlaceholderText('Enter password')
        fireEvent.change(passwordInput, { target: { value: 'Prasanna@123' } })

        const logInBtn = getByTestId('loginToHome')
        fireEvent.click(logInBtn)
    })

})