import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Home from "../Home"

describe('Register app routing each component rendering', () => {
    test('Home page heading checking', () => {
        const { getByTestId } = render(<BrowserRouter><Home /></BrowserRouter>)
        const headingEl = getByTestId('homeHeading')
        expect(headingEl).toHaveTextContent('User Details')
    })
})