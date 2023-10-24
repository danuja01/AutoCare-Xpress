import React, { useRef, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import RBSheet from "@nonam4/react-native-bottom-sheet";
import { TextInput } from "react-native-gesture-handler";
import { COLORS } from "../../../constants";
import { CheckBox } from 'react-native-elements';
 

const NewCard = () => {
    const [holdersName, setholdersName] = useState('');
    const [cardNumber, setcardNumber] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [cvv, setCVV] = useState('');
    const [save, setSave] = useState('');
    const [checked, setChecked] = useState(false);

    const refRBSheet = useRef();

    return (
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
        >
            <TouchableOpacity
                title="OPEN BOTTOM SHEET"
                onPress={() => refRBSheet.current?.open()}
            >
                <Text>Button</Text>
            </TouchableOpacity>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={450}
                customStyles={{
                wrapper: {
                    backgroundColor: "transparent",
                },
                draggableIcon: {
                    backgroundColor: "#A4A5AA",
                    width: 100,
                },
                container: {
                    backgroundColor: "#E6E8F0",
                    borderRadius: 24,
                },
                }}
            >
                <View style={{
                    flex: 1
                }}>
                    <View>
                        <View>
                            <Text style={styles.headingText}>Card Holder Name</Text>
                            <TextInput
                                placeholder="John Doe"
                                value={holdersName}
                                editable={false}
                                style={[styles.formCommon]}
                                placeholderTextColor="#A4A5AA"
                            />
                            <Text style={styles.headingText}>Card Number</Text>
                            <TextInput
                                placeholder="Visa / Master"
                                value={cardNumber}
                                editable={false}
                                style={[styles.formCommon, styles.btn]}
                                placeholderTextColor="#A4A5AA"
                            />
                        </View>
                        <View style={[styles.rows]}>
                            <View style={[styles.inputs]}>
                                <Text style={[styles.headingText]}>Month</Text>
                                <TextInput
                                    placeholder="MM"
                                    value={cardNumber}
                                    editable={false}
                                    style={[styles.formCommon, styles.btn]}
                                    placeholderTextColor="#A4A5AA"
                                />
                            </View>
                            <View style={[styles.inputs]}>
                                <Text style={styles.headingText}>Year</Text>
                                <TextInput
                                    placeholder="YY"
                                    value={cardNumber}
                                    editable={false}
                                    style={[styles.formCommon, styles.btn]}
                                    placeholderTextColor="#A4A5AA"
                                />
                            </View>
                            <View style={[styles.inputs]}>
                                <Text style={styles.headingText}>CVV</Text>
                                <TextInput
                                    placeholder="CVV"
                                    value={cardNumber}
                                    editable={false}
                                    style={[styles.formCommon, styles.btn]}
                                    placeholderTextColor="#A4A5AA"
                                />
                            </View>
                        </View> 
                        <View>
                            <CheckBox
                                style={[ styles.checkBox]}
                                title='Remeber For Future'
                                checked={checked}
                                onPress={() => setChecked(!checked)}
                            />
                        </View>
                    </View>
                    <TouchableOpacity>
                        <View style={[styles.sbmtBtn]}>
                            <View style={[styles.sbmtBtnView]}>
                                <Text style={[styles.bookNowSize, styles.sbmtBtnText]}>ADD CARD</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </View>
  );
};

const styles = StyleSheet.create({
    inputs: {
        flex: 1,
    },
    formCommon: {
        height: 40,
        borderColor: '#A4A5AA',
        borderWidth: 1,
        borderRadius: 10,
        color: '#000000',
        paddingLeft: 10,
        margin: 10
    },
    rows: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    overview: {
        fontWeight: 600
    },
    headingText: {
        color: "#000000",
        marginLeft: 12,
    },
    btnText: {
        color: "#666666"
    },
    btn: {
        justifyContent: "center",
        alignItems: "center",
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
        margin: 10,
    },
    sbmtBtnText: {
        color: COLORS.white
    },
    checkBox:{
        borderRadius: 10,
    }
})

export default NewCard;