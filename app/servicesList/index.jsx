import { React, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, TextInput, ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { COLORS, FONT, SIZES } from "../../constants";
import { 
  JobDetailsCard,
} from "../../components";
import {
    BackNavBtn,
} from "../../components";

const ServicesList = () => {
    const [expenses, setExpenses] = useState([]);
    const [subTotal, setSubTotal] = useState(8000.00);
    const [total, setTotal] = useState(2000.00);
    const [vat, setVat] = useState(10000.00);

    const sampleData = {
        _id: '',
        vehicleNo: 'CAZ-7532',
        date: '2023-10-12',
        time: '10.00 AM',
        status: 'Pending'
    };

    const addExpense = () => {
        setExpenses((prevExpenses) => [...prevExpenses, ""]);
    };
    
    const removeExpense = (index) => {
        const updatedExpenses = expenses.filter((loc, i) => i !== index);
        setExpenses(updatedExpenses);
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View style={styles.container}>
            <Stack.Screen options={{           
                headerStyle: {
                backgroundColor: COLORS.background,
                },
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => <BackNavBtn />,
                headerTitle: " " }}
            />
            <ScrollView>
                <View style={[styles.sbmtBtn, styles.sbmtBtnView, styles.pkgView]}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Vehicle Number</Text>
                        <Text style={styles.label}>Date</Text>
                        <Text style={styles.label}>subTotal</Text>
                        <Text style={styles.label}>vat(5%)</Text>
                        <Text style={styles.label}>Total</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>: {sampleData.vehicleNo}</Text>
                        <Text style={styles.desc}>: {sampleData.date}</Text>
                        <Text style={styles.title}>: {subTotal}</Text>
                        <Text style={styles.title}>: {vat}</Text>
                        <Text style={styles.title}>: {total}</Text>
                    </View>
                </View>
                <View style={styles.dynamicInputContainer}>
                    <Text style={styles.dynamicInputTitle}>Description</Text>
                    {expenses.map((expense, index) => (
                        <View
                        style={styles.dynamicInputWrapperLocation}
                        key={`expense-${index}`}
                        >
                            <TextInput
                                style={styles.dynamicTextInput}
                                placeholder={`Expense ${index + 1}`}
                                placeholderTextColor={COLORS.mediumGray}
                                onChangeText={(text) => {
                                const updatedExpenses = [...expenses];
                                updatedExpenses[index] = text;
                                setExpenses(updatedExpenses);
                                }}
                                value={expense}
                            />
                            <TouchableOpacity
                                style={styles.closeButtonWrapper}
                                onPress={() => removeExpense(index)}
                            >
                                <Text style={styles.closeButtonLocation}>X</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.addButton} onPress={addExpense}>
                        <Text style={styles.addButtonText}>
                        {expenses.length === 0
                            ? "+ Charges"
                            : "+ Additional Charges"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.sbmtBtn, styles.sbmtBtnView]}>
                    <TouchableOpacity style={[styles.sbmtBtnView]}>
                        <Text style={[styles.bookNowSize, styles.sbmtBtnText]}>CONFIRM</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: SIZES.large,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: SIZES.xLarge,
    fontFamily: FONT.semiBold,
  },
  activeHeaderContainer: {
    position: "absolute",
    right: 0,
  },
  trackingContainer: {
    marginHorizontal: SIZES.large,
    marginVertical: SIZES.small * 0.5,
  },
  trackingTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.semiBold,
    marginBottom: SIZES.medium,
  },
  sbmtBtn: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary
  },
  sbmtBtnView: {
    paddingVertical: 8,
  },
  sbmtBtnText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontFamily: FONT.bold
  },
  pkgView: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelContainer: {
    flex: 2,
  },
  label: {
    fontSize: SIZES.medium,
    fontFamily: FONT.extraBold,
    marginBottom: SIZES.xSmall * 0.5,
    marginTop: SIZES.xSmall * 0.3
  },
  textContainer: {
    flex: 3,
    marginBottom:3
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    marginBottom: SIZES.xSmall * 0.5,
    marginTop: SIZES.xSmall * 0.3
  },
  desc: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    marginTop: 1
  },
  outerLabel : {
    margin: SIZES.xSmall * 1.1
  },
  dynamicInputContainer: {
    marginBottom: SIZES.medium,
    backgroundColor: COLORS.primary + "0F",
    padding: SIZES.large,
    borderRadius: SIZES.medium,
  },
  dynamicInputTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    marginBottom: SIZES.small,
  },
  dynamicInputWrapper: {
    flexDirection: "column",
    marginVertical: SIZES.small,
    borderWidth: 1,
    borderRadius: SIZES.medium,
    padding: SIZES.small,
    paddingVertical: SIZES.medium,
    borderColor: COLORS.mediumGray,
    paddingTop: 40,
  },
  dynamicInputWrapperLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dynamicTextInput: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    marginRight: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    width: "100%",
  },
  closeButtonWrapperPkg: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "flex-end",
    position: "absolute",
    right: 10,
    top: 10,
  },
  closeButton: {
    color: "red",
    borderRadius: 20,
  },
  closeButtonLocation: {
    color: "red",
    borderRadius: SIZES.large,
  },
  closeButtonWrapper: {
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.xSmall * 0.4,
    // backgroundColor: COLORS.white,
  },
  addButton: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "black",
  },
});

export default ServicesList;