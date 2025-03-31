import { useReducer } from "react";
import { ITEMS } from "../data/items";
import ResetIcon from "../assets/ResetIcon";
import MemoryTimer from "../components/MemoryTimer";
import MemoryCard from "../components/MemoryCard";
import MemoryLevel from "../components/MemoryLevel";
import MemoryMove from "../components/MemoryMove";
import { initialState, memoryGameReducer } from "../reducer/MemoryGameReducer";

export default function MemoryGamePage() {
  const [state, dispatch] = useReducer(memoryGameReducer, initialState);

  const animateCardFlip = async (delay = 250) => {
    for (let index = 0; index < state.cards.length; index++) {
      if (state.cards[index].state) {
        await new Promise((resolve) => {
          setTimeout(() => {
            dispatch({ type: "DISABLE_CARD", payload: { index } });
            resolve();
          }, delay);
        });
      }
    }
  };

  const handleSelectCard = (card) => {
    if (state.disabled || card.state) return;
    dispatch({ type: "SELECT_CARD", payload: { selectedCard: card } });

    if (state.firstCardSelected) {
      dispatch({ type: "SET_DISABLED", payload: { disabled: true } });
      dispatch({ type: "INCREMENT_TURN" });

      setTimeout(() => {
        dispatch({ type: "COMPARE", payload: { card } });
      }, 500);
    }
    /*
    setTimeout(() => {
      dispatch({ type: "COMPARE", payload: { card } });
    }, 500);
    */
  };

  const handleSelectLevel = async (selectedLevel) => {
    dispatch({ type: "SET_PLAY", payload: { play: false } });

    if (state.disabled) return;
    dispatch({ type: "SET_DISABLED", payload: { disabled: true } });

    await animateCardFlip();
    await new Promise((resolve) => setTimeout(resolve, 250));

    dispatch({ type: "SELECT_LEVEL", payload: { selectedLevel } });
  };

  const handleReset = async () => {
    dispatch({ type: "SET_PLAY", payload: { play: false } });

    if (state.disabled) return;
    dispatch({ type: "SET_DISABLED", payload: { disabled: true } });

    await animateCardFlip();
    await new Promise((resolve) => setTimeout(resolve, 250));

    dispatch({ type: "RESET_CARDS" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 px-4 py-6">
      <div className="w-full max-w-125 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Memory Game</h1>
        <button onClick={handleReset} disabled={state.disabled} className="p-2 rounded-full ring-1 cursor-pointer">
          <ResetIcon className="w-4 h-4 stroke-2 stroke-black" />
        </button>
      </div>

      <div className="w-full max-w-125 flex justify-between items-center">
        <MemoryTimer isRunning={state.play} />
        <MemoryMove turn={state.turn} />
      </div>

      <div className="w-full max-w-125 flex justify-center items-center">
        <div
          className="w-full grid gap-2 grid-col"
          style={{ gridTemplateColumns: `repeat(${state.level.columns}, minmax(0, 1fr))` }}
        >
          {state.cards.map((card) => (
            <MemoryCard key={card.id} card={card} onSelectCard={handleSelectCard} />
          ))}
        </div>
      </div>

      <MemoryLevel selectedLevel={state.level} onSelectLevel={handleSelectLevel} />
    </div>
  );
}
