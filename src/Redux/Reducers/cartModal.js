const INITIAL_STATE = false;

const cartModal = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "OPEN_MODAL":
        return true;
      case "CLOSE_MODAL":
        return false;
      default:
        return state;
    }
  };

  export default cartModal;