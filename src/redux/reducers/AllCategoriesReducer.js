let key = 0;
let id = 0;

function allCategories(state = [], action) {
  let details = action.payload;
  //Add Category
  if (action.type == 'addedCategory') {
    return [
      {
        key: `${++key}`,
        name: details.categoryName,
        notes: [],
      },
      ...state,
    ];
  }
  //Delete Category
  else if (action.type == 'deletedCategory') {
    return state.filter(category => category.key !== details.key);
  }
  //Add Note To A Category
  else if (action.type == 'addedNote') {
    return state.map(category =>
      category.key == details.categoryKey
        ? {
            key: category.key,
            name: category.name,
            notes: [
              {
                key: `${++id}`,
                title: details.title,
                notePreview: details.notePreview,
                note: details.note,
                timestamp: details.timestamp,
              },
              ...category.notes,
            ],
          }
        : category,
    );
  }
  // Delete Note From A Category
  else if (action.type == 'deleteNote') {
    return state.map(category =>
      category.key == details.categoryKey
        ? {
            key: category.key,
            name: category.name,
            notes: category.notes.filter(note => note.key !== details.noteKey),
          }
        : category,
    );
  }
  //Edit Category Note
  else if (action.type == 'edit') {
    return state.map(category =>
      category.key == details.categoryKey
        ? {
            key: category.key,
            name: category.name,
            notes: category.notes.map(note =>
              note.key == details.noteKey
                ? {
                    key: note.key,
                    title: details.title,
                    notePreview: details.notePreview,
                    note: details.note,
                    timestamp: details.timestamp,
                  }
                : note,
            ),
          }
        : category,
    );
  } else if (action.type == 'editedCategoryNoteFromNotes') {
    return state.map(category =>
      category.key == details.categoryKey
        ? {
            key: category.key,
            name: category.name,
            notes: category.notes.map(note =>
              note.title == details.prevTitle &&
              note.note == details.prevNote &&
              note.timestamp == details.prevTimestamp
                ? {
                    key: note.key,
                    title: details.title,
                    notePreview: details.notePreview,
                    note: details.note,
                    timestamp: details.timestamp,
                  }
                : note,
            ),
          }
        : category,
    );
  } else {
    return state;
  }
}

export default allCategories;
