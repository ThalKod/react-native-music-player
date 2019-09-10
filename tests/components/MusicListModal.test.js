import React from "react";
import { create } from 'react-test-renderer';
import MusicListModal from "../../src/components/MusicListModal";
import { TouchableOpacity } from "react-native";
import { musicData } from "../__mock__/index";
import MusicContext from "../../src/context/MusicContext";


describe("MusicListModal", () => {
  let component = undefined;
  let closeModal = jest.fn();

  beforeEach(() => {
    const context = {
      list: musicData,
    };
    component = create(
        <MusicContext.Provider value={context}>
          <MusicListModal isModalVisible={true} closeModal={closeModal}/>
        </MusicContext.Provider>
    );
  });

  test("Should correctly render the component", () => {
      expect(component).toMatchSnapshot();
  });

  test("Should close the modal on close button pressed", () => {
    const root = component.root;
    const close = root.findAllByType(TouchableOpacity);

    close[0].props.onPress();
    expect(closeModal).toBeCalled();
  })
});
