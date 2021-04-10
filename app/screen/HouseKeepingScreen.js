import React, { useState } from "react";
import { StyleSheet, ImageBackground, Image, View, Text } from "react-native";
import TopHeader from "../component/TopHeader";
import { Button } from "react-native-paper";
import colors from "../config/colors";
import Accordion from "react-native-collapsible/Accordion";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import MyRequestsItem from "../component/MyRequestsItem";
import { connect } from "react-redux";

const exampledata = [
  {
    id: 1,
    title: "Towels",
    icon: require("../assets/houseKeeping/towels.png"),
    items: [
      {
        parentId: 1,
        id: 1,
        value: "Body towel",
        displayValue: "Body towel",
      },
      {
        parentId: 1,
        id: 2,
        value: "Face towel",
        displayValue: "Face towel",
      },
      {
        parentId: 1,
        id: 3,
        value: "Hand towel",
        displayValue: "Hand towel",
      },
      {
        parentId: 1,
        id: 3,
        value: "Beach towel",
        displayValue: "Beach towel",
      },
      {
        parentId: 1,
        id: 3,
        value: "Kitchen towel",
        displayValue: "Kitchen towel",
      },
    ],
  },
  {
    id: 2,
    title: "Pillows",
    icon: require("../assets/houseKeeping/pillow.png"),
    items: [
      {
        parentId: 2,
        id: 1,
        value: "Cotton pillow",
        displayValue: "Cotton pillow",
      },
      {
        parentId: 2,
        id: 2,
        value: "polyester pillow",
        displayValue: "polyester pillow",
      },
      {
        parentId: 2,
        id: 3,
        value: "Feathers pillow",
        displayValue: "Feathers pillow",
      },
      {
        parentId: 2,
        id: 4,
        value: "Latex pillow",
        displayValue: "Latex pillow",
      },
      {
        parentId: 2,
        id: 5,
        value: "Visco pillow",
        displayValue: "Visco pillow",
      },
      {
        parentId: 2,
        id: 6,
        value: "Viscogel pillow",
        displayValue: "Viscogel pillow",
      },
    ],
  },
  {
    id: 3,
    title: "Toiletries",
    icon: require("../assets/houseKeeping/toilet.png"),
    items: [
      {
        parentId: 3,
        id: 1,
        value: "Body wash",
        displayValue: "Body wash",
      },
      {
        parentId: 3,
        id: 2,
        value: "Body lotion",
        displayValue: "Body lotion",
      },
      {
        parentId: 3,
        id: 3,
        value: "Shampoo",
        displayValue: "Shampoo",
      },
      {
        parentId: 3,
        id: 4,
        value: "Conditioner",
        displayValue: "Conditioner",
      },
      {
        parentId: 3,
        id: 5,
        value: "Bath oil",
        displayValue: "Bath oil",
      },
      {
        parentId: 3,
        id: 6,
        value: "Body oil",
        displayValue: "Body oil",
      },
      {
        parentId: 3,
        id: 7,
        value: "Hand wash",
        displayValue: "Hand wash",
      },
      {
        parentId: 3,
        id: 8,
        value: "Hand lotion",
        displayValue: "Hand lotion",
      },
      {
        parentId: 3,
        id: 9,
        value: "Hand cream",
        displayValue: "Hand cream",
      },
    ],
  },
  {
    id: 4,
    title: "More",
    icon: require("../assets/houseKeeping/more.png"),
    items: [
      {
        parentId: 4,
        id: 1,
        value: "Toster",
        displayValue: "Toster",
      },
      {
        parentId: 4,
        id: 2,
        value: "Lamp",
        displayValue: "Lamp",
      },
      {
        parentId: 4,
        id: 3,
        value: "Tea",
        displayValue: "Tea",
      },
      {
        parentId: 4,
        id: 4,
        value: "Brown Sugar",
        displayValue: "Brown Sugar",
      },
      {
        parentId: 4,
        id: 5,
        value: "Coffee",
        displayValue: "Coffee",
      },
    ],
  },
  {
    id: 5,
    title: "Wake up call",
    icon: require("../assets/houseKeeping/alarm.png"),
    items: [],
  },
  {
    id: 6,
    title: "My requests",
    icon: require("../assets/houseKeeping/list.png"),
    items: [],
  },
];

function HouseKeepingScreen(props) {
  const [activeSections, setActiveSections] = useState([]);
  const [selection, setSelection] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateString, setDateString] = useState("");
  const [mode, setMode] = useState("datetime");
  const [show, setShow] = useState(true);
  const [requestOpen, setRequestOpen] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    var mydate = moment(currentDate).format("DD/MM/YYYY hh:mm");
    setDateString(mydate);
  };

  const renderSectionTitle = (item) => {
    return (
      <View>
        <Text>{item.content}</Text>
      </View>
    );
  };

  const renderHeader = (item) => {
    return (
      <View style={styles.title}>
        <Button
          icon={() => (
            <Image
              source={{ uri: item.iconUrl }}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          )}
          color={colors.opacityWhite}
          mode="contained"
          //onPress={() => console.log("Pressed")}

          labelStyle={styles.label}
        >
          {item.name}
        </Button>
      </View>
    );
  };

  const addItemToSelectedlist = (name) => {
    const tempSelection = props.houseKeepingCart;
    console.log("tempSelection " + tempSelection);
    var mySelectedDate = moment(new Date()).format("DD/MM/YYYY hh:mm");
    name
      .toString()
      .split(",")
      .forEach((element) => {
        const index = tempSelection.findIndex((x) => x.name === element);
        if (tempSelection.length === 0) {
          tempSelection.push({
            name: element,
            selectedDate: mySelectedDate,
            amount: 1,
          });
        } else if (index === -1)
          tempSelection.push({
            name: element,
            selectedDate: mySelectedDate,
            amount: 1,
          });
      });
    //setSelection(tempSelection);
    props.cartChange(tempSelection);
  };

  const itemDeleted = (item) => {
    console.log(item);
    setSelection(selection.filter((x) => x.name != item.name));
    console.log(selection);
  };

  const renderRequestRow = ({ item }) => {
    return <MyRequestsItem item={item} onDelete={() => itemDeleted(item)} />;
  };

  const renderContent = (item) => {
    //console.log(item.title);
    if (item.items.length > 0) {
      return (
        <View style={styles.content}>
          <SelectMultipleGroupButton
            containerViewStyle={{
              justifyContent: "flex-start",
            }}
            highLightStyle={{
              borderColor: colors.primary,
              backgroundColor: colors.opacity,
              textColor: colors.primary,
              borderTintColor: colors.white,
              backgroundTintColor: colors.primary,
              textTintColor: colors.white,
            }}
            onSelectedValuesChange={addItemToSelectedlist}
            group={item.items}
          />
        </View>
      );
    } else if (item.name == "Wake up call") {
      return (
        <View>
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
          <Text style={styles.wakeUpText}>
            {"Please wake me up at: \n" + dateString}{" "}
          </Text>
        </View>
      );
    } else if (item.name == "My requests") {
    }
  };

  const updateSections = (activeSections) => {
    const index = props.HouseData.findIndex((x) => x.name === "My requests");
    if (activeSections[0] == index) setRequestOpen(true);
    //console.log(activeSections);
    setActiveSections(activeSections);
  };
  const valueChanged = (item) => {
    console.log(item.name);
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/houseKeeping/houseKeepingBackground.jpg")}
      resizeMode="cover"
    >
      <TopHeader
        icon={require("../assets/main/housew.png")}
        title="House Keeping"
        isCart={false}
      />

      {!requestOpen && (
        <ScrollView>
          <Accordion
            underlayColor={colors.opacity}
            containerStyle={styles.buttonContainer}
            sections={props.HouseData}
            activeSections={activeSections}
            renderSectionTitle={renderSectionTitle}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
            onSelectedValuesChange={(item) => valueChanged(item)}
          />
        </ScrollView>
      )}

      {requestOpen && (
        <>
          <FlatList
            data={props.houseKeepingCart}
            renderItem={renderRequestRow}
            keyExtractor={(item, index) => index.toString()}
          ></FlatList>

          <Button
            color={colors.opacityWhite}
            mode="contained"
            onPress={props.cartDelete()}
            labelStyle={styles.label}
            style={styles.requestConfirm}
          >
            Apply
          </Button>
        </>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },

  buttonContainer: {
    margin: 20,
  },

  title: {
    paddingTop: 20,
  },

  content: {
    marginTop: 20,
  },

  label: {
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: colors.primary,
  },

  wakeUpText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 17,
    justifyContent: "center",
    textAlign: "center",
    lineHeight: 40,
  },
  requestConfirm: {
    width: "60%",
    marginBottom: 30,
    alignSelf: "center",
    //backgroundColor: colors.primary,
  },
});

const mapStateToProps = (state) => {
  return {
    houseKeepingCart: state.houseKeepingCart,
    HouseData: state.houseKeepingData,
  };
};

const mapDitpatchToProps = (dispatch) => {
  return {
    cartChange(cart) {
      dispatch({
        type: "ADD_TO_HOUSE_CART",
        payload: cart,
      });
    },
    cartDelete() {
      dispatch({
        type: "DELETE_HOUSE_CART",
      });
    },
  };
};

export default connect(mapStateToProps, mapDitpatchToProps)(HouseKeepingScreen);
