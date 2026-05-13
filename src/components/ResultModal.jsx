export default function ResultModal({ message }) {
    return (
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
        <div className='bg-white px-8 py-6 rounded-3xl text-center shadow-2xl'>
          <h2 className='text-2xl font-bold text-gray-900'>{message}</h2>
        </div>
      </div>
    )
  }