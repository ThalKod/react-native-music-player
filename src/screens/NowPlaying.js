import React, { useState, useEffect } from "react";
import Permissions from 'react-native-permissions';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MusicFiles from "react-native-get-music-files";
import { MusicProvider } from "../context/MusicContext";


import Constants from 'expo-constants';
import SeekBar  from "../components/SeekBar";

import Hamburger from "../../assets/images/hamburger.png";
import { color } from "../config";
import CardMusic from "../components/CardMusic";
import Controller from "../components/Controller";
import MusicListModal from "../components/MusicListModal";

const NowPlaying = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [music, setMusic] = useState({ selected: {}, list: [] });

  useEffect(() => {
    navigation.setParams({ handleModal });
    fetchMusic();
  }, []);


  const changeSelected = (selectedMusic) => {
    setMusic(prevState => ({
        ...prevState,
        selected: selectedMusic
    }));
    setModalVisible(false);
  };

  const fetchMusic = async () => {
    const status = await Permissions.request('storage');
    if(status !== "authorized"){
      Alert.alert(
          "We can't access your music",
      );
    }
    const options = {
      blured : true,
      artist : true,
      genre : true,
      title : true,
      cover : true,
      minimumSongDuration : 10000,
      fields : ['title','albumTitle','genre','lyrics','artwork','duration']
    };

     MusicFiles.getAll(options).then(tracks => {
       const musicsWithID = tracks.map((elm, index) => {
         return { ...elm, id: index }
       });
       setMusic({...music, list: musicsWithID, changeSelected});
     }).catch(error => {
       console.log("error",error);
     })

  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
      <MusicProvider value={music}>
        <LinearGradient
            colors={[color.primary, color.secondary]}
            style={styles.container}
        >
          <View style={styles.content}>
            <CardMusic/>
            <SeekBar/>
            <Controller/>
          </View>
          <MusicListModal isModalVisible={modalVisible} closeModal={handleModal}/>
        </LinearGradient>
      </MusicProvider>
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
