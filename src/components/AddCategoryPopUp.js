import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Icon} from 'react-native-elements';

export default function AddCategoryPopUp(props) {
  const [categoryName, setCategoryName] = useState('');
  function save() {
    props.saveCategory(categoryName.trim());
  }
  return (
    <View style={styles.popUpContainer}>
      <View style={styles.popUp}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{backgroundColor: '#66f'}}>
              <Icon name="add" size={22} color="white" />
            </View>
            <Text style={{fontSize: 17, color: '#66f', marginLeft: 5}}>
              New Category
            </Text>
          </View>

          <Text style={{fontWeight: 'bold', fontSize: 17}}>
            {categoryName.length}/20
          </Text>
        </View>
        {/* Input */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            borderBottomWidth: 1,
          }}>
          <TextInput
            autoFocus
            maxLength={20}
            placeholder="Name this category"
            style={styles.input}
            onChangeText={text => setCategoryName(text)}
          />
          <Icon name="brush" iconStyle={{marginTop: 7}} />
        </View>
        {/* Buttons */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={props.closePopUp}>
            <Text style={{fontSize: 20, color: '#f22'}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight: 20}} onPress={save}>
            <Text style={{fontSize: 20, color: '#22f'}}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  popUpContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUp: {
    backgroundColor: 'white',
    width: '75%',
    height: 200,
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    textAlign: 'center',
    fontSize: 20,
  },
});
