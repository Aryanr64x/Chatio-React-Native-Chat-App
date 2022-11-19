import { useState } from "react";
import { View, Text } from "react-native";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const AuthScreen = () => {
    const [showSignUp, setShowSignUp] = useState(false)
    return (
        <View>
          {
            (showSignUp) ? (<SignUp onShowSign={()=>{setShowSignUp(false)}} />) : (<SignIn onShowSignUp = { ()=>{setShowSignUp(true)} }/>)
          }
        </View>
    )
}

export default AuthScreen; 