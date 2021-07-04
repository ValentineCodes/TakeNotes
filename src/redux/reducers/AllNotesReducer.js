import {addedNote, deletedNote, editedNote} from '../actions/types';

let key = 0;
let initialState = [];

function allNotesReducer(state = initialState, action) {
  let details = action.payload;
  //Add Note
  if (action.type == addedNote) {
    return [
      {
        key: `${++key}`,
        title: details.title,
        notePreview: details.notePreview,
        note: details.note,
        timestamp: details.timestamp,
        categoryKey: details.categoryKey,
      },
      ...state,
    ];
  }
  //Delete Note(s)
  else if (action.type == deletedNote) {
    return state.filter(note => note.key !== details.key);
  } else if (action.type == 'deleteNotes') {
    return state.filter(note => !details.keysToDelete.includes(note.key));
  }
  //Edit Note
  else if (action.type == editedNote) {
    let newState = state.map(note =>
      note.key == details.key
        ? {
            key: note.key,
            title: details.title,
            notePreview: details.notePreview,
            note: details.note,
            timestamp: details.timestamp,
            categoryKey: details.categoryKey,
          }
        : note,
    );
    let prevNotes = newState.filter(note => note.key !== details.key);
    let noteEdited = newState.filter(note => note.key == details.key);
    let editedState = [...noteEdited, ...prevNotes];
    return editedState;
  } else if (action.type == 'editedCategoryNoteFromCategory') {
    return state.map(note =>
      note.categoryKey == details.categoryKey &&
      note.title == details.prevTitle &&
      note.note == details.prevNote &&
      note.timestamp == details.prevTimestamp
        ? {
            key: note.key,
            title: details.title,
            notePreview: details.notePreview,
            note: details.note,
            timestamp: details.timestamp,
            categoryKey: details.categoryKey,
          }
        : note,
    );
  } else {
    return state;
  }
}

export default allNotesReducer;
