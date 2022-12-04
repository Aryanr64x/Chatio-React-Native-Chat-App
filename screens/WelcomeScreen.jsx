import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import { Image } from "react-native";
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import BASE_URL from '../BASE_URL.js'


const WelcomeScreen = ({ navigation }) => {
 
  return (
      <View className="h-screen justify-center items-center">
              <Text variant="displayLarge"> Chatio. </Text>
              <Text className="mt-2 text-lg"> One Place for all the social talk birds  </Text>
              <Button  className="mt-4 bg-red-600 px-2 py-2  text-white " onPress={()=>{
                navigation.navigate('auth')  
              }}>
                <Text className="text-white">Get Started</Text>
              </Button>
      </View>
  );
}

export default WelcomeScreen;