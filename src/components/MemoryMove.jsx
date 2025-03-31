import TrophyIcon from "../assets/TrophyIcon";

export default function MemoryMove({ turn }) {
  return (
    <div className="flex gap-2 items-center px-3 ring-1 rounded-xl">
      <TrophyIcon className="w-4 h-4" />

      <p className="text-base text-black font-medium">{`${turn} ${turn > 10 ? "Moves" : "Move"}`} </p>
    </div>
  )
}
