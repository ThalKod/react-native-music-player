import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from "react-native";
import AppRouter from "./src/routes";
import * as Font from 'expo-font';


export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Avenir-Book": require("./assets/fonts/AvenirLTStd-Book.otf"),
        "Avenir-Roman": require("./assets/fonts/AvenirLTStd-Roman.otf"),
        "Avenir-Black": require("./assets/fonts/AvenirLTStd-Black.otf"),
      });
      setLoading(false);
    };
    loadFonts();
  }, []);

  if(loading) return <ActivityIndicator/>;
  return <AppRouter/>
}

