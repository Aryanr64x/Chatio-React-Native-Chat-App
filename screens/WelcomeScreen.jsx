import { View, Text, Button, TouchableOpacity } from "react-native";
const WelcomeScreen = ({ navigation })=>{
    return (
        <View className="h-screen justify-center items-center">
                <Text className="text-5xl"> Chatio. </Text>
                <Text className="mt-2 text-lg"> One Place for all the social talk birds  </Text>
                <TouchableOpacity  className="mt-4 bg-red-600 px-4 py-2 rounded-3xl " onPress={()=>{
                  navigation.navigate('auth')  
                }}>
                    <Text className="text-white text-lg">Get Started</Text>
                </TouchableOpacity>
        </View>
    );
}

export default WelcomeScreen;