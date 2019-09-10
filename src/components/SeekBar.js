import React, { useContext, useEffect, useState } from "react";
import {
  View,
    StyleSheet,
    Text
} from "react-native";
import { color } from "../config";
import Slider from "react-native-slider";
import TrackPlayer, { useTrackPlayerProgress } from "react-native-track-player";
import MusicContext from "../context/MusicContext";
import { minutesAndSeconds} from "../utils";
import { moderateScale } from "react-native-size-matters"


const SeekBar = ({  }) => {
  const [musicLength, setMusicLength] = useState(0);
  const { position } = useTrackPlayerProgress();

  const { selected } = useContext(MusicContext);
  const elapsed = minutesAndSeconds(position);
  const remaining = minutesAndSeconds(musicLength - position);

  useEffect(() => {
    if(selected.duration){
      setMusicLength(Math.round(selected.duration / 1000)) ; // In Seconds
    }
  }, [selected]);

  const handleSliding = (time) => {
    TrackPlayer.seekTo(time);
    TrackPlayer.play();
  };

  return(
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: -10}}>
          <Text style={styles.textStyle}>{elapsed[0] + ":" + elapsed[1]}</Text>
          <Text style={styles.textStyle}>{musicLength > 1 && "-" + remaining[0] + ":" + remaining[1] || "00:00"}</Text>
        </View>
        <View style={styles.progressBar}>
          <Slider
              maximumValue={Math.max(musicLength, 1, position + 1)}
              value={position}
              onSlidingStart={() => TrackPlayer.pause()}
              onSlidingComplete={handleSliding}
              onValueChange={value => {}}
              trackStyle={{ backgroundColor: color.white, height: 8}}
              minimumTrackTintColor={color.green}
              thumbStyle={{ borderRadius: 50, width: 5, backgroundColor:color.green }}
          />
        </View>
      </View>

  )
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
  },
  progressBar: {
    height: moderateScale(8),
    borderRadius: moderateScale(50),
  },
  textStyle: {
    color: color.white
  }
});

export default SeekBar;
