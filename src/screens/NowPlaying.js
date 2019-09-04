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
import TrackPlayer, { usePlaybackState } from "react-native-track-player";



import Constants from 'expo-constants';
import SeekBar  from "../components/SeekBar";

import Hamburger from "../../assets/images/hamburger.png";
import { color } from "../config";
import CardMusic from "../components/CardMusic";
import Controller from "../components/Controller";
import MusicListModal from "../components/MusicListModal";

const NowPlaying = ({ navigation }) => {
  const playbackState = usePlaybackState();

  const [modalVisible, setModalVisible] = useState(false);
  const [music, setMusic] = useState({ selected: {}, list: [] });

  useEffect(() => {
    setupPlayer();
    navigation.setParams({ handleModal });
    fetchMusic();

    const onTrackChange = TrackPlayer.addEventListener('playback-track-changed', async (data) => {
      const track = await TrackPlayer.getTrack(data.nextTrack);
      setMusic(prevState => ({
        ...prevState,
        selected: track
      }));
    });

    return () => {
      onTrackChange.remove();
    }
  }, []);

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE
      ]
    });
  };


  const togglePlayback = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log(currentTrack);
    if (currentTrack == null) {
      // await TrackPlayer.reset();
      // await TrackPlayer.add(music.list);
      // await TrackPlayer.play();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (_) {}
  };

  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (_) {}
  };

  const changeSelected = (selectedMusic) => {
    setMusic(prevState => ({
        ...prevState,
        selected: selectedMusic
    }));
    TrackPlayer.skip(selectedMusic.id);
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

     MusicFiles.getAll(options).then(async tracks => {
       const musicsWithID = tracks.map((elm, index) => {
         return { ...elm, id: index.toString(), url: elm.path }
       });
       await TrackPlayer.add(musicsWithID);
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
            <Controller togglePlayback={togglePlayback} skipToNext={skipToNext} skipToPrevious={skipToPrevious} />
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
