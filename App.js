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
import TodayScreen from "./screens/TodayScreen";
import MonthScreen from "./screens/MonthScreen";
import SearchScreen from "./screens/SearchScreen";

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
                backgroundColor: "#bde3d7",
              },
              tabBarActiveTintColor: "#005F73",
              tabBarInactiveTintColor: "#00a0c1",
              headerStyle: {
                backgroundColor: "#bde3d7",
              },
              headerTintColor: "#005F73",
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
              name="Month"
              component={MonthScreen}
              options={{
                headerTitle: "This Month's Pictures",
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
              component={SearchScreen}
              options={{
                headerTitle: "Find a Picture of the Day",
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
