import { shuffleArray } from "./shuffle";
import { createCardObjects, selectAndDuplicateCards } from "./cards";

export function calculateTotalPairs(columns, rows, availableItems) {
  const totalPairs = (columns * rows) / 2;

  if (totalPairs > availableItems) {
    throw new Error(
      "No hay suficientes elementos en ITEMS para generar las cartas."
    );
  }

  return totalPairs;
}

export function generateShuffledCardDeck(items, { columns, rows }) {
  if (!Array.isArray(items)) {
    throw new TypeError("El primer argumento debe ser un array.");
  }

  const totalPairs = calculateTotalPairs(columns, rows, items.length);
  const duplicatedCards = selectAndDuplicateCards(items, totalPairs);
  const newOrder = shuffleArray(duplicatedCards);

  return createCardObjects(newOrder);
}

export function isGameWon(cards) {
  if (!Array.isArray(cards)) {
    throw new TypeError("El primer argumento debe ser un array.");
  }

  return cards.every((item) => item.state);
}

export function markCardsAsMatched(cards, selectedCards) {
  const selectedIds = selectedCards.map((card) => card.id);

  return cards.map((card) =>
    selectedIds.includes(card.id) ? { ...card, state: true } : card
  );
}

export function resetCardSelection(cards, selectedCards) {
  const selectedIds = selectedCards.map((card) => card.id);

  return cards.map((card) =>
    selectedIds.includes(card.id) ? { ...card, state: false } : card
  );
}

export function compareCards(cards, selectedCard, secondSelectedCard) {
  if (!selectedCard) return { newCards: cards, result: false };

  let newCards = [];
  let result = false;

  if (selectedCard.value === secondSelectedCard.value) {
    newCards = markCardsAsMatched(cards, [selectedCard, secondSelectedCard]);
    result = isGameWon(newCards);
  } else {
    newCards = resetCardSelection(cards, [selectedCard, secondSelectedCard]);
  }

  return { newCards, result };
}
