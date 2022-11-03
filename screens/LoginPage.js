import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import PhoneInput from "react-native-phone-number-input";
import {
  getAuth,
  signInWithEmailAndPassword,
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

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const navigation = useNavigation();
  const phoneInput = useRef();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [value, setValue] = useState("");
  const recaptchaVerifier = useRef("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = React.useState();
  const attemptInvisibleVerification = false;
  const [message, showMessage] = React.useState();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const subscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Document data id:", user.uid);
        const getDate = async (id) => {
          await setDoc(doc(db, "RegisteredUser", auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            phone_number: auth.currentUser.phoneNumber,
          });
          const docRef = await getDoc(doc(db, "RegisteredUser", id));
          const myData = docRef.data();
          navigation.navigate("Passanger", { myData });

          // if (docRef.exists()) {
          //   const myData = docRef.data();

          //   console.log("Document data:", docRef.data().worker_name);
          //   const worker_data = docRef.data();
          //   // console.log("Document data:", myData.role); navigation.navigate("Peon Home", { worker_data });
          //   if (myData.role === "admin") {
          //     console.log("ok");
          //     navigation.navigate("Admin Home");
          //   }

          // } else {
          //   // doc.data() will be undefined in this case
          //   console.log("No such document!");
          // }
        };
        getDate(user.uid);
      }
    });
    return subscribe;
  });

  const signin = async () => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, Password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // return { user };
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

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
      // showMessage({
      //   text: "Verification code has been sent to your phone.",
      // });
      setFlag(true);
    } catch (err) {
      // showMessage({ text: `Error: ${err.message}`, color: "red" });
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
      await signInWithCredential(auth, credential);
      // showMessage({ text: "Phone authentication successful 👍" });
      ToastAndroid.show(
        "Phone authentication successful 👍",
        ToastAndroid.SHORT
      );
    } catch (err) {
      // showMessage({ text: `Error: ${err.message}`, color: "red" });
      ToastAndroid.show(`Error: ${err.message}`, ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.main_container}>
      <View style={{ marginBottom: 50 }}>
        <Text style={styles.header_text}>Welcome to JobSpot</Text>
        <Text style={{ color: "#130160", textAlign: "center" }}>
          Login to Continoue
        </Text>
      </View>
      <View>
        <Text style={styles.input_lable}>Email</Text>
        <TextInput
          style={styles.input_text}
          keyboardType="email-address"
          placeholder="Enter email"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <Text style={styles.input_lable}>Password</Text>
        <TextInput
          style={styles.input_text}
          secureTextEntry={true}
          placeholder="Enter password"
          onChangeText={(text) => setPassword(text)}
        ></TextInput>

        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={getApp().options}
          // attemptInvisibleVerification="true"
        />

        <View style={{ display: !flag ? "flex" : "none" }}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="LK"
            layout="first"
            // onChangeText={(text) => {
            //   setValue(text);
            // }}
            // onChangeFormattedText={(text) => {
            //   setFormattedValue(text);
            // }}
            // withDarkTheme
            // withShadow
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
            autoFocus
          />
          <TouchableOpacity onPress={sendVerification}>
            <Text>Send Verification</Text>
          </TouchableOpacity>
        </View>

        {/* Verification Code Input */}

        <View style={{ display: flag ? "flex" : "none" }}>
          <TextInput
            placeholder="Confirmation Code"
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
          />
          <TouchableOpacity onPress={confirmCode}>
            <Text>Send Verification</Text>
          </TouchableOpacity>
        </View>

        {/* {message ? (
          <TouchableOpacity
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 0xffffffee, justifyContent: "center" },
            ]}
            onPress={() => showMessage(undefined)}
          >
            <Text
              style={{
                color: message.color || "blue",
                fontSize: 17,
                textAlign: "center",
                margin: 20,
              }}
            >
              {message.text}
            </Text>
          </TouchableOpacity>
        ) : undefined} */}
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}

        <TouchableOpacity
          style={{
            alignContent: "center",
            marginTop: 35,
            backgroundColor: "#0D47A1",
            height: 45,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 7,
          }}
          onPress={() => signin()}
          underlayColor="#0084fffa"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: "#130160",
              fontSize: 15,
              textAlign: "center",
              marginRight: 7,
            }}
          >
            You don't have an account yet?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
            <Text
              style={{
                fontWeight: "bold",
                opacity: 0.6,
                fontSize: 15,
                color: "#1565C0",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    top: 50,
    margin: 15,
  },
  header_text: {
    fontSize: 25,
    fontWeight: "700",
    color: "#130160",
    textAlign: "center",
  },
  input_text: {
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
});
