import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import NoteContainer from '../components/NoteContainer';
import AddNoteModal from './AddNoteModal';
import {view} from '../redux/actions/actions';
import {themeColor} from '../../styles';

export default function NotesScreen({navigation}) {
  const dispatch = useDispatch();
  const allNotes = useSelector(state => state.allNotes);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  // const [keysToDelete, setKeysToDelete] = useState([]);
  // const [checkBoxDisplay, setCheckBoxDisplay] = useState('none');
  // const [isCheckVisible, setIsCheckVisible] = useState(false);

  // useEffect(() => {
  //   if (isCheckVisible) {
  //     setCheckBoxDisplay('flex');
  //   } else {
  //     setCheckBoxDisplay('none');
  //   }
  // }, [isCheckVisible]);

  function closeAddNoteModal() {
    setIsAddNoteModalOpen(false);
  }

  function viewNote(title, note, key, categoryKey, timestamp) {
    dispatch(view({title, note, key, categoryKey, timestamp}));
    navigation.navigate('ViewNoteScreen');
  }

  // function pushKey(noteKey) {
  //   setKeysToDelete(curKeys => [noteKey, ...curKeys]);
  // }
  // function popKey(noteKey) {
  //   setKeysToDelete(curKeys => curKeys.filter(key => key != noteKey));
  // }

  // function removeNotes() {
  //   dispatch({
  //     type: 'deleteNotes',
  //     payload: {
  //       keysToDelete,
  //     },
  //   });
  // }

  // function toggleCheckBox() {
  //   setIsCheckVisible(state => !state);
  // }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* Note List */}
      {allNotes.length == 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.3,
          }}>
          <Icon name="book" type="font-awesome" size={120} />
          <Text style={{fontSize: 25}}>No Notes</Text>
        </View>
      ) : (
        <FlatList
          data={allNotes}
          renderItem={note => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={viewNote.bind(
                this,
                note.item.title,
                note.item.note,
                note.item.key,
                note.item.categoryKey,
                note.item.timestamp,
              )}
              // onLongPress={toggleCheckBox}
            >
              <NoteContainer
                title={note.item.title}
                notePreview={note.item.notePreview}
                note={note.item.note}
                timestamp={note.item.timestamp}
                id={note.item.key}
                // displayState={checkBoxDisplay}
                // addKey={pushKey.bind(this, note.item.key)}
                // removeKey={popKey.bind(this, note.item.key)}
              />
            </TouchableOpacity>
          )}
        />
      )}

      {/* <TouchableOpacity
        style={{backgroundColor: 'blue', padding: 10, alignSelf: 'center'}}
        onPress={removeNotes}>
        <Text style={{color: 'white'}}>Delete</Text>
      </TouchableOpacity> */}

      {/* Add Note Modal */}
      <AddNoteModal
        isVisible={isAddNoteModalOpen}
        closeModal={closeAddNoteModal}
      />
      {/* Add Note Button */}
      <TouchableOpacity
        activeOpacity={0.5}
        style={{position: 'absolute', bottom: 10, right: 10}}
        onPress={() => setIsAddNoteModalOpen(true)}>
        <Icon reverse name="add" color={themeColor} />
      </TouchableOpacity>
    </View>
  );
}
