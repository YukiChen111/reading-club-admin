import fetchBookList from '../services/bookListService';

export const GET_BOOK_LIST = 'GET_BOOK_LIST';

const START_REQUEST = 'BOOK_LIST_START_REQUEST';
const SUCCESS_REQUEST = 'BOOK_LIST_SUCCESS_REQUEST';
const FAILURE_REQUEST = 'BOOK_LIST_FAILURE_REQUEST';

export { START_REQUEST, SUCCESS_REQUEST, FAILURE_REQUEST, bookList };

function bookList(actionType, payload = {}) {
  return {
    type: actionType,
    payload,
  };
}

export default function getBookList() {
  return async (dispatch) => {
    dispatch(bookList(START_REQUEST));
    try {
      const ret = await fetchBookList();
      if (!ret) {
        dispatch(bookList(FAILURE_REQUEST, { msg: 'Something wrong!' }));
        return;
      }
      dispatch(bookList(SUCCESS_REQUEST, ret));
    } catch (e) {
      dispatch(bookList(FAILURE_REQUEST, { msg: 'Something wrong!' }));
      return;
    }
  };
}
