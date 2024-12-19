import { useContext } from "react";
import { AppSettingsContext } from "./AppSettingsContext";

export function useAppSettings() {
	return useContext(AppSettingsContext);
}
