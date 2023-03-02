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

// Application's Theme
import { ThemeProvider } from "@rneui/themed";

// Project imports: Three Top-level transition screens
import Today from "./screens/Today";
import Month from "./screens/Month";
import Search from "./screens/Search";

// Bottom Tab Navigator will be applied using the Tab constant inside the Safe Area Provider & Navigator Containers.
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Today"
            screenOptions={{
              tabBarStyle: {
                backgroundColor: "#94d2bd4c",
              },
              tabBarActiveTintColor: "#005F73",
              tabBarInactiveTintColor: "#005f73a6",
              headerStyle: {
                backgroundColor: "#94d2bd4c",
              },
              headerTintColor: "#005F73",
              headerTitleAlign: "center",
              tabBarShowLabel: false,
            }}
          >
            <Tab.Screen
              name="Today"
              component={Today}
              options={{
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
              name="Month"
              component={Month}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="calendar-month"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Search"
              component={Search}
              options={{
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
