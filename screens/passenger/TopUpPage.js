import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { db } from "../../Firebase/Firebase-config";
import {
  collection,
  updateDoc,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function TopUpPage({ route }) {
  const { myData } = route.params;
  const navigation = useNavigation();
  const [payment, setPayment] = useState();
  const pay = async () => {
    try {
      await addDoc(collection(db, "payment"), {
        card_number: payment.card_number,
        cardholder_name: payment.cardholder_name,
        expiry_month: payment.expiry_month,
        expiry_year: payment.expiry_year,
        amount: payment.amount,
      });
      if (addDoc) {
        await updateDoc(doc(db, "RegisteredUser", myData.uid), {
          wallet_uid: myData.uid,
          wallet: parseInt(myData.wallet) + parseInt(payment.amount),
        });
        ToastAndroid.show("successfully top up", ToastAndroid.SHORT);
        navigation.navigate("Passanger", { myData });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleChangeText = (name, value) => {
    setPayment({ ...payment, [name]: value });
  };

  return (
    <View
      style={{
        margin: 20,
        justifyContent: "center",
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 25, marginVertical: 30 }}>
          Payment gateway
        </Text>
      </View>
      <View>
        <Text>Card number:</Text>
        <TextInput
          style={styles.input_text}
          keyboardType="number-pad"
          placeholder="Enter card number"
          onChangeText={(val) => handleChangeText("card_number", val)}
        ></TextInput>
        <Text>Cardholder name:</Text>
        <TextInput
          style={styles.input_text}
          placeholder="Enter cardholder name"
          onChangeText={(val) => handleChangeText("cardholder_name", val)}
        ></TextInput>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text>Expiry month:</Text>
          <TextInput
            style={styles.input_text}
            placeholder="MM"
            keyboardType="number-pad"
            onChangeText={(val) => handleChangeText("expiry_month", val)}
          ></TextInput>
        </View>
        <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
          <Text>Expiry year:</Text>
          <TextInput
            style={styles.input_text}
            placeholder="YY"
            keyboardType="number-pad"
            onChangeText={(val) => handleChangeText("expiry_year", val)}
          ></TextInput>
        </View>
      </View>
      <Text>Amount:</Text>
      <TextInput
        style={styles.input_text}
        placeholder="Enter amount"
        keyboardType="number-pad"
        onChangeText={(val) => handleChangeText("amount", val)}
      ></TextInput>
      <TouchableOpacity
        style={{
          alignContent: "center",
          marginTop: 20,
          backgroundColor: "#0D47A1",
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 7,
        }}
        onPress={() => pay()}
        underlayColor="#0084fffa"
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Pay
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input_text: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 5,
  },
});
