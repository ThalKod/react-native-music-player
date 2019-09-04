import React from "react";

const MusicContext = React.createContext({
  selected: {},
  list: [],
  changeSelected: () => {}
});

export const MusicProvider = MusicContext.Provider;
export const MusicConsumer = MusicContext.Consumer;

export default MusicContext;
