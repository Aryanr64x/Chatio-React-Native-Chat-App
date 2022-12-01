import { Text, View } from "react-native";

const OtherMessage = ({message})=>{
    return (
        <View className="flex-row justify-start mb-2">
            <Text className="bg-slate-200 py-2 px-2 ml-2 rounded-tr-lg rounded-br-lg rounded-tl-lg">
                    { message.text }
            </Text>
        </View>
    );
}

export default OtherMessage;