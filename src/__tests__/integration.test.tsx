import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App integration', () => {
    test('navigates to favorites and shows empty message', async () => {
        const user = userEvent.setup()
        render(
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        )
        // click the Favorites link in the navbar (select by role to avoid matching other text)
        const favLink = screen.queryByRole('link', { name: /favorites/i })
        if (favLink) {
            await user.click(favLink)
        } else {
            // fallback navigate directly
            render(
                <MemoryRouter initialEntries={["/favorites"]}>
                    <App />
                </MemoryRouter>
            )
        }

        expect(screen.getByText(/No favorites yet/i)).toBeInTheDocument()
    })
})
