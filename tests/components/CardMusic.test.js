import React from "react";
import { create } from 'react-test-renderer';
import { musicData } from "../__mock__/index";
import MusicContext from "../../src/context/MusicContext";
import CardMusic from "../../src/components/CardMusic";
import defaultImg from "../../assets/images/default_music_cover.png";


describe("CardMusic component", () => {
  test("Should correctly render the component", () => {
    const context = {
      selected: musicData[0]
    };
    const tree = create(
        <MusicContext.Provider value={context}>
          <CardMusic/>
        </MusicContext.Provider>
    );

    expect(tree).toMatchSnapshot();
  });

  test("Should render default image and text if music not selected", () => {
    const context = {
        selected: {}
    };

    const component = create(
        <MusicContext.Provider value={context}>
          <CardMusic/>
        </MusicContext.Provider>
    );

    const root = component.root;
    const image  = root.findByType("Image");
    const text = root.findByType("Text");

    expect(text.props.children).toBe("No music selected");
    expect(image.props.source).toBe(defaultImg);
  })
});
