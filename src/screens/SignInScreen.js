import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { Feather, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { getDataJSON } from "../functions/AsyncStorageFunctions";

const SignInScreen = (props) => {
  const [ID, setID] = useState("");
  const [Password, setPassword] = useState("");
  
  const image = { uri: "https://cdn.hipwallpaper.com/i/97/16/ZcjRI9.jpg" };

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <ImageBackground source={image} style={styles.image}>
            <Card>
              <Card.Title>Blog App in React-Native</Card.Title>
              <Card.Divider />
              <Input
                leftIcon={<AntDesign name="user" size={24} color="black" />}
                placeholder="Username"
                onChangeText={function (currentInput) {
                  setID(currentInput);
                }}
              />
              <Input
                placeholder="Password"
                leftIcon={<Feather name="key" size={24} color="black" />}
                secureTextEntry={true}
                onChangeText={function (currentInput) {
                  setPassword(currentInput);
                }}
              />

              <Button
                icon={<AntDesign name="login" size={24} color="white" />}
                title="  Sign In!"
                type="solid"
                onPress={async function () {
                  let UserData = await getDataJSON(ID);
                  if (UserData.password == Password) {
                    auth.setIsLoggedIn(true);
                    auth.setCurrentUser(UserData);
                  } else {
                    alert("Login Failed");
                    console.log(UserData);
                  }
                }}
              />
              <Button
                type="clear"
                icon={<AntDesign name="user" size={24} color="dodgerblue" />}
                title="  Don't have an account?"
                onPress={function () {
                  props.navigation.navigate("SignUp");
                }}
              />
            </Card>
          </ImageBackground>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#4bacb8",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
export default SignInScreen;