export interface WeatherData {
    location: {
        name: string
        region: string
        country: string
        localtime: string
    }
    current: {
        temperature: number
        wind_speed: number
        humidity:number
        weather_descriptions: string []
        weather_icons?: string[]
        precip? : number
    }
}