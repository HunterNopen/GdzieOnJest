import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';

const data = [
  { label: '851', value: '851' },
  { label: '852', value: '852' },
  { label: '854', value: '854' },
  { label: '855', value: '855' },
  { label: '856', value: '856' },
  { label: '857', value: '857' },
  { label: '859', value: '859' },
  { label: '860', value: '860' },
  { label: '861', value: '861' },
  { label: '862', value: '862' },
  { label: '863', value: '863' },
  { label: '864', value: '864' },
  { label: '865', value: '865' },
  { label: '866', value: '866' },
  { label: '867', value: '867' },
  { label: '868', value: '868' },
  { label: '869', value: '869' },
  { label: '870', value: '870' },
  { label: '871', value: '871' },
  { label: '881', value: '881' },
  { label: '882', value: '882' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  
  const navigation = useNavigation(); // Uzyskanie dostępu do obiektu navigation

  const handleSelect = (item) => {
    setValue(item.value);
    // Przekierowanie na stronę "SelectDirection" i przekazanie wybranej wartości
    navigation.navigate('SelectDirection', { line: item.value });
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="linia..."
      searchPlaceholder="szukaj"
      value={value}
      onChange={handleSelect} // Zaktualizowany handler
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    width:90,
    margin: 16,
    padding:5,
    height: 35,
    borderBlockColor:'black',
    borderWidth:1,
    // borderBottomColor: 'gray',
    // borderBottomWidth: 0.5,
   borderRadius:5
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});