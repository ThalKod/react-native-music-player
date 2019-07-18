import {
    createStackNavigator,
    createAppContainer
} from "react-navigation";
import NowPlaying from "../screens/NowPlaying";

const MainNavigation = createStackNavigator({
  NowPlaying: NowPlaying
});

export default createAppContainer(MainNavigation);

