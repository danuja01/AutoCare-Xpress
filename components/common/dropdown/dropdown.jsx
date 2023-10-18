import React from "react";
import { View, Text } from "react-native";
import styles from "./dropdown.style";
import SelectDropdown from "react-native-select-dropdown";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONT, SIZES } from "../../../constants";

const Dropdown = ({ data, title }) => {
  return (
    <SelectDropdown
      buttonStyle={styles.dropdown}
      defaultButtonText={title}
      buttonTextStyle={{
        color: COLORS.black,
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        textAlign: "center",
      }}
      renderDropdownIcon={() => {
        return (
          <MaterialCommunityIcons
            name="chevron-down"
            color={COLORS.black}
            size={30}
          />
        );
      }}
      dropdownIconPosition="right"
      dropdownStyle={styles.dropdownContent}
      data={data}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
    />
  );
};

export default Dropdown;
