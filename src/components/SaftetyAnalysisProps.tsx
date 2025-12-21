import { useEffect } from "react";
import { ExtendedWeatherData } from "../types/ExtendedWeatherData";

interface SafetyAnalysisProps {
    weatherData: ExtendedWeatherData;
    preferences: {
        allowRain: boolean,
        allowHighFireRisk: boolean,
        maxWindMph: number,
    };
    onScoreChange:(score: number) => void
}

interface Deduction{
    factor: string
    points: number
    message: string
}

function SafetyAnalysis({ weatherData, preferences, onScoreChange }: SafetyAnalysisProps) {   
    const deductions: Deduction [] = []


    if (weatherData.current.wind_speed> preferences.maxWindMph) {
        deductions.push({
            factor:'Wind',
            points: 25,
            message: 'Wind speed is high, which may affect tent stability and safety.'
        })
    }

    const fireRisk = false
    if (fireRisk && !preferences.allowHighFireRisk) {
        deductions.push({
            factor: 'Fire Risk',
            points: 20,
            message: 'High fire risk, camping may be unsafe.'
        })
    }

    let score = 100 - deductions.reduce((acc, d) => acc + d.points, 0) 
    score = Math.max(0, Math.min(score, 100))
    
    
    useEffect(() => {
        onScoreChange(score);
    }, [score, onScoreChange]);

    let level: 'safe' | 'caution' | 'unsafe' = 'safe'
    if (score < 70) level = 'caution'
    if (score < 40) level = 'unsafe'

    return (
        <div className="card">
            <h3> Safety Analysis </h3>
            <p> Safety level: <strong>{level.toUpperCase()}</strong></p>
            <p> Score: {score}/100</p>

            {deductions.length > 0 ? (
                <div>
                    <p> Factors that reduced your comfort score:</p>
                    <ul>
                        {deductions.map((d, index) => (
                            <li key={index}>
                                {d.factor}:  (-{d.points}) points  {d.message}
                            </li>
                        ))}
                    </ul>
                </div>
                ) : (
                    <p> Conditions appear safe for camping.</p>
            )}
        </div>
    )
}   

export default SafetyAnalysis
