import { useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { authContext } from '../contexts/AuthContextWrapper';

const SignUp = ({ onShowSign, navigation }) => {
    const username = useRef('')
    const password = useRef('')
    const password_confirm = useRef('')
    const auth = useContext(authContext)



    const signUp = async()=>{
        if(password.current == password_confirm.current){
            const succerss  = await auth.signUp(username.current, password.current);
            if(succerss){
                navigation.navigate("home");
            }else{

            }
        }else{
            console.log("Password and Password confirm does not match ");
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
            <TextInput onChangeText={(text)=>{username.current = text}}  placeholder="Enter your username.." className="px-2 py-2 border border-black mt-6" />
            <TextInput onChangeText={(text)=>{password.current = text}}  placeholder="Enter your password.." secureTextEntry={true} className="px-2 py-2 border border-black mt-4" />
            <TextInput onChangeText={(text)=>{password_confirm.current = text }} placeholder="Confirm your password.." secureTextEntry={true} className="px-2 py-2 border border-black mt-4" />

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