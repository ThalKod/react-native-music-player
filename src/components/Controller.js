import React from "react";
import {
  View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Platform
} from "react-native";
import repeat from "../../assets/images/repeat.png";
import previous from "../../assets/images/previous.png";
import next from "../../assets/images/Next.png";
import random from "../../assets/images/random.png";
import {LinearGradient} from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import TrackPlayer, {
  usePlaybackState,
} from "react-native-track-player";

import { color } from "../config";

const Controller = ({ togglePlayback, skipToPrevious, skipToNext }) => {
  const playbackState = usePlaybackState();

  return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Image source={repeat}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToPrevious}>
          <Image source={previous}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayback} style={styles.button}>
          <LinearGradient
              start={{x: 0, y: 0.75}}
              end={{x: 1, y: 0.25}}
              colors={["#1CBE9E", "#53E3C7"]}
              style={ styles.gradient }
          >
            {playbackState === TrackPlayer.STATE_PLAYING ||
            playbackState === TrackPlayer.STATE_BUFFERING ? <AntDesign name="pause" size={50} color={color.white} /> : <MaterialIcons name="play-arrow" size={50} color={color.white} /> }
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNext}>
          <Image source={next}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={random}/>
        </TouchableOpacity>
      </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: Platform.OS === 'ios' ? "30%" : "27%",
    height: 75,
    borderRadius: 75,
  },
  gradient: {
    flex: 1,
    borderRadius: Platform.OS === 'ios' ? 38 : 75,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Controller;
