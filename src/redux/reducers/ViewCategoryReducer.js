const initialState = {key: '', name: '', notes: []};
let id = 0;
export default function ViewCategoryReducer(state = initialState, action) {
  if (action.type == 'viewedCategory') {
    return {
      key: action.payload.key,
      name: action.payload.name,
      notes: action.payload.notes,
    };
  } else if (action.type == 'addedCategoryNote') {
    return {
      key: state.key,
      name: action.payload.name,
      notes: [
        {
          key: `${++id}`,
          title: action.payload.title,
          notePreview: action.payload.notePreview,
          note: action.payload.note,
          timestamp: action.payload.timestamp,
        },
        ...state.notes,
      ],
    };
  } else if (action.type == 'deleteNote') {
    return {
      key: action.payload.categoryKey,
      name: action.payload.name,
      notes: state.notes.filter(note => note.key !== action.payload.noteKey),
    };
  } else if (action.type == 'edit') {
    return {
      key: state.key,
      name: state.name,
      notes: state.notes.map(note =>
        note.key == action.payload.noteKey
          ? {
              key: note.key,
              title: action.payload.title,
              notePreview: action.payload.notePreview,
              note: action.payload.note,
              timestamp: action.payload.timestamp,
            }
          : note,
      ),
    };
  } else {
    return state;
  }
}
