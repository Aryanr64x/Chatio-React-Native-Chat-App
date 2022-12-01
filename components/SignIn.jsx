import { useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { authContext } from '../contexts/AuthContextWrapper';

const SignIn = ({ onShowSignUp, navigation }) => {
    const username = useRef('')
    const password = useRef('')
    const auth = useContext(authContext)
    const signIn = async()=>{
        const isSuccess = await auth.signIn(username.current, password.current)
        if(isSuccess){
            navigation.navigate("home")
        }else{
            // failed ui
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
            <TextInput onChangeText={(text)=>{username.current = text}}  placeholder="Enter your username.." className="px-2 py-2 border border-black mt-6" />
            <TextInput onChangeText={(text)=>{password.current = text}} placeholder="Enter your password.." secureTextEntry={true} className="px-2 py-2 border border-black mt-4" />
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