import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import QECode from "react-native-qrcode-svg";
import { db } from "../../Firebase/Firebase-config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function PassengerQRCode({ route }) {
  const { item } = route.params;

  const navigation = useNavigation();

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
        <QECode
          value={JSON.stringify({
            passenger_Id: item.passenger_Id,
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
        />
        <Text
          style={{
            fontSize: 23,
            fontWeight: "bold",
            textDecorationLine: "underline",
            marginTop: 30,
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
    </View>
  );
}

const styles = StyleSheet.create({});
