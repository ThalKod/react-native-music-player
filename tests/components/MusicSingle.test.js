import React from "react";
import { create } from 'react-test-renderer';
import { TouchableOpacity } from "react-native";
import MusicSingle  from "../../src/components/MusicSingle";

import { musicData } from "../__mock__/index";
import MusicContext from "../../src/context/MusicContext";

describe("Component MusicSingle", () => {
  test("Should correctly render the component", () => {
    const tree = create(<MusicSingle {...musicData[0]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Should change the selected music.", () => {
    const changeSelectedMock = jest.fn();
    const context = {
      list: [],
      changeSelected: changeSelectedMock
    };

    const element = create(
        <MusicContext.Provider value={context} >
          <MusicSingle {...musicData[0]}/>
        </MusicContext.Provider>
    );

    const instance = element.root;
    const root =  instance.findByType(TouchableOpacity);
    root.props.onPress();
    expect(changeSelectedMock).toBeCalled();
  })
});
