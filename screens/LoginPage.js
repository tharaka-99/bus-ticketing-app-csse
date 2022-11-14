import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import PhoneInput from "react-native-phone-number-input";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "../Firebase/Firebase-config";
import { getApp } from "firebase/app";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import Input from "./CustomComponent/Input";

export default function LoginPage() {
  const [user, setUser] = useState({
    name: "",
  });
  const [errors, setErrors] = React.useState({});
  const navigation = useNavigation();
  const phoneInput = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [value, setValue] = useState("");
  const recaptchaVerifier = useRef("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = React.useState();
  const attemptInvisibleVerification = false;
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const subscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Document data id:", user.uid);
        const getDate = async (id) => {
          const docRef = await getDoc(doc(db, "RegisteredUser", id));
          const myData = docRef.data();
          navigation.navigate("Passanger", { myData });
          setFlag(false);
        };
        getDate(user.uid);
      }
    });
    return subscribe;
  });

  const sendVerification = async () => {
    const auth = getAuth();
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      ToastAndroid.show(
        "Verification code has been sent to your phone.",
        ToastAndroid.SHORT
      );
      setFlag(true);
    } catch (err) {
      ToastAndroid.show(`Error: ${err.message}`, ToastAndroid.SHORT);
    }
  };

  const confirmCode = async () => {
    const auth = getAuth();
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential).then(() => {
        setDoc(doc(db, "RegisteredUser", auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          phone_number: auth.currentUser.phoneNumber,
          name: user.name,
          wallet: "",
        });
      });
      ToastAndroid.show(
        "Phone authentication successful 👍",
        ToastAndroid.SHORT
      );
    } catch (err) {
      ToastAndroid.show(`Error: ${err.message}`, ToastAndroid.SHORT);
    }
  };

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!user.name) {
      handleError("Please input Name", "name");
      isValid = false;
    }
    if (isValid) {
      sendVerification();
    }
  };

  const handleChangeText = (user, value) => {
    setUser((prevState) => ({ ...prevState, [user]: value }));
  };

  const handleError = (error, user) => {
    setErrors((prevState) => ({ ...prevState, [user]: error }));
  };

  return (
    <ScrollView style={{}}>
      <View style={styles.main_container}>
        <View style={{ marginBottom: 30, alignItems: "center" }}>
          <Image
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 150,
              height: 150,
            }}
            source={require("../assets/Bus_app_Logo.png")}
          />
          <Text style={styles.header_text}>Welcome to BusApp</Text>
        </View>
        <View>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={getApp().options}
          />
          <Text
            style={{
              display: !flag ? "flex" : "none",
              color: "#0D0140",
              marginVertical: 5,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Phone number
          </Text>
          <View
            style={{
              display: !flag ? "flex" : "none",
              borderColor: "#67afff",
              borderWidth: 1.5,
              borderRadius: 10,
              paddingLeft: 10,
            }}
          >
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="LK"
              layout="first"
              onChangeFormattedText={(text) => {
                setPhoneNumber(text);
              }}
              autoFocus
            />
          </View>
          <View
            style={{
              display: !flag ? "flex" : "none",
            }}
          >
            <Text style={styles.input_lable}>Passanger name</Text>
            <Input
              // style={styles.input_text}
              placeholder="Enter passanger name"
              onChangeText={(text) => handleChangeText("name", text)}
              onFocus={() => handleError(null, "name")}
              error={errors.name}
            ></Input>
          </View>
          <View style={{ display: !flag ? "flex" : "none" }}>
            <TouchableOpacity style={styles.button} onPress={validate}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Send verification
              </Text>
            </TouchableOpacity>
          </View>

          {/* Verification Code Input */}

          <View style={{ display: flag ? "flex" : "none" }}>
            <TextInput
              style={styles.input_text}
              placeholder="Confirmation Code"
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
            />
            <TouchableOpacity style={styles.button} onPress={confirmCode}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Code verified
              </Text>
            </TouchableOpacity>
          </View>

          {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main_container: { padding: 20 },
  header_text: {
    fontSize: 25,
    fontWeight: "700",
    color: "#130160",
    textAlign: "center",
  },
  input_text: {
    fontSize: 15,
    borderColor: "#67afff",
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 10,
    marginVertical: 5,
  },
  input_lable: {
    color: "#0D0140",
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    alignContent: "center",
    borderWidth: 2,
    borderColor: "#000000",
    marginTop: 20,
    backgroundColor: "#FFB200",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
});
