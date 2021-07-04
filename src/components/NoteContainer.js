import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon, CheckBox} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useDispatch} from 'react-redux';
import {remove} from '../redux/actions/actions';

export default function NoteContainer(props) {
  const dispatch = useDispatch();
  // const [isChecked, setIsChecked] = useState(false);
  function deleteNote() {
    dispatch(remove(props.id));
  }

  // useEffect(() => {
  //   if (isChecked) {
  //     props.addKey();
  //   } else {
  //     props.removeKey();
  //   }
  // }, [isChecked]);

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

      <TouchableOpacity activeOpacity={0.5} onPress={deleteNote}>
        <Icon name="delete" color="#900" size={25} iconStyle={styles.Icon} />
      </TouchableOpacity>
      {/* <CheckBox
        checked={isChecked}
        onPress={() => setIsChecked(!isChecked)}
        containerStyle={{display: props.displayState}}
      /> */}
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
