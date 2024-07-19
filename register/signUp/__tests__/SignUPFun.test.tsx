import { fireEvent, render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import SignUpFun from "../SignUpFun"


describe('Register app routing each component rendering', () => {
    test('Sign up page heading checking', () => {
        const { getByTestId } = render(<BrowserRouter><SignUpFun /></BrowserRouter>)
        const headingEl = getByTestId('funSignUpHeading')
        expect(headingEl).toHaveTextContent('Sign Up')
    })

    test('Sign up all input fields change & to register as new user', () => {
        const { getByTestId, getByPlaceholderText } = render(<BrowserRouter><SignUpFun /></BrowserRouter>)
        const nameInput = getByPlaceholderText('Enter your name')
        fireEvent.change(nameInput, { target: { value: 'Vijaya' } })

        const mobileInput = getByPlaceholderText('Enter your mobile number')
        fireEvent.change(mobileInput, { target: { value: '9123456789' } })

        const emailInput = getByPlaceholderText('Enter your email id')
        fireEvent.change(emailInput, { target: { value: 'vijaya@gmail.com' } })

        const passwordInput = getByPlaceholderText('Enter password')
        fireEvent.change(passwordInput, { target: { value: 'Vijaya@123' } })

        const signUpBtn = getByTestId('funSignupBtn')
        fireEvent.click(signUpBtn)
    })
})