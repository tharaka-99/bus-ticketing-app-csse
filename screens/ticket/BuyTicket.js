import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Firebase/Firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default function BuyTicket() {
  const DatCollectinRef = collection(db, "Package");
  const [travelPackage, setTravelPackage] = useState("");

  useEffect(() => {
    //fetch the all data from firebase and set it to usestate, this firebase method
    const getAllData = async () => {
      const data = await getDocs(DatCollectinRef);
      setTravelPackage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAllData();
  }, []);
  // console.log(travelPackage);

  return (
    <View style={{ backgroundColor: "#FFF", marginBottom: "20%" }}>
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
              backgroundColor: "#FFFDE7",
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
                  borderTopWidth: 1,
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
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#FFB200",
                borderBottomEndRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginVertical: 5,
                }}
              >
                Get it
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
