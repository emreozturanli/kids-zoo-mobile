import { useContext } from "react";
import { AppSettingsContext } from "../providers/AppSettingsProvider/AppSettingsContext";

export function useAppSettings() {
	return useContext(AppSettingsContext);
}
