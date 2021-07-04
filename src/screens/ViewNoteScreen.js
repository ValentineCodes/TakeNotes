import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import EditNoteModal from './EditNoteModal';
import {themeColor} from '../../styles';

export default function ViewNoteSceen({navigation}) {
  const title = useSelector(state => state.viewNote.title);
  const note = useSelector(state => state.viewNote.note);
  const key = useSelector(state => state.viewNote.key);
  const categoryKey = useSelector(state => state.viewNote.categoryKey);
  const timestamp = useSelector(state => state.viewNote.timestamp);

  const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false);
  function closeModal() {
    setIsEditNoteModalOpen(false);
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
              Notes
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            color: 'rgba(250,250,250,0.9)',
            fontSize: 20,
          }}>
          Reading...
        </Text>
      </View>
      {/* Timestamp */}
      <Text style={{fontWeight: 'bold', padding: 3}}>{timestamp}</Text>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>
      {/* Note */}
      <Text style={styles.note}> {note} </Text>
      {/* Edit Note Modal */}
      <EditNoteModal
        isVisible={isEditNoteModalOpen}
        closeModal={closeModal}
        title={title}
        note={note}
        noteKey={key}
        categoryKey={categoryKey}
        timestamp={timestamp}
      />
      {/* Edit Note Button */}
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.editButton}
        onPress={() => setIsEditNoteModalOpen(true)}>
        <Icon reverse name="brush" color={themeColor} />
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
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  note: {
    paddingHorizontal: 15,
  },
  editButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
