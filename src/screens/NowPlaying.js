import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from "@expo/vector-icons";
import Constants from 'expo-constants';

import Hamburger from "../../assets/hamburger.png";
import { color } from "../config";

const NowPlaying = () => {
  return (
      <LinearGradient
          colors={[color.primary, color.secondary]}
          style={styles.container}
      >
        <View style={styles.content}>
          <Text>Content !</Text>
        </View>
      </LinearGradient>
  )
};

NowPlaying.navigationOptions = () => ({
  title: "Now Playing",
  headerTransparent: true,
  headerLeft: (
      <TouchableOpacity>
        <Image source={Hamburger}/>
      </TouchableOpacity>
  ),
  headerRight: (
      <TouchableOpacity>
        <FontAwesome name="heart" size={24} color="white"/>
      </TouchableOpacity>
  ),
  headerTitleStyle: {
    textAlign:'center',
    alignSelf:'center',
    flex:1,
    fontFamily: "Avenir-Book",
    fontSize: 18,
    color: color.white
  },
  headerStyle: {
    marginLeft: "5%",
    marginRight: "5%"
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 50
  },
  content: {
    flex: 1
  }
});

export default NowPlaying;
