import { WeatherData } from "../types";

export type ExtendedWeatherData = WeatherData & {
    current: {
        temperature: number;
        wind_speed?: number;
        humidity?: number;
    }
    location: {
        name: string;
        region: string;
    }
    historical?: Record<string, any> | null;
    parkImages?: { name: string; url: string }[];
}

