import { useState } from "react"
import { ITEMS } from "../data/items"
import ResetIcon from "../assets/ResetIcon";
import MemoryTimer from "../components/MemoryTimer";
import MemoryCard from "../components/MemoryCard";
import MemoryLevel from "../components/MemoryLevel";
import MemoryMove from "../components/MemoryMove";
import { LEVELS } from "../data/levels";
import { shuffleArray } from "../utils/shuffle";
import { generateShuffledCardDeck, markCardsAsMatched, resetCardSelection, isGameWon } from "../utils/gameLogic";

export default function MemoryGame() {
  const [level, setLevel] = useState(LEVELS[0]);
  const [cards, setCards] = useState(() => generateShuffledCardDeck(ITEMS, LEVELS[0]));
  const [selected, setSelected] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [turn, setTurn] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const animateFlip = async () => {
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].state) {
        await new Promise((resolve) => {
          setTimeout(() => {
            setCards((prevCards) =>
              prevCards.map((c) =>
                c.id === cards[i].id ? { ...c, state: false } : c
              )
            );
            resolve();
          }, 250);
        });
        console.log(i);
      }
    }
  }

  const handleSelectCard = (card) => {
    if (isDisabled || card.state) return;
    if (!isRunning) setIsRunning(true);

    const newCards = cards.map((d) =>
      d.id === card.id ? { ...d, state: true } : d
    );

    setCards(newCards);
    setSelected(card);

    if (selected !== null) {
      setIsDisabled(true);
      setTurn(prev => prev + 1);

      setTimeout(() => {
        let newCards = [];
        let result = false;
        if (selected.value === card.value) {
          newCards = markCardsAsMatched(cards, [selected, card]);
          result = isGameWon(newCards);
        } else {
          newCards = resetCardSelection(cards, [selected, card]);
        }

        setCards(newCards);
        setSelected(null);
        setIsDisabled(false);
        setGameOver(result);
        if (result) {
          setIsRunning(false);
        }
      }, 500);
    }
  }

  const handleSelectLevel = async (selectedLevel) => {
    setIsRunning(false);

    if (isDisabled) return;

    setIsDisabled(true);

    await animateFlip();

    await new Promise((resolve) => setTimeout(resolve, 250));
    setLevel(selectedLevel);
    setCards(generateShuffledCardDeck(ITEMS, selectedLevel));
    setIsDisabled(false);
    setSelected(null);
    setTurn(0);
  }

  const handleReset = async () => {
    setIsRunning(false);

    if (isDisabled) return;

    setIsDisabled(true);
    const newStates = cards.map((card) => ({ ...card, state: false }));

    await animateFlip();

    await new Promise((resolve) => setTimeout(resolve, 250));
    const newOrder = shuffleArray(newStates);
    setCards(newOrder);
    setIsDisabled(false);
    setSelected(null);
    setTurn(0);
  };

  return (
    <div className='min-h-screen flex flex-col items-center gap-8 px-4 py-6'>
      <div className="w-full max-w-125 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Memory Game</h1>
        <button onClick={handleReset} className="p-2 rounded-full ring-1 cursor-pointer">
          <ResetIcon className="w-4 h-4 stroke-2 stroke-black" />
        </button>
      </div>

      <div className="w-full max-w-125 flex justify-between items-center">
        <MemoryTimer isRunning={isRunning} />

        <MemoryMove turn={turn} />
      </div>

      <div className="w-full max-w-125 flex justify-center items-center">
        <div
          className="w-full grid gap-2 grid-col"
          style={{ gridTemplateColumns: `repeat(${level.columns}, minmax(0, 1fr))` }}
        >
          {
            cards.map((card) => (
              <MemoryCard key={card.id} card={card} onSelectCard={handleSelectCard} />
            ))
          }
        </div>
      </div>

      <MemoryLevel selectedLevel={level} onSelectLevel={handleSelectLevel} />
    </div>
  )
}
