import logo from '../assets/logo.svg'
import { useRecoilValue } from 'recoil'
import {
  darkModeState,
  mutedState,
} from '../store/uiState'
export default function StartScreen({
  nickname,
  setNickname,
  onStart,
}) {
  const darkMode = useRecoilValue(darkModeState)
  const isDisabled = !nickname.trim()
  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-6 text-center'>
      <div className='slide-top flex flex-col items-center'>
        <img
          src={logo}
          alt='Memory Game Logo'
          className={`
            w-32
            sm:w-40
            md:w-50
            mb-6
            duration-300
            hover:scale-110
            hover:-translate-y-1
            ${darkMode ? 'invert' : ''}
          `}
        />
        <h1 className='text-4xl md:text-6xl font-black mb-4'>
          Memory Game
        </h1>
      </div>

      <div className='slide-bottom flex flex-col gap-4 w-full max-w-sm'>
        <input
          type='text'
          placeholder='Enter nickname'
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          className='px-4 py-3 rounded-2xl border border-gray-300 bg-white text-black outline-none'
        />

        <button
          onClick={onStart}
          disabled={isDisabled}
          className={`px-6 py-4 rounded-2xl bg-indigo-500 text-white font-bold text-xl disabled:opacity-50 mt-4 ${!isDisabled ?
            'hover:animate-bounce cursor-pointer' : ''
            }`}
        >
          Start
        </button>
      </div>
    </div>
  )
}