import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useFavorites } from '../useFavorites'

function TestComponent() {
    const { favorites, toggle } = useFavorites()
    return (
        <div>
            <button onClick={() => toggle('pikachu')}>toggle</button>
            <div data-testid="list">{favorites.join(',')}</div>
        </div>
    )
}

describe('useFavorites', () => {
    test('adds and removes favorites', async () => {
        const user = userEvent.setup()
        render(<TestComponent />)
        const btn = screen.getByRole('button')
        const list = screen.getByTestId('list')
        expect(list.textContent).toBe('')
        await user.click(btn)
        expect(list.textContent).toContain('pikachu')
        await user.click(btn)
        expect(list.textContent).not.toContain('pikachu')
    })
})
