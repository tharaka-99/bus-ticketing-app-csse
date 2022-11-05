import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import TicketPage from "../ticket/TicketPage";
import { useNavigation } from "@react-navigation/native";

export default function PassengerHome({ route }) {
  const { myData } = route.params;
  const Pid = myData.uid;
  const navigation = useNavigation();

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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              1000
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
              onPress={() => navigation.navigate("Top Up")}
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
        <ScrollView style={{ marginVertical: 15, height: "50%" }}>
          <TicketPage />
        </ScrollView>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: "#FFB200",
            borderRadius: 5,
            justifyContent: "center",
            borderWidth: 1.5,
            borderColor: "black",
          }}
          activeOpacity={2}
          onPress={() => navigation.navigate("Buy Tickets", { Pid })}
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
