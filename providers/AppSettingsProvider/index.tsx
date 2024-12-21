import { AppSettingsContext } from "@/providers/AppSettingsProvider/AppSettingsContext";
import { Language } from "@/providers/AppSettingsProvider/AppSettingsContext";
import React, { useState } from "react";

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<Language>("en");
	const [volume, setVolume] = useState(1);

	return (
		<AppSettingsContext.Provider value={{ language, volume, setLanguage, setVolume }}>
			{children}
		</AppSettingsContext.Provider>
	);
}
