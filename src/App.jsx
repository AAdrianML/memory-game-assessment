import { useState } from 'react'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'
import EndScreen from './components/EndScreen'
import Header from './components/Header'
import { leaderboardData } from './data/ResultsLeaderBoard'
import { useRecoilState  } from 'recoil'
import {darkModeState} from './store/uiState'
export default function App() {
  const [screen, setScreen] = useState('start')
  const [nickname, setNickname] = useState('')
  const [won, setWon] = useState(false)
  const [darkMode, setDarkMode] = useRecoilState(darkModeState)
  const [leaderboard, setLeaderboard] = useState(leaderboardData)
  const startGame = () => {
    setScreen('game')
  }

  const finishGame = (didWin, time) => {
    setWon(didWin)

    if (didWin) {
      const normalizedNickname = nickname.trim().toLowerCase()

      const playerExists = leaderboard.some(
        score => score.name.toLowerCase() === normalizedNickname
      )

      let updatedLeaderboard

      if (playerExists) {
        updatedLeaderboard = leaderboard.map(score =>
          score.name.toLowerCase() === normalizedNickname
            ? { ...score, time }
            : score
        )
      } else {
        updatedLeaderboard = [
          ...leaderboard,
          {
            name: nickname.trim(),
            time,
          },
        ]
      }

      updatedLeaderboard.sort((a, b) => a.time - b.time)

      setLeaderboard(updatedLeaderboard)
    }

    setScreen('end')
  }

  const goHome = () => {
    setScreen('start')
  }

  const playAgain = () => {
    setScreen('game')
  }

  return (
    <main className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className='max-w-6xl mx-auto p-4'>
        <Header
          goHome={goHome}
          screen={screen}
        />

        {screen === 'start' && (
          <StartScreen
            nickname={nickname}
            setNickname={setNickname}
            onStart={startGame}
          />
        )}

        {screen === 'game' && (
          <GameScreen
            onFinish={finishGame}
          />
        )}

        {screen === 'end' && (
          <EndScreen
            won={won}
            playAgain={playAgain}
            leaderboard={leaderboard}
          />
        )}
      </div>
    </main>
  )
}