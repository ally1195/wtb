import { useEffect } from "react"
import { ExtendedWeatherData } from "../types/ExtendedWeatherData"

interface ComfortAnalysisProps {
    weatherData: ExtendedWeatherData
    tempF: number
    preferences: {
        minTempF: number
        maxWindMph: number
        campingStyle: string
        tempTolerance: 'medium',
        windTolerance: 'medium',
        rainTolerance: 'medium',
    }
    onScoreChange: (score: number) => void
}

interface Deduction {
    factor: string
    points: number
    message: string
}

function ComfortAnalysis({ weatherData, tempF, preferences, onScoreChange }: ComfortAnalysisProps) {

    const deductions: Deduction[] = []

    if (tempF < preferences.minTempF) {
        deductions.push({
            factor: 'Temperature',
            points: 30,
            message:'Temperature is lower than your comfort preference.'
        });
    }
    if (weatherData.current.wind_speed > preferences.maxWindMph) {
        deductions.push({
            factor: 'Wind',
            points: 25,
            message:'Strong winds may reduce comfort, especially for tents.'
        });
    }

    if (weatherData.current.humidity > 80) {
        deductions.push({
            factor: 'Humidity',
            points: 15,
            message:'High humidity may feel sticky and uncomfortable.'
        })

    }

    let score = 100 - deductions.reduce((acc, d) => acc + d.points, 0) 
    score = Math.max(0, Math.min(score, 100))
    
    useEffect(() => {
        onScoreChange(score);
    }, [score, onScoreChange]);

    let level: 'good' | 'okay' | 'poor' = 'good'
    if (score < 70) level = 'okay'
    if (score < 40) level = 'poor'

    return (
        <div className="card">
            <h3> Comfort Analysis </h3>
            <p> Comfort level: <strong className={`level ${level}`}>
                {level.toUpperCase()}</strong></p>
            <p> Score: {score}/100</p>

            {deductions.length > 0 ? (
                <div>
                    <p> Factors that reduced your comfort score:</p>
                    <ul>
                        {deductions.map((d, index) => (
                            <li key={index}>
                                {d.factor}:   (-{d.points}) points   {d.message}
                            </li>
                        ))}
                    </ul>
                </div>
                ) : (
                    <p> Conditions look very comfortable for camping.</p>
            )}
        </div>
    )
}   
export default ComfortAnalysis;