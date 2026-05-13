import logo from "../assets/logo.svg";
export default function Card({ card, onClick, disabled }) {
  return (
    <button
      disabled={disabled || card.flipped || card.matched}
      onClick={() => onClick(card)}
      className="aspect-square perspective-[1000px]"
    >
      <div
        className={`
          relative
          w-full
          h-full
          card
          ${card.flipped || card.matched ? "flipped" : ""}
        `}
      >
        <div
          className="
            card-face
            absolute
            inset-0
            bg-blue-500
            flex
            items-center
            justify-center
            shadow-xl
            rounded-[22px]
            min-[400px]:rounded-[30px]
            min-[500px]:rounded-[32px]
            min-[600px]:rounded-[36px]
            sm:rounded-[44px]
            md:rounded-[30px]
            lg:rounded-[30px]
            hover:cursor-pointer
          "
        >
          <span className="text-yellow-300 text-6xl font-black">
            ?
          </span>
        </div>

        <div
          className="card-face card-front absolute inset-0 rounded-2xl bg-white flex items-center justify-center shadow-xl border-4 border-gray-300 p-6"
        >
          <img
            src={card.icon}
            alt={card.name}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </button>
  );
}
