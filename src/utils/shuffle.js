export function shuffleArray(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("El primer argumento debe ser un array.");
  }

  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

/*
export function createCardObjects(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("El primer argumento debe ser un array.");
  }

  return array.map((item, index) => ({
    id: index + 1,
    value: item,
    state: false,
  }));
}

export function calculateTotalPairs(columns, rows, availableItems) {
  const totalPairs = (columns * rows) / 2;

  if (totalPairs > availableItems) {
    throw new Error(
      "No hay suficientes elementos en ITEMS para generar las cartas."
    );
  }

  return totalPairs;
}

export function selectAndDuplicateCards(cards, totalPairs) {
  const selectedCards = shuffleArray(cards).slice(0, totalPairs);
  return selectedCards.concat(selectedCards);
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

export function extractCardValues(cards) {
  if (!Array.isArray(cards)) {
    throw new TypeError("El primer argumento debe ser un array.");
  }

  return cards.map((card) => card.value);
}

export const isGameWon = (cards) => {
  if (!Array.isArray(cards)) {
    throw new TypeError("El primer argumento debe ser un array.");
  }

  return cards.every((item) => item.state);
};

export function markCardsAsMatched(
  cards,
  firstSelectedCard,
  secondSelectedCard
) {
  return cards.map((card) =>
    card.id === firstSelectedCard.id || card.id === secondSelectedCard.id
      ? { ...card, state: true }
      : card
  );
}

export function resetCardSelection(
  cards,
  firstSelectedCard,
  secondSelectedCard
) {
  return cards.map((card) =>
    card.id === firstSelectedCard.id || card.id === secondSelectedCard.id
      ? { ...card, state: false }
      : card
  );
}
*/

/*
export const compareCards = (cards, firstSelectedCard, secondSelectedCard) => {
  let newCards = [];
  let result = false;

  if (firstSelectedCard.value === secondSelectedCard.value) {
    newCards = markCardsAsMatched(cards, firstSelectedCard, secondSelectedCard);
    result = isGameWon(newCards);
  } else {
    newCards = resetCardSelection(cards, firstSelectedCard, secondSelectedCard);
  }

  return { newCards, result };
};
*/
