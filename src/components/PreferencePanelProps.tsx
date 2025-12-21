interface PreferencesPanelProps {
    comfortPreferences: any;
    setComfortPreferences: (prefs: any) => void;
    safetyPreferences: any;
    setSafetyPreferences: (prefs: any) => void;
}

function PreferencesPanel({
    comfortPreferences,
    setComfortPreferences,
    safetyPreferences,
    setSafetyPreferences,
}: PreferencesPanelProps) {
    return (
        <div className= "card">
            <h3> Camping Preferences </h3>

            <label>
                Minimum Comfortable Temperature (°F):
                <div style = {{ display: 'flex', gap: '0.5rem'}}>
                    <input
                        type = "range"
                        min={30}
                        max={90}
                        value = {comfortPreferences.minTempF}
                        onChange = {(e) =>
                            setComfortPreferences( {
                                ...comfortPreferences,
                                minTempF: Number(e.target.value),
                            })
                        }
                    />
                    <input
                        type = "number"
                        min={30}
                        max={90}
                        value = {comfortPreferences.minTempF}
                        onChange = {(e) =>
                            setComfortPreferences( {
                                ...comfortPreferences,
                                minTempF: Number(e.target.value),
                            })
                        }
                    />
                </div>
            </label>

            <label>
                Max Comfortable Wind (mph):
                <div style = {{ display: 'flex', gap: '0.5rem'}}>    
                    <input
                        type = "range"
                        min={0}
                        max={40}
                        value = {comfortPreferences.maxWindMph}
                        onChange = {(e) =>
                            setComfortPreferences( {
                                ...comfortPreferences,
                                maxWindMph: Number(e.target.value),
                            })
                        }
                    />
                    <input
                        type = "number"
                        min={0}
                        max={40}
                        value = {comfortPreferences.maxWindMph}
                        onChange = {(e) =>
                            setComfortPreferences( {
                                ...comfortPreferences,
                                maxWindMph: Number(e.target.value),
                            })
                        }
                    />
                </div>
            </label>

            <hr />

              Max Safe Wind (mph):
                <div style = {{ display: 'flex', gap: '0.5rem'}}>    
                    <input
                        type = "range"
                        min={0}
                        max={40}
                        value = {safetyPreferences.maxWindMph}
                        onChange = {(e) =>
                            setSafetyPreferences( {
                                ...safetyPreferences,
                                maxWindMph: Number(e.target.value),
                            })
                        }
                    />
                    <input
                        type = "number"
                        min={0}
                        max={40}
                        value = {safetyPreferences.maxWindMph}
                        onChange = {(e) =>
                            setSafetyPreferences( {
                                ...safetyPreferences,
                                maxWindMph: Number(e.target.value),
                            })
                        }
                    />
                </div>

            <label>
                Allow Rain:
                <input
                    type = "checkbox"
                    value = {safetyPreferences.allowRain}
                    onChange = {(e) =>
                        setSafetyPreferences( {
                            ...safetyPreferences,
                            allowRain: e.target.checked,
                        })
                    }
                />
            </label>
        </div>
    );
}

export default PreferencesPanel