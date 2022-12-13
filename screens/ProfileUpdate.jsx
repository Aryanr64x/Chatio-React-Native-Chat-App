import { Image, Text, View , TouchableOpacity} from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authContext } from "../contexts/AuthContextWrapper";




const ProfileUpdate = ({ navigation }) => {
    const [image, setImage] = useState(null)
    const auth = useContext(authContext)



    const sendPhoto = async () => {

        try {

            const resp = await axios.post(BASE_URL + '/api/user/update/', { image: image.base64 }, { headers: { "Authorization": `Bearer ${auth.tokens.access}` } });
            
            console.log("BELOW IS THE RESPONSE")
            console.log(resp.data)
            auth.setUser({...auth.user, dp: resp.data.dp})
            navigation.pop()
        } catch (e) {
            console.log(e)
        }

    }



    const uploadPhoto = async () => {
        console.log("Image has been uploaded")
        await pickImage()
    }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            base64: true,

            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    return (<View className="px-2">
        <View className="mt-8">
            <Text className="text-3xl">
                Update Your Profile Here!
            </Text>
        </View>
        <View className="items-center mt-8">
            <Image className="h-32 w-32 rounded-full mr-4" source={{
                uri:  (!image) ? 'https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-set-image-stock-isolated-object-icon-collection-137161298.jpg' : `data:image/jpeg;base64,${image.base64}`
            }} />
            <TouchableOpacity onPress={uploadPhoto} className="mt-2 px-2 py-2 rounded-3xl bg-red-600"><Text className="text-white">Upload Image</Text></TouchableOpacity>
            <TouchableOpacity onPress={sendPhoto} className="mt-2 px-2 py-2 rounded-3xl bg-red-600"><Text className="text-white">Update Profile</Text></TouchableOpacity>

        </View>
    </View>)
}

export default ProfileUpdate;