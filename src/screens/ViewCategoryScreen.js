import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import CategoryNoteContainer from '../components/CategoryNoteContainer';
import AddCategoryNoteModal from './AddCategoryNoteModal';
import {themeColor} from '../../styles';

export default function ViewCategoryScreen({navigation}) {
  const dispatch = useDispatch();
  const categoryKey = useSelector(state => state.viewCategory.key);
  const name = useSelector(state => state.viewCategory.name);
  const notes = useSelector(state => state.viewCategory.notes);

  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);

  function closeAddNoteModal() {
    setIsAddNoteModalOpen(false);
  }
  function viewNote(title, note, noteKey, timestamp) {
    dispatch({
      type: 'viewedCategoryNote',
      payload: {
        title,
        note,
        noteKey,
        categoryKey,
        timestamp,
      },
    });
    navigation.navigate('ViewCategoryNoteScreen');
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('HomeScreen')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="chevron-left"
              type="font-awesome"
              size={15}
              color="rgba(250,250,250,0.9)"
            />
            <Text
              style={{
                color: 'rgba(250,250,250,0.9)',
                fontSize: 20,
                marginLeft: 5,
              }}>
              Categories
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            color: 'rgba(250,250,250,0.9)',
            fontSize: 18,
            fontStyle: 'italic',
          }}>
          {name}
        </Text>
      </View>
      {/* Note List */}
      {notes.length == 0 ? (
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
          data={notes}
          renderItem={note => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={viewNote.bind(
                this,
                note.item.title,
                note.item.note,
                note.item.key,
                note.item.timestamp,
              )}>
              <CategoryNoteContainer
                name={name}
                title={note.item.title}
                notePreview={note.item.notePreview}
                note={note.item.note}
                timestamp={note.item.timestamp}
                noteKey={note.item.key}
                categoryKey={categoryKey}
              />
            </TouchableOpacity>
          )}
        />
      )}
      {/* Add Note Modal */}
      <AddCategoryNoteModal
        isVisible={isAddNoteModalOpen}
        closeModal={closeAddNoteModal}
        name={name}
        categoryKey={categoryKey}
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: themeColor,
    paddingHorizontal: 10,
  },
});
