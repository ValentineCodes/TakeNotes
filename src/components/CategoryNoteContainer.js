import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useDispatch} from 'react-redux';

export default function CategoryNoteContainer(props) {
  const dispatch = useDispatch();

  function deleteNote() {
    dispatch({
      type: 'deleteNote',
      payload: {
        name: props.name,
        noteKey: props.noteKey,
        categoryKey: props.categoryKey,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Icon name="ellipsis-v" type="font-awesome" iconStyle={styles.Icon} />

      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>{props.title}</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>{props.notePreview}</Text>
          <Text>{props.timestamp}</Text>
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.5}>
        <Icon
          name="delete"
          color="#900"
          size={25}
          iconStyle={styles.Icon}
          onPress={deleteNote}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
  },
  Icon: {
    marginHorizontal: 15,
  },
});
