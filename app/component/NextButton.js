


import React from "react";
import { View, StyleSheet, Text, } from "react-native";
import colors from "../config/colors";
import { moderateScale } from "react-native-size-matters";
import { TouchableOpacity } from "react-native-gesture-handler";


function NextButton(props) {

    return (
        <View style={styles.Container}>



            <Text style={styles.addOrderText}>
                {props.addOrderText}

            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.menuButton} onPress={props.backToMenuOnPress}>
                    <Text style={styles.menuText}>Yes,back to menu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onPress}
                    disabled={props.disabled}
                    style={props.style}>
                    <Text style={{ color: colors.white }}>{props.buttonName}</Text>
                </TouchableOpacity>

            </View>
        </View>


    );
}

const styles = StyleSheet.create({



    addOrderText:
    {
        textAlign: 'center',
        fontSize: 15,
        color: colors.black
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: moderateScale(15),
        justifyContent: 'space-evenly',

        alignSelf: "center",


    },

    Container:{ 
        width: "95%", 
        alignItems: "center" 
    },
    menuButton: {
        alignItems: 'center',
        width: moderateScale(110),
        justifyContent: 'center',
        marginRight: moderateScale(20),
        borderBottomWidth: 0.5,
        borderBottomColor: colors.primary,
        marginTop: moderateScale(12)


    },
    menuText:
    {
        color: colors.
            primary, fontSize: 14,
        top: 3
    },

});
export default NextButton;
