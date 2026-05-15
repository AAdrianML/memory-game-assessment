import { describe, expect, it } from 'vitest'

import { cardSymbols } from '../data/cards'
import { shuffleArray } from '../utils/shuffle'

describe('shuffleArray', () => {
  it('returns all original card symbols', () => {
    const shuffled = shuffleArray(cardSymbols)

    expect(shuffled).toHaveLength(
      cardSymbols.length
    )

    expect(
      shuffled.map(card => card.name).sort()
    ).toEqual(
      cardSymbols.map(card => card.name).sort()
    )
  })

  it('does not change the original card symbols', () => {
    const originalCards = [...cardSymbols]

    shuffleArray(cardSymbols)

    expect(cardSymbols).toEqual(originalCards)
  })
})
it('creates duplicated pairs correctly', () => {
  const pairNumber = 2;
  const totalCardsNumber = 8;
  const duplicatedCards = [
    ...cardSymbols,
    ...cardSymbols,
  ]

  expect(duplicatedCards).toHaveLength(totalCardsNumber)

  const starCards = duplicatedCards.filter(
    card => card.name === 'star'
  )

  expect(starCards).toHaveLength(pairNumber)
})