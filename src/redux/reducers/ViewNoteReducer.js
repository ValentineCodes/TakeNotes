import {viewedNote} from '../actions/types';

export default function viewNoteReducer(state = {}, action) {
  if (action.type == viewedNote) {
    return {
      title: action.payload.title,
      note: action.payload.note,
      key: action.payload.key,
      categoryKey: action.payload.categoryKey,
      timestamp: action.payload.timestamp,
    };
  } else {
    return state;
  }
}
