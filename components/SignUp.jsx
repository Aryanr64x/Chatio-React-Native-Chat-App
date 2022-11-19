import { View, Text, TextInput, TouchableOpacity } from 'react-native'

const SignUp = ({ onShowSign }) => {
    return (
        <View className="pt-8 px-4 justify-center h-full">
            <Text className="text-2xl">
                Create a New Account
            </Text>
            <Text className="mt-2">
                Enter your login credentials below to get inside our virtual world of madness !
            </Text>
            <TextInput placeholder="Enter your username.." className="px-2 py-2 border border-black mt-6" />
            <TextInput placeholder="Enter your password.." secureTextEntry={true} className="px-2 py-2 border border-black mt-4" />
            <TextInput placeholder="Confirm your password.." secureTextEntry={true} className="px-2 py-2 border border-black mt-4" />

            <View className="flex flex-row justify-between items-center">
                <TouchableOpacity onPress={onShowSign}>
                    <Text className="text-base ">
                       Already have an account ?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="mt-4 bg-red-600  px-4 py-2 rounded-3xl ">
                    <Text className="text-white text-lg">Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp;