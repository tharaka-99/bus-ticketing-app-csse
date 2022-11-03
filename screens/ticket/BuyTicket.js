import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Firebase/Firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default function BuyTicket() {
  const DatCollectinRef = collection(db, "Package");
  const [getData, setGetData] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    //fetch the all data from firebase and set it to usestate, this firebase method
    const getAllData = async () => {
      const data = await getDocs(DatCollectinRef);
      setGetData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAllData();
  }, []);
  // console.log(getData);

  const getCurrentDate = () => {
    var result = new Date();
    result.setDate(30);
    result.setHours(result.getHours() + 12);
    var date = result.getDate();
    var month = result.getMonth() + 1;
    var year = result.getFullYear();
    var hour = result.getHours();
    var minites = result.getMinutes();
    var seconds = result.getSeconds();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return (
      date +
      "-" +
      month +
      "-" +
      year +
      "/---" +
      hour +
      ":" +
      minites +
      ":" +
      seconds
    ); //format: d-m-y;
  };

  return (
    <View style={{ margin: 10 }}>
      <View
        style={{
          backgroundColor: "#fff",
          elevation: 10,
          height: 50,
          borderRadius: 10,
          padding: 5,
        }}
      >
        <Text>{getCurrentDate()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
