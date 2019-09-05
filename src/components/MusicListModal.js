import React, { useContext } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
    ScrollView
} from "react-native";
import PropTypes from "prop-types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MusicContext from "../context/MusicContext";
import { moderateScale } from "react-native-size-matters";


import MusicSingle from "../components/MusicSingle";

const MusicListModal = ({ isModalVisible, closeModal }) => {
  const { list } = useContext(MusicContext);
  const renderMusic = () => {
    return list.map((music) => {
      return <MusicSingle id={music.id} key={music.id} title={music.title} artist={music.author} imageUrl={music.cover} fileName={music.fileName}/>
    });
  };

  return (
      <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <MaterialIcons name="close" size={moderateScale(26)} color="black"/>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>My Music</Text>
            </View>
            <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
            <ScrollView>
              {list.length > 0 ? renderMusic() : (
                  <Text>No Music on the device</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
  )
};

MusicListModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    width: "100%",
    height: "90%",
    padding: "5%",
    backgroundColor: "white",
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: moderateScale(15)
  },
  closeButton: {
    flex: 1
  },
  headerTitle: {
    flex: 2,
    fontSize: moderateScale(24),
    fontFamily: "Avenir-Roman"
  }
});

export default MusicListModal;

