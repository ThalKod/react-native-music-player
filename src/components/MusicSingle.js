import React from "react";
import {
  View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import Proptypes from "prop-types";
import ImageUrl from "../../assets/Image.png";



const MusicSingle = ({ title, artist, imageUrl }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
            source={ImageUrl}
            style={styles.image}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.textStyle}>Hello World !</Text>
        <Text style={[styles.textStyle, { fontSize: 16, fontFamily: "Avenir-Roman" }]}>Artist</Text>
      </View>
    </TouchableOpacity>
  )
};

MusicSingle.propTypes = {
  title: Proptypes.string.isRequired,
  artist: Proptypes.string.isRequired,
  imageUrl: Proptypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 15,
    height: 75,
    justifyContent: "space-between",
  },
  imageContainer: {
    height: "100%",
    width: "25%",
    marginRight: 20
  },
  image: {
    borderRadius: 10,
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
    fontSize: 18
  }
});

export default MusicSingle;
