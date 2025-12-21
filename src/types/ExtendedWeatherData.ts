import { WeatherData } from "../types";

export type ExtendedWeatherData = WeatherData & {
    historical?: Record<string, any> | null;
    parkImages?: string[];
}

