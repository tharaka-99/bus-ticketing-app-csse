import React, { useState, useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import QECode from "react-native-qrcode-svg";

export default function TicketQRCode({ route }) {
  const { item, Pid } = route.params;
  let QRref = useRef();

  // const [items, setItems] = useState(initialItemState);
  const [productQRref, setProductQRref] = useState();
  console.log(productQRref);

  const svg = useRef();

  const getDataURL = () => {
    // @ts-ignore
    svg.current?.toDataURL(callback);
  };

  const callback = (dataURL: string) => {
    console.log(dataURL);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <QECode
        value={JSON.stringify({
          passenger_Id: item.name,
          package_Id: Pid,
          package_name: item.package_name,
          package_type: item.package_type,
          price: item.price,
          valid: item.valid,
          purchased: new Date(),
        })}
        getRef={(c) => (svg.current = c)}
      />
      <TouchableOpacity activeOpacity={0.8} onPress={() => getDataURL()}>
        <Text> Press </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
