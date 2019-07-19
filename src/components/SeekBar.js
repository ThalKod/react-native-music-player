import React from "react";
import {
  View,
    StyleSheet,
    Text
} from "react-native";
import { color } from "../config";
import Slider from "react-native-slider";


const SeekBar = ({  }) => {
  return(
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: -15}}>
          <Text style={styles.textStyle}>1:02</Text>
          <Text style={styles.textStyle}>3:32</Text>
        </View>
        <View style={styles.progressBar}>
          <Slider
              value={0}
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
    width: "80%"
  },
  progressBar: {
    height: 8,
    borderRadius: 50,
  },
  textStyle: {
    color: color.white
  }
});

export default SeekBar;
