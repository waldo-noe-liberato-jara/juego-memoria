import { useEffect, useState } from "react";
import TimerIcon from "../assets/TimerIcon";

export default function MemoryTimer({ isRunning }) {
  const [seconds, setSeconds] = useState(0);

  const formatTime = (secs) => {
    const hours = String(Math.floor(secs / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const sec = String(secs % 60).padStart(2, "0");

    return `${hours}:${minutes}:${sec}`;
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="flex gap-2 items-center px-3 ring-1 rounded-xl">
      <TimerIcon className="w-4 h-4 stroke-2 stroke-black" />

      <p className="text-base text-black font-medium">{formatTime(seconds)}</p>
    </div>
  )
}
