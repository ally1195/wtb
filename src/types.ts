export interface WeatherData {
    location: {
        name:string
        country:string
        region: string
        localtime: string

    }

    current: {
        temperature: number
        weather_descriptions: string[]
        wind_speed: number
        humidity: number
        precip?: number
        [key: string]: any
    }
}