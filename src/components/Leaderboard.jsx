export default function Leaderboard({ scores, darkMode }) {
    return (
      <div className='w-full max-w-md mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Leaderboard</h2>
  
        <div className='flex flex-col gap-3'>
          {scores.map((score, index) => (
            <div
              key={index}
              className={`flex justify-between backdrop-blur px-4 py-3 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-indigo-100'}`}
            >
              <span className="font-bold">{score.name}</span>
              <span className="font-bold">{score.time}s</span>
            </div>
          ))}
        </div>
      </div>
    )
  }