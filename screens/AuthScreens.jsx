import { useState } from "react";
import { View, Text } from "react-native";
import SignIn from "../components/SignIn";

import SignUp from "../components/SignUp";
import { Snackbar, Provider} from "react-native-paper";
import LoadingDialog from "../components/LoadingDialog";




const AuthScreen = ({ navigation }) => {
  
  const [showSignUp, setShowSignUp] = useState(false)
  const [showSnackBar, setShowSnackBar] = useState(false)
  const [snackBarText, setSnackBarText] = useState('')
  

  return (
    <Provider>
      <View>
        {
          (showSignUp) ? (<SignUp onShowSign={() => { setShowSignUp(false) }} navigation={navigation} setShowSnackBar={setShowSnackBar} setSnackBarText={setSnackBarText}  setShowDialog={setShowDialog} />) : (<SignIn onShowSignUp={() => { setShowSignUp(true) }} navigation={navigation} setSnackBarText={setSnackBarText} setShowSnackBar={setShowSnackBar}  setShowDialog={setShowDialog}/>)
        }
        <View>
          <Snackbar
            visible={showSnackBar}
            onDismiss={() => {
              setShowSnackBar(false)
            }}
          >
            {snackBarText}
          </Snackbar>
            
          <LoadingDialog showDialog={showDialog}  setShowDialog={setShowDialog} />

        </View>
      </View>
    </Provider>
  )
}

export default AuthScreen; 