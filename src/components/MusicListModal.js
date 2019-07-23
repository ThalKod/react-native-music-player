import React from "react";
import {
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";

import MusicSingle from "../components/MusicSingle";

const MusicListModal = ({ isModalVisible, closeModal }) => {

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
                <MaterialIcons name="close" size={26} color="black"/>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>My Music</Text>
            </View>
            <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
            <MusicSingle title="Example" artist="My Artist" imageUrl="test"/>
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },
  closeButton: {
    flex: 1
  },
  headerTitle: {
    flex: 2,
    fontSize: 24,
    fontFamily: "Avenir-Roman"
  }
});

export default MusicListModal;

