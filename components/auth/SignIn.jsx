import { useContext, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { authContext } from '../../contexts/AuthContextWrapper';
import { TextInput, Snackbar } from 'react-native-paper';


const SignIn = ({ onShowSignUp, navigation, setShowSnackBar, setSnackBarText, setShowDialog }) => {
    const username = useRef('')
    const password = useRef('')

    const auth = useContext(authContext)
    const signIn = async () => {
        if (username.current != '' && password.current != '') {
            setShowDialog(true)
            const isSuccess = await auth.signIn(username.current, password.current)
            setShowDialog(false)
            if (isSuccess) {
                navigation.replace("home")
            } else {
                setShowSnackBar(true)
                setSnackBarText("Oops! Something Went wrong . Try again later ")
            }
        }else{
            setShowSnackBar(true)
            setSnackBarText("Please enter all the fields")
        }
    }


    return (
        <View className="pt-8 px-4 justify-center h-full">
            <Text className="text-2xl">
                Sign In To Your Account
            </Text>
            <Text className="mt-2">
                Enter your login credentials below to get inside our virtual world of madness !
            </Text>
            <TextInput mode="outlined" label="Enter your username" activeOutlineColor="black" onChangeText={(text) => { username.current = text }} className="bg-red-100 mt-6" />
            <TextInput mode="outlined" label="Enter your password" activeOutlineColor="black" onChangeText={(text) => { password.current = text }} secureTextEntry={true} className="bg-red-100 mt-6" />

            <View className="flex flex-row justify-between items-center">
                <TouchableOpacity onPress={onShowSignUp}>
                    <Text className="text-base ">
                        Don't have an account ?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={signIn} className="mt-4 bg-red-600  px-4 py-2 rounded-3xl ">
                    <Text className="text-white text-lg">Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignIn;