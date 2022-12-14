import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import QECode from "react-native-qrcode-svg";
import { db } from "../../Firebase/Firebase-config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function TicketQRCode({ route }) {
  const { item, myData } = route.params;
  const Pid = myData.uid;
  const [user, setUser] = useState("");
  const navigation = useNavigation();
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  useEffect(() => {
    const getAllData = async () => {
      const docRef = await getDoc(doc(db, "RegisteredUser", myData.uid));
      setUser({ ...docRef.data(), id: docRef.id });
      forceUpdate();
    };
    getAllData();
  }, [ignored]);

  const [productQRref, setProductQRref] = useState();
  const days = item.valid;

  const expiredDate = () => {
    var result = new Date();
    result.setDate(result.getDate() + days);
    var date = result.getDate();
    var month = result.getMonth() + 1;
    var year = result.getFullYear();

    return date + "/" + month + "/" + year; //format: d-m-y;
  };

  const getCurrentDate = () => {
    var result = new Date();
    var date = result.getDate();
    var month = result.getMonth() + 1;
    var year = result.getFullYear();
    return date + "/" + month + "/" + year; //format: d-m-y;
  };

  const savePayment = async (item) => {
    try {
      await addDoc(collection(db, "purchased_packages"), {
        passenger_Id: Pid,
        package_Id: item.id,
        package_name: item.package_name,
        package_type: item.package_type,
        price: item.price,
        valid: item.valid,
        purchased: getCurrentDate(),
        expired: expiredDate(),
      });
      if (addDoc) {
        await updateDoc(doc(db, "RegisteredUser", Pid), {
          wallet: user.wallet - item.price,
        });
        ToastAndroid.show(
          "Your " + item.package_name + " has been activated",
          ToastAndroid.SHORT
        );
        navigation.navigate("Passanger", { myData });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
          borderRadius: 10,
          elevation: 10,
        }}
      >
        {/* <QECode
          value={JSON.stringify({
            passenger_Id: Pid,
            package_Id: item.uid,
            package_name: item.package_name,
            package_type: item.package_type,
            price: item.price,
            valid: item.valid,
            purchased: getCurrentDate(),
            expired: expiredDate(),
          })}
          getRef={(c) => setProductQRref(c)}
          size={200}
        /> */}
        <Text
          style={{
            fontSize: 23,
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
        >
          Package Details
        </Text>
        <Text style={{ fontSize: 18, marginTop: 15 }}>
          Package name: {item.package_name}
          {"\n"}
          Package type: {item.package_type}
          {"\n"}
          Package price: {item.price}
          {"\n"}
          Purchased date: {getCurrentDate()}
          {"\n"}
          Expired date: {expiredDate()}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#FFB200",
          borderRadius: 5,
          borderWidth: 1.5,
          padding: 10,
          borderColor: "black",
          marginTop: 30,
        }}
        onPress={() => savePayment(item)}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Package perchced
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
