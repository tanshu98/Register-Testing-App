import { fireEvent, render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import SignUp from "../SignUp"
import Login from "../../login/Login"

describe('Register app routing each component rendering', () => {
    test('Sign up page heading checking', () => {
        const { getByTestId } = render(<BrowserRouter><SignUp /></BrowserRouter>)
        const headingEl = getByTestId('signupHeading')
        expect(headingEl).toHaveTextContent('Sign Up')
        expect(headingEl).toBeInTheDocument()
    })

    test('Move to login page', () => {
        const { getByText } = render(<BrowserRouter><SignUp /></BrowserRouter>)
        const loginBtn = getByText(/login/i)
        fireEvent.click(loginBtn)
        expect(loginBtn).toBeInTheDocument()
        expect(render(<BrowserRouter><Login /></BrowserRouter>))
    })

    test('Sign up with existed credintials/already registered user', () => {
        const userDetails = [{ name: 'Prasanna', mobile: '9876543210', email: 'prasanna@gmail.com', password: 'Prasanna@123' }]
        localStorage.setItem('userList', JSON.stringify(userDetails))

        const { getByTestId, getByPlaceholderText } = render(<BrowserRouter><SignUp /></BrowserRouter>)

        const nameInput = getByPlaceholderText('Enter your name')
        fireEvent.change(nameInput, { target: { value: 'Prasanna' } })

        const mobileInput = getByPlaceholderText('Enter your mobile number')
        fireEvent.change(mobileInput, { target: { value: '9876543210' } })

        const emailInput = getByPlaceholderText('Enter your email id')
        fireEvent.change(emailInput, { target: { value: 'prasanna@gmail.com' } })

        const passwordInput = getByPlaceholderText('Enter password')
        fireEvent.change(passwordInput, { target: { value: 'Prasanna@123' } })

        const signUpBtn = getByTestId('signupBtn')
        fireEvent.click(signUpBtn)

        expect(render(<BrowserRouter><Login /></BrowserRouter>))
    })

    test('Sign up with all new credintials', () => {
        const { getByTestId, getByPlaceholderText } = render(<BrowserRouter><SignUp /></BrowserRouter>)

        const nameInput = getByPlaceholderText('Enter your name')
        fireEvent.change(nameInput, { target: { value: 'Vijaya' } })

        const mobileInput = getByPlaceholderText('Enter your mobile number')
        fireEvent.change(mobileInput, { target: { value: '9123456789' } })

        const emailInput = getByPlaceholderText('Enter your email id')
        fireEvent.change(emailInput, { target: { value: 'vijaya@gmail.com' } })

        const passwordInput = getByPlaceholderText('Enter password')
        fireEvent.change(passwordInput, { target: { value: 'Vijaya@123' } })

        const signUpBtn = getByTestId('signupBtn')
        fireEvent.click(signUpBtn)
    })
})