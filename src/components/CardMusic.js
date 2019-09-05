import React, { useContext } from "react";
import {
  View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import defaultImg from "../../assets/images/default_music_cover.png";
import MusicContext from "../context/MusicContext";
import { moderateScale } from "react-native-size-matters";

import { color } from "../config";

const CardMusic = () => {
  const { selected } = useContext(MusicContext);

  const cutText = (string) => {
    let newString = string.substring(0,25);
    if(string.length >= 25) newString += "...";
    return  newString;
  };

  return(
      <View style={styles.container}>
          <Image
              style={{
                alignSelf: 'center',
                height: "75%",
                width: "80%",
                borderRadius: moderateScale(15)
              }}
              source={selected.cover ? {uri: selected.cover } : defaultImg}
          />
          {Object.keys(selected).length ? (
              <View style={styles.description}>
                <Text style={styles.title}>{selected.title ? cutText(selected.title) : cutText(selected.fileName)}</Text>
                <Text style={[styles.title, { fontSize: moderateScale(24)}]}>{selected.author ? cutText(selected.author) : "Unknow Artist"}</Text>
              </View>
          ) : <Text>No music selected</Text>}
      </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height: "65%",
    paddingTop: "5%"
  },
  description: {
    marginTop: "10%",
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(28),
    fontFamily: "Avenir-Book",
    color: color.white
  }
});

export default CardMusic;
