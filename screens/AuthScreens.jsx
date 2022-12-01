import { useState } from "react";
import { View, Text } from "react-native";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const AuthScreen = ({ navigation }) => {
    const [showSignUp, setShowSignUp] = useState(false)
    return (
        <View>
          {
            (showSignUp) ? (<SignUp onShowSign={()=>{setShowSignUp(false)}} navigation={navigation} />) : (<SignIn onShowSignUp = { ()=>{setShowSignUp(true)} }  navigation={navigation} />)
          }
        </View>
    )
}

export default AuthScreen; 