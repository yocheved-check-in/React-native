import React from "react";
import { View, StyleSheet, Text } from "react-native";
import RadioButtonRN from "radio-buttons-react-native";
import colors from "../../config/colors";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";

function QuestionView({ item, onAnswer }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.question}</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          flexGrow: 1,
          alignContent: "center",
        }}
      >
        <RadioButtonRN
          data={item.answers}
          box={true}
          selectedBtn={(e) => onAnswer(e)}
          textStyle={styles.textStyle}
          style={{ padding: 20 }}
        />

        <Text numberOfLines={4} style={styles.messageText}>
          {item.message}
        </Text>
        {item.message && (
          <Button
            //   titleStyle={{ fontWeight: "bold" }}
            buttonStyle={styles.nextButton}
            title="Next"
            onPress={navigation.navigate("Main")}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  textStyle: {
    color: colors.primary,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  messsageText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 50,
    textAlignVertical: "center",
    marginBottom: 20,
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
    height: 50,
    textAlign: "center",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  nextButton: {
    marginLeft: 20,
    marginRight: 20,
  },
});
export default QuestionView;
