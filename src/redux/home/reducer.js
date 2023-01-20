const homeReducer = (state = { select: [], allData: [] }, action) => {
  switch (action.type) {
    case "GETDATA":
      return { ...state, allData: action.payload };
    case "SELECT":
      return { ...state, select: [...state.select, action.payload] };
    case "UNSELECT":
      let data = state.select.filter((ele) => ele != action.payload);
      return { ...state, select: [...data] };
    case "UNSELECTALL":
      return { ...state, select: [...[]] };
    default:
      return state;
  }
};
export default homeReducer;
