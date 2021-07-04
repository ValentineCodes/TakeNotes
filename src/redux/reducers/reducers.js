import {combineReducers} from 'redux';
import AllNotesReducer from './AllNotesReducer';
import ViewNoteReducer from './ViewNoteReducer';
import AllCategoriesReducer from './AllCategoriesReducer';
import ViewCategoryReducer from './ViewCategoryReducer';
import ViewCategoryNoteReducer from './ViewCategoryNoteReducer';

const reducers = combineReducers({
  allNotes: AllNotesReducer,
  allCategories: AllCategoriesReducer,
  viewNote: ViewNoteReducer,
  viewCategory: ViewCategoryReducer,
  viewCategoryNote: ViewCategoryNoteReducer,
});

export default reducers;
