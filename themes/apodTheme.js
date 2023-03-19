import { createTheme } from "@rneui/themed";
import { colorPalette as c } from "../Constants";

export const apodTheme = createTheme({
  components: {
    Button: () => ({
      buttonStyle: {
        backgroundColor: c.highlight,
        paddingVertical: 12,
      },
      titleStyle: {
        textTransform: "uppercase",
      },
    }),
    Text: {
      h2Style: {
        color: c.highlight,
        fontWeight: "bold",
        fontSize: 20,
      },
    },
    Image: {
      style: {
        width: "100%",
        resizeMode: "contain",
        height: undefined,
        aspectRatio: 1,
      },
    },
    SearchBar: {
      inputContainerStyle: {
        backgroundColor: "#ffffff",
      },
      containerStyle: {
        backgroundColor: "#bde3d7",
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 0,
      },
    },
  },
});
