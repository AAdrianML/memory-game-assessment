import Leaderboard from './Leaderboard'
import { useRecoilState } from 'recoil'
import { darkModeState } from '../store/uiState'
export default function EndScreen({
  won,
  playAgain,
  leaderboard
}) {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState)
  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-6 text-center'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl font-black mb-6'>
        {won ? 'You did it!' : "Oops you didn't find them all"}
      </h1>

      <button
        onClick={playAgain}
        className='hover:animate-bounce px-6 py-4 rounded-2xl bg-indigo-500 text-white font-bold text-xl cursor-pointer'
      >
        Play Again
      </button>

      {won && <Leaderboard scores={leaderboard} darkMode={darkMode}/>}
    </div>
  )
}