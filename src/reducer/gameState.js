import { ITEMS } from "../data/items";
import { LEVELS } from "../data/levels";
import {
  generateShuffledCardDeck,
  isGameWon,
  markCardsAsMatched,
  resetCardSelection,
} from "../utils/gameLogic";
import { shuffleArray } from "../utils/shuffle";

export const initialGameState = {
  level: LEVELS[0],
  cards: generateShuffledCardDeck(ITEMS, LEVELS[0]),
  gameOver: false,
};

export const gameStateReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_LEVEL": {
      const selectedLevel = action.payload.selectedLevel;
      return { ...state, level: selectedLevel };
    }

    case "SHUFFLES_CARDS": {
      const newStates = state.cards.map((card) => ({ ...card, state: false }));
      const newOrder = shuffleArray(newStates);
      return { ...state, cards: newOrder };
    }

    case "GENERATE_CARDS": {
      const selectedLevel = action.payload.selectedLevel;
      const newCards = generateShuffledCardDeck(ITEMS, selectedLevel);
      return { ...state, cards: newCards };
    }

    case "REVEAL_CARD": {
      const selectedCardID = action.payload.selectedCard.id;
      const updatedCards = state.cards.map((card) =>
        card.id === selectedCardID ? { ...card, state: true } : card
      );
      return { ...state, cards: updatedCards };
    }

    case "DISABLE_CARD": {
      const selectedCardID = state.cards[action.payload.index].id;

      const newState = state.cards.map((card) =>
        card.id === selectedCardID ? { ...card, state: false } : card
      );

      return { ...state, cards: newState };
    }

    case "DISABLE_ALL_CARDS": {
      const newStates = state.cards.map((card) => ({ ...card, state: false }));
      return { ...state, cards: newStates };
    }

    case "COMPARE_CARDS": {
      const newlySelectedCard = action.payload.card;
      const firstSelectedCard = action.payload.firstSelectedCard;
      let updatedCards = [];
      let hasGameEnded = false;

      if (firstSelectedCard.value === newlySelectedCard.value) {
        updatedCards = markCardsAsMatched(state.cards, [
          firstSelectedCard,
          newlySelectedCard,
        ]);
        hasGameEnded = isGameWon(updatedCards);
      } else {
        updatedCards = resetCardSelection(state.cards, [
          firstSelectedCard,
          newlySelectedCard,
        ]);
      }

      return {
        ...state,
        cards: updatedCards,
        gameOver: hasGameEnded,
      };
    }

    default:
      return state;
  }
};
