import React, { useState } from "react";
import { AppSettingsContext, type Language } from "./AppSettingsContext";

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<Language>("en");
	const [volume, setVolume] = useState(1);

	return (
		<AppSettingsContext.Provider value={{ language, volume, setLanguage, setVolume }}>
			{children}
		</AppSettingsContext.Provider>
	);
}
