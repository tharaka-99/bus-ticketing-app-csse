import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/Firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function TicketPage({ myData }) {
  const [data, setData] = useState(false);
  const navigation = useNavigation();
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const id = myData.uid;

  useEffect(() => {
    const getTasks = async () => {
      const q = query(
        collection(db, "purchased_packages"),
        where("passenger_Id", "==", myData.uid)
      );
      const data = await getDocs(q);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      forceUpdate();
    };
    getTasks();
  }, [ignored]);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#FFF",
              elevation: 10,
              borderRadius: 10,
              marginVertical: 10,
              marginHorizontal: 10,
            }}
          >
            <View
              style={{
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "bold",
                }}
              >
                {item.package_name}
              </Text>
              <Text style={{ fontSize: 17, marginVertical: 5 }}>
                {item.valid} Days package
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 17, opacity: 0.5 }}>Valid till</Text>
                  <View
                    style={{
                      backgroundColor: "#FFD54F",
                      marginLeft: 10,
                      padding: 4,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ fontSize: 15 }}>{item.expired}</Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        padding: 5,
                        backgroundColor: "#FFB200",
                        borderRadius: 20,
                      }}
                      onPress={() =>
                        navigation.navigate("Bus QR Pass", { item })
                      }
                    >
                      Get QR
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
