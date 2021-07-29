


import React from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,

} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-elements";
import colors from "../../config/colors"

function SpaPackageDetailComponent(props, item, index) {
    return (
        <TouchableOpacity activeOpacity={1}
            onPress={props.onCardPress}>
            <Card
                containerStyle={styles.container}
            >
                <Image

                    source={props.image}
                    style={styles.packageImages} />
                {/* {props.imageCheck.includes('https') ?
                    <Image

                        source={props.image}
                        style={styles.packageImages} />
                    : <View><Text numberOfLines={1} style={{ paddingHorizontal: moderateScale(10), color: colors.darkGray }}>{props.text}</Text>
                        <Text numberOfLines={7} style={{ paddingHorizontal: moderateScale(10) }}>{props.desc}</Text></View>} */}

                <View style={styles.nameContainer}>

                    <TouchableOpacity style={styles.radioButtonContainer}
                        onPress={props.onRadioButtonPress}>
                        {props.selectedIndex == props.index ?
                            <Image
                                style={styles.radioButtonImage}
                                source={require("../../assets/spa/fill.png")}
                            /> :
                            <Image
                                style={styles.radioButtonImage}
                                source={require("../../assets/spa/circle.png")}
                            />
                        }
                    </TouchableOpacity>
                    <View style={styles.ratingContainer}>
                        <Text numberOfLines={1}
                            style={styles.spaName}>{props.name}</Text>
                        <View style={{ flexDirection: "row", }}>
                            <Text style={styles.spaInfoText}>${props.price} | </Text>
                            <Text style={styles.spaInfoText}>{props.rating}{' '}</Text>
                            <Image
                                style={styles.ratingImage}
                                source={require("../../assets/Rating-icon.png")}
                            />
                        </View>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        margin: 6,
        alignItems: 'center',
        alignSelf: "center",
        borderTopLeftRadius: moderateScale(5),
        borderTopRightRadius: moderateScale(5),
        borderBottomLeftRadius: moderateScale(5),
        borderBottomRightRadius: moderateScale(5),
        width: moderateScale(163),
        marginBottom: "4%"
    },
    spaName: {
        marginRight: "8%", textDecorationStyle: "solid", textDecorationLine: "underline", paddingRight: moderateScale(5), fontSize: moderateScale(12), color: colors.spaTextColor
    },
    packageImages: {
        height: moderateScale(140), borderTopLeftRadius: moderateScale(5),
        borderTopRightRadius: moderateScale(5), width: moderateScale(163),
        marginTop: "-12%",
        marginLeft: "2%"
    },
    spaInfoText: {
        fontSize: 11, color: colors.spaTextColor,
    },
    nameContainer: {
        flexDirection: "row",
        alignSelf: "flex-start",
        marginTop: moderateScale(5),
        // width: moderateScale(165),
        // backgroundColor: "red"
    },
    radioButtonImage: {
        height: moderateScale(20),
        width: moderateScale(20), marginTop: moderateScale(5),
    },
    ratingImage: {
        height: moderateScale(10),
        width: moderateScale(10),
        justifyContent: "center",
        alignSelf: "center",
    },
    radioButtonContainer: {
        paddingLeft: moderateScale(14), paddingRight: moderateScale(5),
    },
    ratingContainer: {
        flexDirection: "column", alignSelf: "center"
    },

});

export default SpaPackageDetailComponent;
