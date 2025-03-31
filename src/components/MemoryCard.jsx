export default function MemoryCard({ card, onSelectCard }) {

  const handleSelectCard = (card) => {
    if (onSelectCard) {
      onSelectCard(card);
    }
  }

  return (
    <div onClick={() => handleSelectCard(card)} className="perspective-distant aspect-square cursor-pointer">
      <div className={`relative w-full h-full transform-3d transition-transform duration-300 ${card.state ? "rotate-y-180" : ""}`} >
        <div className="absolute w-full h-full backface-hidden flex justify-center items-center bg-gray-500 rounded-lg">{card.value}</div>
        <div className="absolute w-full h-full backface-hidden flex justify-center items-center bg-red-500 rounded-lg rotate-y-180 text-xl">
          {card.value}
        </div>
      </div>
    </div>
  )
}
