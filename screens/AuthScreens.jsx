import { useState } from "react";
import { View, Text } from "react-native";
import SignIn from "../components/SignIn";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import SignUp from "../components/SignUp";
import { Snackbar, Dialog, Provider, Portal, Paragraph } from "react-native-paper";
const AuthScreen = ({ navigation }) => {
  const [showSignUp, setShowSignUp] = useState(false)
  const [showSnackBar, setShowSnackBar] = useState(false)
  const [snackBarText, setSnackBarText] = useState('')
  const [showDialog, setShowDialog] = useState(false)


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
            
          <Portal>
            <Dialog visible={showDialog} onDismiss={()=>{setShowDialog(false)}}>
            
            <Dialog.Content>
              <Paragraph>  Please wait for some time.. <ActivityIndicator animating={true} color={MD2Colors.red800} className="ml-8" /> </Paragraph>
            </Dialog.Content>
            </Dialog>
          </Portal>

        </View>
      </View>
    </Provider>
  )
}

export default AuthScreen; 