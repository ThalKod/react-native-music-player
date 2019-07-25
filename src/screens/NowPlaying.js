import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from "react-native-vector-icons/FontAwesome";


import Constants from 'expo-constants';
import SeekBar  from "../components/SeekBar";

import Hamburger from "../../assets/images/hamburger.png";
import { color } from "../config";
import CardMusic from "../components/CardMusic";
import Controller from "../components/Controller";
import MusicListModal from "../components/MusicListModal";

const NowPlaying = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setParams({ handleModal });
  }, []);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
      <LinearGradient
          colors={[color.primary, color.secondary]}
          style={styles.container}
      >
        <View style={styles.content}>
          <CardMusic author="Selena Gomez" title="Taki Taki"/>
          <SeekBar/>
          <Controller/>
        </View>
        <MusicListModal isModalVisible={modalVisible} closeModal={handleModal}/>
      </LinearGradient>
  )
};

NowPlaying.navigationOptions = ({ navigation }) => ({
  title: "Now Playing",
  headerTransparent: true,
  headerLeft: (
      <TouchableOpacity
        onPress={navigation.getParam("handleModal")}
      >
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
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  }
});

export default NowPlaying;
