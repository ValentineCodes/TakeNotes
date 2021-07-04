import {viewedCategoryNote} from '../actions/types';

export default function viewCategoryNoteReducer(state = {}, action) {
  if (action.type == 'viewedCategoryNote') {
    return {
      title: action.payload.title,
      note: action.payload.note,
      noteKey: action.payload.noteKey,
      categoryKey: action.payload.categoryKey,
      timestamp: action.payload.timestamp,
    };
  } else {
    return state;
  }
}
