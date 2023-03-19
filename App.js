// MDIA 4295 – Assignment 3
// Monica Zarate – A01310492

// External imports
import * as React from "react";

// Safe Area provider is needed for the React Navigator & React Native Elements
import { SafeAreaProvider } from "react-native-safe-area-context";

// Application's Bottom Tab Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Project imports: Three Top-level transition screens
import { colorPalette as c } from "./Constants";
import TodayScreen from "./screens/TodayScreen";
import ArchiveScreen from "./screens/ArchiveScreen";

// Application's Theme
import { ThemeProvider } from "@rneui/themed";
import { apodTheme } from "./themes/apodTheme";

// Bottom Tab Navigator will be applied using the Tab constant inside the Safe Area Provider & Navigator Containers.
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={apodTheme}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Today"
            screenOptions={{
              tabBarStyle: {
                backgroundColor: c.white,
              },
              tabBarActiveTintColor: c.highlight,
              tabBarInactiveTintColor: c.inactive,
              headerStyle: {
                backgroundColor: c.primary,
              },
              headerTintColor: c.highlight,
            }}
          >
            <Tab.Screen
              name="Today"
              component={TodayScreen}
              options={{
                headerTitle: "NASA's Astronomy Picture of the Day",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="image"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Archive"
              component={ArchiveScreen}
              options={{
                headerTitle: "Picture Archive",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="image-search"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
