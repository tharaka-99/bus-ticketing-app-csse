import { View, Platform, StatusBar } from "react-native";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";
import TicketQRCode from "./screens/ticket/TicketQRCode";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import PassengerHome from "./screens/passenger/PassengerHome";
import BuyTicket from "./screens/ticket/BuyTicket";
import TopUpPage from "./screens/passenger/TopUpPage";

const Stack = createNativeStackNavigator();
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
          <Stack.Screen name="Passanger" component={PassengerHome} />
          <Stack.Screen name="Buy Tickets" component={BuyTicket} />
          <Stack.Screen name="QR Code Ticket" component={TicketQRCode} />
          <Stack.Screen name="Top Up" component={TopUpPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
