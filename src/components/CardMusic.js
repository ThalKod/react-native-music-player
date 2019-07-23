import React from "react";
import {
  View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import PropTypes from 'prop-types';
import ImageUrl from "../../assets/Image.png";

import { color } from "../config";


const CardMusic = ({ imageUrl, title, author }) => {
  return(
      <View style={styles.container}>
          <Image
              style={{
                alignSelf: 'center',
                height: "75%",
                width: "80%",
                borderRadius: 15
              }}
              source={ImageUrl}
          />
        <View style={styles.description}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.title, { fontSize: 24}]}>{author}</Text>
        </View>
      </View>
  )
};

CardMusic.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
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
