import React, { useContext } from "react";
import {
  View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import PropTypes from 'prop-types';
import ImageUrl from "../../assets/Image.png";
import defaultImg from "../../assets/images/default_music_cover.png";
import MusicContext from "../context/MusicContext";


import { color } from "../config";

const CardMusic = () => {
  const { selected } = useContext(MusicContext);

  return(
      <View style={styles.container}>
          <Image
              style={{
                alignSelf: 'center',
                height: "75%",
                width: "80%",
                borderRadius: 15
              }}
              source={selected.cover ? {uri: selected.cover } : defaultImg}
          />
          {Object.keys(selected).length ? (
              <View style={styles.description}>
                <Text style={styles.title}>{selected.title ? selected.title : selected.fileName.substring(0,25) + "..."}</Text>
                <Text style={[styles.title, { fontSize: 24}]}>{selected.author ? selected.author : "Unknow Artist"}</Text>
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
    fontSize: 28,
    fontFamily: "Avenir-Book",
    color: color.white
  }
});

export default CardMusic;
