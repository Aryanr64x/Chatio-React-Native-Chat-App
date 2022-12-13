import { useContext, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { authContext } from '../contexts/AuthContextWrapper';
import { Snackbar, TextInput } from 'react-native-paper';


const SignUp = ({ onShowSign, navigation, setShowSnackBar, setSnackBarText, setShowDialog }) => {

    const username = useRef('')
    const password = useRef('')
    const password_confirm = useRef('')
    const auth = useContext(authContext)



    const signUp = async () => {
        if (username.current != '' && password.current != '') {
            if (password.current == password_confirm.current) {
                setShowDialog(true)
                const succerss = await auth.signUp(username.current, password.current);
                setShowDialog(false)
                if (succerss) {
                    navigation.replace("home");
                } else {
                    setShowSnackBar(true)
                    setSnackBarText("Oops ! Something went wrong . Try again later")
                }
            } else {
                
                setShowSnackBar(true)
                setSnackBarText("The 2 passwords do not match")
                
            }
        }else{
            setShowSnackBar(true)
            setSnackBarText("Please Enter all the fields!")
        }
    }



    return (
        <View className="pt-8 px-4 justify-center h-full">
            <Text className="text-2xl">
                Create a New Account
            </Text>
            <Text className="mt-2">
                Please create a new username , passowrd and Also retype your password for confirmation below
            </Text>
            <TextInput mode="outlined" label="Enter your username" activeOutlineColor="black" onChangeText={(text) => { username.current = text }} className="bg-red-100 mt-6" />
            <TextInput mode="outlined" label="Enter your password" activeOutlineColor="black" onChangeText={(text) => { password.current = text }} secureTextEntry={true} className="bg-red-100 mt-6" />
            <TextInput mode="outlined" label="Re Enter your password" activeOutlineColor="black" onChangeText={(text) => { password_confirm.current = text }} secureTextEntry={true} className="bg-red-100 mt-6" />

            <View className="flex flex-row justify-between items-center">
                <TouchableOpacity onPress={onShowSign}>
                    <Text className="text-base ">
                        Already have an account ?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="mt-4 bg-red-600  px-4 py-2 rounded-3xl " onPress={signUp}>
                    <Text className="text-white text-lg">Sign Up</Text>
                </TouchableOpacity>

            </View>

           
        </View>
    )
}

export default SignUp;