import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "./search.style";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../../constants";

const Search = () => {
  const searchHeadding = "Select or search your favourite Service Center!";

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.searchHeadding}>
          {searchHeadding.toUpperCase()}
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            // value=""
            style={styles.searchInput}
            onChange={() => {}}
            placeholder="What are you lokking for?"
            placeholderTextColor={COLORS.mediumGray}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            alert("search");
          }}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.searchBtn}
          >
            <Image
              source={require("../../../assets/images/Filter.png")}
              resizeMode="contain"
              style={styles.searchBtnImage}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;
