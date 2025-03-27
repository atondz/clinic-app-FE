import { createStore } from 'redux';

// Reducer mẫu (bạn có thể thay bằng reducer thực tế)
const initialState = {
  user: null // Ví dụ state lưu thông tin user
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;