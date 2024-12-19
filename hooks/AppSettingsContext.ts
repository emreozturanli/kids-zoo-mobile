import { createContext } from "react";

export type Language = "en" | "ar" | "tr" | "pt" | "de";

export interface AppSettings {
	language: Language;
	volume: number;
	setLanguage: (lang: Language) => void;
	setVolume: (volume: number) => void;
}

export const AppSettingsContext = createContext<AppSettings>({
	language: "en",
	volume: 1,
	setLanguage: () => {},
	setVolume: () => {},
});
