import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import CategoryContainer from '../components/CategoryContainer';
import AddCategoryPopUp from '../components/AddCategoryPopUp';
import {themeColor} from '../../styles';

export default function CategoriesScreen({navigation}) {
  const categories = useSelector(state => state.allCategories);

  const dispatch = useDispatch();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  function saveCategory(categoryName) {
    dispatch({
      type: 'addedCategory',
      payload: {
        categoryName,
      },
    });
    setIsPopUpVisible(false);
  }
  function closePopUp(params) {
    setIsPopUpVisible(false);
  }
  function viewCategory(key, name, notes) {
    dispatch({
      type: 'viewedCategory',
      payload: {
        key,
        name,
        notes,
      },
    });
    navigation.navigate('ViewCategoryScreen');
  }

  //Add Category Name Pop Up
  let popUp = '';
  if (isPopUpVisible) {
    popUp = (
      <AddCategoryPopUp saveCategory={saveCategory} closePopUp={closePopUp} />
    );
  } else {
    popUp = null;
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* Category List */}
      {categories.length == 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.3,
          }}>
          <Icon name="book" type="font-awesome" size={120} />
          <Text style={{fontSize: 25}}>No Categories</Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={category => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={viewCategory.bind(
                this,
                category.item.key,
                category.item.name,
                category.item.notes,
              )}>
              <CategoryContainer
                name={category.item.name}
                noteLength={category.item.notes.length}
                id={category.item.key}
              />
            </TouchableOpacity>
          )}
        />
      )}

      {/* Add Category Button */}
      <TouchableOpacity
        activeOpacity={0.5}
        style={{position: 'absolute', bottom: 10, right: 10}}
        onPress={() => setIsPopUpVisible(true)}>
        <Icon reverse name="add" color={themeColor} />
      </TouchableOpacity>
      {/* Add Category Pop Up */}
      {popUp}
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
