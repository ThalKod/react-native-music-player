import React, { useContext } from "react";
import {
  View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import Proptypes from "prop-types";
import defaultImg from "../../assets/images/default_music_cover.png";
import MusicContext from "../context/MusicContext";
import { moderateScale } from "react-native-size-matters";

const MusicSingle = ({ title, artist, imageUrl, fileName, id }) => {
  const { changeSelected, list } = useContext(MusicContext);

  const onMusicPress = () => {
    const selected = list.find(elm => elm.id === id );
    changeSelected(selected);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onMusicPress}>
      <View style={styles.imageContainer}>
        <Image
            source={ imageUrl ? {uri: imageUrl} : defaultImg}
            style={styles.image}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.textStyle}>{title || fileName.substring(0, 25) + "..."}</Text>
        <Text style={[styles.textStyle, { fontSize: 16, fontFamily: "Avenir-Roman" }]}>{artist || "Unknown Artist" }</Text>
      </View>
    </TouchableOpacity>
  )
};

MusicSingle.propTypes = {
  title: Proptypes.string,
  artist: Proptypes.string,
  imageUrl: Proptypes.string,
  filename: Proptypes.string,
  id: Proptypes.string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: moderateScale(15),
    height: moderateScale(75),
    justifyContent: "space-between",
  },
  imageContainer: {
    height: "100%",
    width: "25%",
    marginRight: moderateScale(20)
  },
  image: {
    borderRadius: moderateScale(10),
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  descriptionContainer: {
    flex: 2,
    justifyContent: "space-around",
  },
  textStyle: {
    fontFamily: "Avenir-Black",
    color: "#353840",
    fontSize: moderateScale(18)
  }
});

export default MusicSingle;
