import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {edit, view} from '../redux/actions/actions';
import {themeColor} from '../../styles';

export default function EditNoteScreen(props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(props.title);
  const [note, setNote] = useState(props.note);
  const key = props.noteKey;
  const categoryKey = props.categoryKey;
  function getNotePreview() {
    if (note.length <= 30) {
      return note.replace(/\n/g, ',').trim();
    } else {
      return note
        .replace(/\n/g, ',')
        .slice(0, Dimensions.get('screen').width / 14)
        .padEnd(Dimensions.get('screen').width / 14 + 3, '.')
        .trim();
    }
  }

  function getTimestamp() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${hour}:${minutes} ${day}-${month}-${year}`;
  }
  function saveNote() {
    let notePreview = getNotePreview();
    let timestamp = getTimestamp();

    dispatch(view({title: title.trim(), note, key, categoryKey, timestamp}));
    dispatch(
      edit({
        title: title.trim(),
        notePreview,
        note,
        timestamp,
        key,
        categoryKey,
      }),
    );
    dispatch({
      type: 'editedCategoryNoteFromNotes',
      payload: {
        prevTitle: props.title.trim(),
        prevNote: props.note.trim(),
        prevTimestamp: props.timestamp.trim(),
        title: title.trim(),
        notePreview,
        note,
        timestamp,
        categoryKey,
      },
    });
    props.closeModal();
  }

  return (
    <Modal visible={props.isVisible}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.5} onPress={props.closeModal}>
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
              Reading
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5} onPress={saveNote}>
          <Icon name="check" color="rgba(250,250,250,0.9)" size={25} />
        </TouchableOpacity>
      </View>

      {/* Note Entries */}
      {/* Title */}
      <View style={styles.titleContainer}>
        <TextInput
          placeholder="Enter Title"
          maxLength={35}
          style={styles.title}
          value={title}
          autoFocus={true}
          autoCorrect={false}
          onChangeText={text => setTitle(text)}
        />
      </View>
      {/* Note */}
      <View>
        <TextInput
          multiline={true}
          autoCorrect={false}
          placeholder="What's On Your Mind?"
          style={styles.note}
          value={note}
          onChangeText={text => setNote(text)}
        />
      </View>
    </Modal>
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    borderBottomWidth: 1,
    width: '65%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  note: {
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
