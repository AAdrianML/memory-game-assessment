import soundOffIcon from "../assets/soundOff.svg";
import soundOnIcon from "../assets/soundOn.svg";
import gitLogo from "../assets/gitLogo.png";
import { useRecoilState } from 'recoil'
import {
  darkModeState,
  mutedState,
} from '../store/uiState'
export default function Header({
  goHome,
  screen,
}) {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState)
  const [muted, setMuted] = useRecoilState(mutedState)

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <button
        onClick={goHome}
        disabled={screen === "start"}
        className={
          `
            fixed
            top-4
            left-4
            z-50
            px-4
            py-2
            rounded-2xl
            bg-indigo-500
            text-white
            font-semibold
            hover:scale-105
            active:scale-95
            transition-all
            duration-200
            shadow-md
            cursor-pointer
            disabled:cursor-default
            disabled:opacity-50
          `
        }
      >
        Home
      </button>
      <button
        onClick={() =>
          window.open(
            "https://github.com/AAdrianML/memory-game-assessment",
            "_blank"
          )
        }
        className="
            fixed
            top-3
            left-26
            z-50
            w-11
            h-11
            rounded-2xl
            bg-white
            hover:scale-105
            active:scale-95
            transition-all
            duration-200
            shadow-md
            flex
            items-center
            justify-center
            cursor-pointer
        "
      >
        <img
          src={gitLogo}
          alt="GitHub repository"
          className="w-7 h-7 object-contain"
        />
      </button>

      <div
        className="
      fixed
      top-4
      right-4
      z-50
      flex
      items-center
      gap-3
    "
      >
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={
            `
            px-4
            py-2
            rounded-2xl
            text-white
            font-semibold
            hover:scale-105
            active:scale-95
            transition-all
            duration-200
            shadow-md
            cursor-pointer
            ${darkMode ? "bg-indigo-500" : "bg-gray-800"}
           `
          }
        >
          {darkMode ? "Light" : "Dark"}
        </button>
        {screen === "game" && (
          <button
            onClick={() => setMuted(!muted)}
            className="
          w-12
          h-12
          rounded-2xl
          bg-yellow-400
          hover:scale-105
          active:scale-95
          transition-all
          duration-200
          shadow-md
          flex
          items-center
          justify-center
          cursor-pointer
        "
          >
            <img
              src={muted ? soundOffIcon : soundOnIcon}
              alt="sound toggle"
              className="w-6 h-6"
            />
          </button>
        )}
      </div>
    </header>
  );
}
