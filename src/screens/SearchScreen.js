import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import NoteContainer from '../components/NoteContainer';

export default function SearchScreen({hideSearchBox, viewNote}) {
  const dispatch = useDispatch();
  const allNotes = useSelector(state => state.allNotes);
  const [searchResults, setSearchResults] = useState([]);

  function search(searchText) {
    if (searchText.trim() == '') {
      setSearchResults([]);
    } else {
      setSearchResults(
        allNotes.filter(
          note =>
            note.title
              .toLowerCase()
              .includes(searchText.toLowerCase().trim()) === true,
        ),
      );
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.searhContainer}>
        <TouchableOpacity activeOpacity={0.5} onPress={hideSearchBox}>
          <Icon name="arrow-back" />
        </TouchableOpacity>
        <View style={{borderBottomWidth: 1, flex: 1}}>
          <TextInput
            selectTextOnFocus
            placeholder="What are you looking for?"
            onChangeText={search}
            autoCorrect={false}
            style={{fontSize: 20}}
          />
        </View>
        <Icon name="search" />
      </View>
      {/* Note List */}
      {searchResults.length == 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.3,
          }}>
          <Icon name="book" type="font-awesome" size={120} />
          <Text style={{fontSize: 25}}>No Match</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={note => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={viewNote.bind(
                this,
                note.item.title,
                note.item.note,
                note.index,
              )}>
              <NoteContainer
                title={note.item.title}
                notePreview={note.item.notePreview}
                note={note.item.note}
                timestamp={note.item.timestamp}
                id={note.item.key}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searhContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
