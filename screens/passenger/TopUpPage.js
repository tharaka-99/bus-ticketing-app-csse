import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function TopUpPage() {
  return (
    <View
      style={{
        margin: 20,
        justifyContent: "center",
      }}
    >
      <View>
        <Text>TopUpPage:</Text>
        <TextInput
          style={styles.input_text}
          keyboardType="email-address"
          placeholder="Enter email"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input_text: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    paddingLeft: 10,
    marginVertical: 5,
  },
});
