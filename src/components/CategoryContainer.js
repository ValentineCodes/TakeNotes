import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useDispatch} from 'react-redux';
import {themeColor} from '../../styles';

export default function CategoryContainer(props) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Icon name="ellipsis-v" type="font-awesome" iconStyle={styles.Icon} />

      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>{props.name}</Text>
      </View>

      <View style={styles.noteLengthContainer}>
        <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
          {props.noteLength}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          dispatch({
            type: 'deletedCategory',
            payload: {
              key: props.id,
            },
          })
        }>
        <Icon name="delete" color="#900" size={25} iconStyle={styles.Icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  Icon: {
    marginHorizontal: 15,
  },
  noteLengthContainer: {
    backgroundColor: themeColor,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    width: 30,
    height: 30,
  },
});
