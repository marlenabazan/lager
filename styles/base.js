import { reloadAsync } from "expo-updates";
import { shouldUseActivityState } from "react-native-screens";

export const container = {
    flex: 1,
};

export const base = {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
}

export const image = {
    width: 280,
    alignSelf: 'center'
}

export const deliveryBox = {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "#228DF8",
    borderRadius: 20,
    marginBottom: 6,
}

export const button = {
    borderWidth: 2,
    borderColor: "#228DF8",
    backgroundColor: "pink",
}
