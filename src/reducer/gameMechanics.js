const initialGameMechanicsState = {
  selected: null,
  disabled: false,
};

const gameMechanicsStateReducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED": {
      const updateSelected = action.payload.selected;
      return { ...state, selected: updateSelected };
    }

    case "SET_DISABLED": {
      const updateDisabled = action.payload.disabled;
      return { ...state, disabled: updateDisabled };
    }

    default:
      return state;
  }
};
