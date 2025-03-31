import { shuffleArray } from "./shuffle";

export function createCardObjects(items) {
  if (!Array.isArray(items)) {
    throw new TypeError("El primer argumento debe ser un array.");
  }

  return items.map((item, index) => ({
    id: index + 1,
    value: item,
    state: false,
  }));
}

export function selectAndDuplicateCards(cards, totalPairs) {
  const selectedCards = shuffleArray(cards).slice(0, totalPairs);
  return selectedCards.concat(selectedCards);
}

export function extractCardValues(cards) {
  if (!Array.isArray(cards)) {
    throw new TypeError("El primer argumento debe ser un array.");
  }

  return cards.map((card) => card.value);
}
