export default (state: { [x: string]: any; }, action: { type: any; name: string | number; value: any; }) => {
  switch (action.type) {
    case 'update':
      return ({
        ...state,
        [action.name]: action.value
      })
    case 'delete':
      delete state[action.name];
      return state;
    default:
      return state;
  }
};