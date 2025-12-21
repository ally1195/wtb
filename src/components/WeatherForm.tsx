import { useState } from "react"

interface WeatherFormProps {
    onSearch: (location: string) => void
}

function WeatherForm({ onSearch }: WeatherFormProps) {
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!city.trim() || !state.trim()) {
            setError('Please enter both city and state.');
            return;
        }

        setError(null);
        onSearch(`${city}, ${state}`);
    };


    return (
        <form className="weather-form" onSubmit={handleSubmit}>
            <div className="location-row">
                <div>
                <label htmlFor="city">City:</label>
                    <input 
                        id="city"
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="City"
                        required
                    />
                </div>

                <div>
                <label htmlFor="state">State:</label>
                    <input 
                        id="state"
                        type="text"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder="State"
                        required
                    />
                </div>
            </div>

                    {error && <p className ="error">{error}</p>}

                    <button type="submit">
                    Get Weather
                    </button>
        </form>
    )
}

export default WeatherForm