import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Firebase/Firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function BuyTicket({ route }) {
  const { myData } = route.params;
  const DatCollectinRef = collection(db, "Package");
  const [travelPackage, setTravelPackage] = useState("");
  const [wallet, setWallet] = useState("");
  const navigation = useNavigation();
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  useEffect(() => {
    const getAllData = async () => {
      const data = await getDocs(DatCollectinRef);
      setTravelPackage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const docRef = await getDoc(doc(db, "RegisteredUser", myData.uid));
      setWallet({ ...docRef.data(), id: docRef.id });
      forceUpdate();
    };
    getAllData();
  }, [ignored]);
  // console.log(travelPackage);

  const GetConfirmation = (item) => {
    let w = wallet.wallet;
    let p = item.price;
    if (w < p) {
      Alert.alert(
        "insufficient balance",
        "You cannot afford to purchase this package hence you must top up your account",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Top Up",
            onPress: () => navigation.navigate("Top Up"),
          },
        ]
      );
    } else
      Alert.alert(
        item.package_name,
        "Package Price is " +
          item.price +
          " and it's Valid for " +
          item.valid +
          " Days, You want to buy this package please click 'Buy' button",
        [
          {
            text: "Cancel",
            // onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Buy",
            onPress: () =>
              navigation.navigate("QR Code Ticket", { item, myData }),
          },
        ]
      );
    forceUpdate();
  };

  return (
    <View style={{ backgroundColor: "#E0E0E0", marginBottom: "20%" }}>
      <Text
        style={{
          textAlign: "center",
          margin: 13,
          fontSize: 23,
          fontWeight: "900",
        }}
      >
        Travel Packages
      </Text>
      <FlatList
        data={travelPackage}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#FFF",
              elevation: 10,
              borderRadius: 10,
              marginVertical: 10,
              marginHorizontal: 15,
            }}
          >
            <View
              style={{
                padding: 10,
              }}
            >
              <Text
                style={{
                  marginLeft: "10%",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {item.package_name}
              </Text>

              <View
                style={{
                  borderTopWidth: 1.5,
                  borderColor: "#B0BEC5",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                  paddingTop: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 17, opacity: 0.5 }}>Valid for</Text>
                  <View
                    style={{
                      backgroundColor: "#FFD54F",
                      marginLeft: 10,
                      padding: 4,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{item.valid} Days</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "bold",
                    }}
                  >
                    Rs {item.price}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginHorizontal: 5,
                  marginVertical: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  Details
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    opacity: 0.6,
                  }}
                >
                  {item.details}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#FFB200",
                borderBottomEndRadius: 10,
                borderBottomLeftRadius: 10,
              }}
              // onPress={() => navigation.navigate("QR Code Ticket", { item })}
              onPress={() => GetConfirmation(item)}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginVertical: 5,
                }}
              >
                Buy it
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
