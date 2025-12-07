import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FavoriteButton from '../FavoriteButton'

describe('FavoriteButton', () => {
    test('renders star and toggles', async () => {
        const user = userEvent.setup()
        const onClick = vi.fn()
        render(<FavoriteButton isFav={false} onClick={onClick} />)
        const btn = screen.getByRole('button')
        expect(btn).toHaveTextContent('☆')
        await user.click(btn)
        expect(onClick).toHaveBeenCalled()
    })
})
