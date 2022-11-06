import {
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";
import TicketQRCode from "./screens/ticket/TicketQRCode";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import PassengerHome from "./screens/passenger/PassengerHome";
import BuyTicket from "./screens/ticket/BuyTicket";
import TopUpPage from "./screens/passenger/TopUpPage";
import PassengerQRCode from "./screens/ticket/PassengerQRCode";
import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

const Stack = createNativeStackNavigator();

function LogoTitle() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  return (
    <View>
      <Menu
        style={{ width: 200 }}
        visible={visible}
        anchor={
          <TouchableOpacity onPress={showMenu}>
            <Image
              style={{ width: 20, height: 22 }}
              source={require("./assets/menu.png")}
            />
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}
      >
        <MenuItem
          onPress={() => {
            const auth = getAuth();
            auth.signOut().then(() => navigation.navigate("Login"));
          }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </View>
  );
}
export default function App() {
  return (
    <View
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Sign Up" component={SignUpPage} />
          <Stack.Screen
            name="Passanger"
            component={PassengerHome}
            options={{
              headerBackVisible: false,
              headerRight: () => <LogoTitle />,
            }}
          />
          <Stack.Screen name="Buy Tickets" component={BuyTicket} />
          <Stack.Screen
            name="QR Code Ticket"
            component={TicketQRCode}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Top Up" component={TopUpPage} />
          <Stack.Screen
            name="Bus QR Pass"
            component={PassengerQRCode}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
