import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Keyboard,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {view} from '../redux/actions/actions';
//Components
import NotesScreen from './NotesScreen';
import CategoriesScreen from './CategoriesScreen';
import SearchScreen from './SearchScreen';
import {themeColor} from '../../styles';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const value = useState(new Animated.Value(0))[0];

  function viewNote(title, note, index) {
    dispatch(view({title, note, index}));
    navigation.navigate('ViewNoteScreen');
  }

  function showSearchBox() {
    Animated.timing(value, {
      toValue: -Dimensions.get('screen').width,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }
  function hideSearchBox() {
    Keyboard.dismiss();
    Animated.timing(value, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }
  // console.log(SliderProps)
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 25,
            color: 'rgba(250,250,250,0.9)',
          }}>
          TakeNotes
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="ios-moon"
            type="ionicon"
            color="rgba(250,250,250,0.9)"
            iconStyle={{marginRight: 20}}
            size={28}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={showSearchBox}>
            <Icon
              name="search"
              color="rgba(250,250,250,0.9)"
              iconStyle={{marginRight: 20}}
              size={28}
            />
          </TouchableOpacity>
          <Icon name="settings" color="rgba(250,250,250,0.9)" size={28} />
        </View>
      </View>

      {/* Tab Navigator */}
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: themeColor,
          },
          activeTintColor: 'white',
          inactiveTintColor: 'rgba(180,180,180,0.9)',
          pressColor: 'rgba(250,250,250,0.9)',
        }}>
        {/* <Tab.Screen name="PlayGround" component={PlayGround} /> */}
        <Tab.Screen name="Notes" component={NotesScreen} />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
      </Tab.Navigator>

      <Animated.View
        style={[
          {
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: Dimensions.get('screen').width,
            transform: [{translateX: value}],
          },
        ]}>
        <SearchScreen hideSearchBox={hideSearchBox} viewNote={viewNote} />
      </Animated.View>
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
