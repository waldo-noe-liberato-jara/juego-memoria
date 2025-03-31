import { ITEMS } from "../data/items";
import { LEVELS } from "../data/levels";
import {
  compareCards,
  generateShuffledCardDeck,
  isGameWon,
  markCardsAsMatched,
  resetCardSelection,
} from "../utils/gameLogic";
import { shuffleArray } from "../utils/shuffle";

export const initialState = {
  level: LEVELS[0],
  cards: generateShuffledCardDeck(ITEMS, LEVELS[0]),
  firstCardSelected: null,
  secondCardSelected: null,
  disabled: false,
  gameOver: false,
  turn: 0,
  play: false,
};

export const memoryGameReducer = (state, action) => {
  switch (action.type) {
    //ACTUALIZADO
    case "SELECT_LEVEL": {
      const selectedLevel = action.payload.selectedLevel;
      const updateCards = generateShuffledCardDeck(ITEMS, selectedLevel);
      const updateDisabled = false;
      const updateSelected = null;
      const updateTurn = 0;
      return {
        ...state,
        cards: updateCards,
        level: selectedLevel,
        disabled: updateDisabled,
        firstCardSelected: updateSelected,
        secondCardSelected: updateSelected,
        turn: updateTurn,
      };
    }
    //ACTUALIZADO
    case "INCREMENT_TURN": {
      return { ...state, turn: state.turn + 1 };
    }

    //ACTUALIZADO
    case "SELECT_CARD": {
      const selectedCard = action.payload.selectedCard;
      const firstCardSelected = state.firstCardSelected;
      const secondCardSelected = state.secondCardSelected;

      if (
        !selectedCard ||
        firstCardSelected?.id === selectedCard.id ||
        secondCardSelected?.id === selectedCard.id
      ) {
        return state;
      }

      const updatedCards = state.cards.map((card) =>
        card.id === selectedCard.id ? { ...card, state: true } : card
      );

      if (!state.firstCardSelected) {
        return {
          ...state,
          cards: updatedCards,
          firstCardSelected: selectedCard,
          play: true,
        };
      } else {
        return {
          ...state,
          cards: updatedCards,
          secondCardSelected: selectedCard,
          play: true,
        };
      }
    }
    //ACTUALIZADO
    case "DISABLE_CARD": {
      const selectedCardID = state.cards[action.payload.index].id;

      const updatedCards = state.cards.map((card) =>
        card.id === selectedCardID ? { ...card, state: false } : card
      );

      return { ...state, cards: updatedCards };
    }

    case "COMPARE": {
      if (!state.firstCardSelected || !state.secondCardSelected) return state;

      const firstCardSelected = state.firstCardSelected;
      const secondCardSelected = state.secondCardSelected;

      let newCards = [];
      let gameOver = false;

      if (firstCardSelected.value === secondCardSelected.value) {
        newCards = markCardsAsMatched(state.cards, [
          firstCardSelected,
          secondCardSelected,
        ]);
        gameOver = isGameWon(newCards);
      } else {
        newCards = resetCardSelection(state.cards, [
          firstCardSelected,
          secondCardSelected,
        ]);
      }
      return {
        ...state,
        cards: newCards,
        firstCardSelected: null,
        secondCardSelected: null,
        disabled: false,
        gameOver,
        play: !gameOver,
      };
    }

    case "RESET_CARDS": {
      const newStates = state.cards.map((card) => ({ ...card, state: false }));
      const newOrder = shuffleArray(newStates);
      const updateDisabled = false;
      const updateSelected = null;
      const updateTurn = 0;

      return {
        ...state,
        cards: newOrder,
        disabled: updateDisabled,
        firstCardSelected: updateSelected,
        secondCardSelected: updateSelected,
        turn: updateTurn,
      };
    }

    case "SET_PLAY": {
      const updatePlay = action.payload.play;
      return { ...state, play: updatePlay };
    }

    case "SET_DISABLED": {
      const updateDisabled = action.payload.disabled;
      return { ...state, disabled: updateDisabled };
    }

    default:
      return state;
  }
};
