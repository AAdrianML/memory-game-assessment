import { useEffect, useMemo, useRef, useState } from 'react'

import Card from './Card'
import ResultModal from './ResultModal'
import { useRecoilState } from 'recoil'
import { cardSymbols } from '../data/cards'
import { shuffleArray } from '../utils/shuffle'
import backgroundMusic from '../assets/background.mp3'
import correctSoundFile from '../assets/correct.mp3'
import incorrectSoundFile from '../assets/incorrect.mp3'
import tickingSoundFile from '../assets/ticking.mp3'
import { mutedState } from '../store/uiState'
const GAME_TIME = 30
export default function GameScreen({
  onFinish,
}) {

  const backgroundAudio = useRef(null)
  const correctAudio = useRef(null)
  const incorrectAudio = useRef(null)
  const tickingAudio = useRef(null)
  const timeoutRefs = useRef([])

  const initialCards = useMemo(() => {
    const duplicatedCards = [...cardSymbols, ...cardSymbols]
    return shuffleArray(
      duplicatedCards.map((card, index) => ({
        ...card,
        uniqueId: index,
        flipped: false,
        matched: false,
      }))
    )
  }, [])
  const [muted, setMuted] = useRecoilState(mutedState)
  const [cards, setCards] = useState(initialCards)
  const [selectedCards, setSelectedCards] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [timer, setTimer] = useState(GAME_TIME)
  const [modalMessage, setModalMessage] = useState('')

  useEffect(() => {
    backgroundAudio.current = new Audio(backgroundMusic)
    backgroundAudio.current.loop = true
    backgroundAudio.current.volume = 0.4

    correctAudio.current = new Audio(correctSoundFile)
    incorrectAudio.current = new Audio(incorrectSoundFile)
    tickingAudio.current = new Audio(tickingSoundFile)

    return () => {
      backgroundAudio.current?.pause()
      tickingAudio.current?.pause()
      timeoutRefs.current.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    if (muted) {
      backgroundAudio.current?.pause()
      tickingAudio.current?.pause()
    } else {
      backgroundAudio.current?.play()
      if (timer <= 10) playTickingSound()
    }
  }, [muted, timer])

  const handleTimerEnd = () => {
    backgroundAudio.current?.pause()
    tickingAudio.current?.pause()

    onFinish(false, GAME_TIME)
  }

  const playTickingSound = () => {
    if (muted) return

    tickingAudio.current.currentTime = 0
    tickingAudio.current.play()
    tickingAudio.current.loop = true
    tickingAudio.current.volume = 0.4
  }

  const playCorrectSound = () => {
    if (muted) return

    correctAudio.current.currentTime = 0
    correctAudio.current.play()
  }

  const playIncorrectSound = () => {
    if (muted) return

    incorrectAudio.current.currentTime = 0
    incorrectAudio.current.play()
  }


  const markCardsAsMatched = (first, second) => {
    setCards(prev =>
      prev.map(card => {
        if (
          card.uniqueId === first.uniqueId ||
          card.uniqueId === second.uniqueId
        ) {
          return {
            ...card,
            matched: true,
          }
        }

        return card
      })
    )
  }

  const unflipCards = (first, second) => {
    setCards(prev =>
      prev.map(card => {
        if (
          card.uniqueId === first.uniqueId ||
          card.uniqueId === second.uniqueId
        ) {
          return {
            ...card,
            flipped: false,
          }
        }

        return card
      })
    )
  }

  const handleMatch = (first, second) => {
    setModalMessage("nice! it's a match")

    playCorrectSound()

    markCardsAsMatched(first, second)

    const timeoutId = setTimeout(() => {
      setModalMessage('')
      setSelectedCards([])
      setDisabled(false)
    }, 1000)

    timeoutRefs.current.push(timeoutId)
  }

  const handleMismatch = (first, second) => {
    setModalMessage('sorry, but this is not a match')

    playIncorrectSound()

    const timeoutId = setTimeout(() => {
      unflipCards(first, second)

      setModalMessage('')
      setSelectedCards([])
      setDisabled(false)
    }, 1200)
    timeoutRefs.current.push(timeoutId)
  }

  const handleCardClick = clickedCard => {
    if (disabled) return
    setDisabled(true)
    const updatedCards = cards.map(card => {
      if (card.uniqueId === clickedCard.uniqueId) {
        return {
          ...card,
          flipped: true,
        }
      }

      return card
    })

    const updatedSelectedCards = [
      ...selectedCards,
      clickedCard,
    ]

    setCards(updatedCards)
    setSelectedCards(updatedSelectedCards)

    if (updatedSelectedCards.length !== 2) {
      const timeoutId = setTimeout(() => {
        setDisabled(false)
      }, 500)
      timeoutRefs.current.push(timeoutId)
      return
    }

    const [first, second] = updatedSelectedCards

    const isMatch = first.name === second.name

    if (isMatch) {
      handleMatch(first, second)
    } else {
      handleMismatch(first, second)
    }
  }


  const checkWinCondition = () => {
    const matchedCards = cards.filter(card => card.matched)

    if (matchedCards.length === cards.length) {
      backgroundAudio.current?.pause()
      tickingAudio.current?.pause()

      const completionTime = GAME_TIME - timer

      onFinish(true, completionTime)
    }
  }

  useEffect(() => {
    if (timer <= 0) {
      handleTimerEnd()
      return
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  useEffect(() => {
    if (timer === 10) {
      playTickingSound()
    }
  }, [timer])

  useEffect(() => {
    checkWinCondition()
  }, [cards])

  return (
    <div className='min-h-screen px-4 py-6 mt-20 md:mt-40'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-3xl font-black'>
            Memory Game
          </h2>

          <div className='text-2xl font-bold'>
            {timer}s
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {cards.map(card => (
            <Card
              key={card.uniqueId}
              card={card}
              onClick={handleCardClick}
              disabled={disabled}
            />
          ))}
        </div>
      </div>

      {modalMessage && (
        <ResultModal message={modalMessage} />
      )}
    </div>
  )
}