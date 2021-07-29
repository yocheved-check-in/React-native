
import React from "react";
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
} from "react-native";
import { Card } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";
import colors from "../../config/colors";


function SpaFooter(props) {
    return (
        <View>
            {!isDateSelected ? (
                <View>
                    <TouchableOpacity
                        onPress={showDatePicker}
                        style={styles.currentDateContainer}
                    >
                        <Text style={styles.currentDateText}>{"Today"}</Text>
                        <Text style={styles.currentDateText}>{showSpaDate}</Text>
                    </TouchableOpacity>
                    <DatePicker
                        mode={"time"}
                        date={date}
                        isDatePickerVisible={isDatePickerVisible}
                        setDate={(date) => handleConfirmDate(date)}
                        hideDatePicker={hideDatePicker}
                        showDatePicker={showDatePicker}
                    />
                </View>
            ) : (
                <View>
                    <TouchableOpacity
                        onPress={showDatePicker}
                        style={styles.currentDateContainer}
                    >
                        <Text style={styles.currentDateText}>{"Today"}</Text>
                        <Text style={styles.currentDateText}>{showSpaDate}</Text>
                    </TouchableOpacity>
                    <DatePicker
                        mode={"time"}
                        date={date}
                        isDatePickerVisible={isDatePickerVisible}
                        setDate={(date) => handleConfirmDate(date)}
                        hideDatePicker={hideDatePicker}
                        showDatePicker={showDatePicker}
                    /></View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.Gray,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    textInputContainer: {
        elevation: 6,

        width: moderateScale(335), marginBottom: "5%", alignSelf: "center"
    },
    selectView: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "92%",
        alignSelf: "center",
        marginTop: "5%",
        marginBottom: "4%"
    },
    fabIconContainer: {
        justifyContent: "flex-start",
        marginTop: moderateScale(15),
        top: 40
    },
    preferredContainer: {
        flexDirection: "row", justifyContent: "space-evenly",
        marginVertical: moderateScale(15)
    },
    addTreatmentTouchable: {
        alignSelf: "center", justifyContent: "center"
    },
    addTreatmentText: {
        alignSelf: "center", color: colors.primary, textDecorationLine: "underline", fontWeight: "400", fontSize: 16, justifyContent: "center"
    },
    nextButtonContainer: {
        flexDirection: "row", justifyContent: "space-evenly", paddingTop: moderateScale(10), backgroundColor: "red"
    },
    selectedItem:
        { borderWidth: 1, marginTop: "5%", paddingVertical: moderateScale(8), width: "33%", alignItems: "center", borderColor: colors.primary, borderRadius: moderateScale(5) },
    unselectedItem:
        { alignItems: "center", marginTop: "5%", paddingVertical: moderateScale(8), alignSelf: "center", width: "33%" },

    textInput: {
        marginTop: moderateScale(8),
        width: moderateScale(300),
        paddingTop: "-10%",
        height: moderateScale(120),
        alignSelf: "center",
        textAlignVertical: "top"
    },
    allPackage: {
        color: colors.spaTextColor,
        fontSize: moderateScale(14),
        left: moderateScale(14),
    },
    pencilImage: {
        width: moderateScale(25),
        height: moderateScale(25),
        left: moderateScale(15),
    },
    patientText: {
        padding: moderateScale(5),
        textDecorationLine: "underline",
        left: moderateScale(18),
    },
    buttonStyle: {
        width: moderateScale(105),
        alignItems: "center",
        padding: 8,
    },
    selectedButtonStyle: {
        borderRadius: 6,
        width: moderateScale(105),
        borderWidth: 2,
        borderColor: colors.primary,
        alignItems: "center",
        padding: 8,
    },
    textThick: {
        color: colors.spaTextColor,
        fontSize: moderateScale(11),
    },
    textThin: {
        color: colors.primary,
        fontSize: moderateScale(11),
    },
    QuestionCard: {
        elevation: 6,
        padding: moderateScale(18),
        width: moderateScale(335),
        alignSelf: "center",

    },
    patientView: {
        flexDirection: "row",
        backgroundColor: colors.whiteShade,
        padding: moderateScale(10),
    },
    questionText: {
        color: colors.darkGray,
        fontSize: moderateScale(15)
    },
    optionView: {
        flexDirection: "row",
        marginTop: 20,
        alignSelf: "center",
        paddingBottom: moderateScale(10),
    },
    nextButton: {
        alignItems: "center",
        width: moderateScale(150),
        marginLeft: moderateScale(20),
        padding: moderateScale(14),
        backgroundColor: colors.primary,
        borderRadius: 7,
    },
    nextButtonContainer: {
        alignItems: "center",
        marginTop: moderateScale(16),
        backgroundColor: colors.lightWhite,
    },
    disableNextButton: {
        alignItems: "center",
        width: moderateScale(150),
        marginLeft: moderateScale(20),
        padding: moderateScale(14),
        backgroundColor: colors.lightBlue,
        borderRadius: 7,
    },

});
export default SpaFooter;
