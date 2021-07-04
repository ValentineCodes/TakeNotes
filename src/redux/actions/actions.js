import {addedNote, deletedNote, viewedNote, editedNote} from './types';
export function add(noteDetails) {
  return {
    type: addedNote,
    payload: noteDetails,
  };
}

export function remove(key) {
  return {
    type: deletedNote,
    payload: {
      key,
    },
  };
}

export function view(details) {
  return {
    type: viewedNote,
    payload: details,
  };
}

export function edit(details) {
  return {
    type: editedNote,
    payload: details,
  };
}
