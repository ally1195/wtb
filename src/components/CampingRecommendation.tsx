import React from 'react';

interface CampingRecommendationProps {
    comfortScore: number;
    safetyScore: number;
    comfortReasons?: string[];
    safetyReasons?: string[];
}

const CampingRecommendation: React.FC<CampingRecommendationProps> = ({ comfortScore, safetyScore }) => {
    let verdict: 'good' | 'caution' | 'no-go' = 'good';
    let title = '';
    let message = ''

    if (safetyScore < 40) {
        verdict = 'no-go';
        title = 'Not Recommended';
        message = 'Weather conitions pose safety risks. Its best to avoid camping at this time.';
    } else if (safetyScore < 70 || comfortScore < 50) {
        verdict = 'caution';
        title = 'Proceed with Caution';
        message = 'Conditions are manageable, but you may experience discomfort or moderate safety conerns.';
    } else {
        verdict = 'good';
        title = 'Great for Camping'
        message = 'Weather conditions look favorable for a safe and comfortable camping experience.'
    }


    return (
        <div className={`card card-full-width camping-recommendation ${verdict}`}> 
            <h2 className='recommendation-title'>{title}</h2>
            <p>{message}</p>

            <div className='recommendation-scores'>
            <p>Comfort Score: {comfortScore}/100</p>
            <p>Safety Score: {safetyScore}/100</p>
            </div>
        </div>
    );
};

export default CampingRecommendation;