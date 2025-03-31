const initialGameSettingsState = {
  turn: 0,
  play: false,
};

const gameSettingsReducer = (state, action) => {
  switch (action.type) {
    case "SET_TURN": {
      const updateTurn = action.payload.turn;
      return { ...state, turn: updateTurn };
    }

    case "SET_PLAY": {
      const updatePlay = action.payload.play;
      return { ...state, play: updatePlay };
    }

    default:
      return state;
  }
};
