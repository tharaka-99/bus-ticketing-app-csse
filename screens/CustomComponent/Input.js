import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error ? "#F44336" : isFocused ? "#1565C0" : "#90CAF9",
            alignItems: "center",
          },
        ]}
      >
        {/* <Icon
            name={iconName}
            style={{ color: COLORS.darkBlue, fontSize: 22, marginRight: 10 }}
          /> */}
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ flex: 1 }}
          {...props}
        />
        {/* {password && (
            <Icon
              onPress={() => setHidePassword(!hidePassword)}
              name={hidePassword ? "eye-outline" : "eye-off-outline"}
              style={{ color: COLORS.darkBlue, fontSize: 22 }}
            />
          )} */}
      </View>
      {error && <Text style={{ color: "#F44336", fontSize: 12 }}>{error}</Text>}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    fontSize: 14,
    opacity: 0.6,
  },
  inputContainer: {
    borderColor: "#67afff",
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});

export default Input;
