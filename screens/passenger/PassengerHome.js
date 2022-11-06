import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import TicketPage from "../ticket/TicketPage";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Firebase/Firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function PassengerHome({ route }) {
  const { myData } = route.params;
  const Pid = myData.uid;
  // console.log(user);
  const navigation = useNavigation();
  const [user, setUser] = useState(myData);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  useEffect(() => {
    const getUser = async () => {
      const docRef = await getDoc(doc(db, "RegisteredUser", Pid));
      setUser({ ...docRef.data(), id: docRef.id });
      forceUpdate();
    };
    getUser();
  }, [ignored]);

  return (
    <View>
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", margin: 15 }}>
          Hi Tharaka Dilshan
        </Text>
        <View
          style={{
            backgroundColor: "#FFB200",
            padding: 15,
            borderRadius: 10,
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 20 }}>Cradit Balence:</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: "#000000",
              borderWidth: 1.5,
            }}
          >
            <Text
              style={{
                marginTop: 5,
                marginLeft: 10,
                marginRight: 10,
                fontSize: 25,
              }}
            >
              Rs.
            </Text>
            <Text
              style={{
                fontWeight: "900",
                fontSize: 30,
              }}
            >
              {user.wallet}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: "#fff",
                borderRadius: 5,
                width: 100,
                justifyContent: "center",
              }}
              activeOpacity={2}
              onPress={() => navigation.navigate("Top Up", { myData })}
              underlayColor="#0084fffa"
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#ef6325",
                  margin: 5,
                  fontWeight: "600",
                }}
              >
                Top Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            fontWeight: "900",
            opacity: 0.6,
          }}
        >
          Your Tickets
        </Text>
        <View style={{ height: "53%" }}>
          <TicketPage myData={myData} />
        </View>
        <TouchableOpacity
          style={{
            marginTop: 10,
            flexDirection: "row",
            backgroundColor: "#FFB200",
            borderRadius: 5,
            justifyContent: "center",
            borderWidth: 1.5,
            borderColor: "black",
          }}
          activeOpacity={2}
          onPress={() => navigation.navigate("Buy Tickets", { myData })}
          underlayColor="#0084fffa"
        >
          <Text
            style={{
              fontSize: 20,
              margin: 5,
              fontWeight: "800",
            }}
          >
            Buy ticket
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
