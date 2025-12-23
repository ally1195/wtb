
import React, { useState, useEffect } from 'react'
import WeatherForm from '../components/WeatherForm'
import ComfortAnalysis from '../components/ComfortAnalysisProps';
import SafetyAnalysis from '../components/SaftetyAnalysisProps';
import CampingRecommendation from '../components/CampingRecommendation';
import PreferencesPanel from '../components/PreferencePanelProps';
import { supabase } from '../lib/supabase';
import { ExtendedWeatherData } from '../types/ExtendedWeatherData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import WeatherChart from '../components/WeatherChart';
import CurrentWeatherCard from '../components/CurrentWeatherCard';

const WeatherPage: React.FC = () => {
  const [weather, setWeather] = useState<ExtendedWeatherData | null>(null);
  const [comfortScore, setComfortScore] = useState<number>(100);
  const [safetyScore, setSafetyScore] = useState<number>(100);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('')

   const [comfortPreferences, setComfortPreferences] = useState({
    minTempF: 50,
    maxWindMph: 20,
    campingStyle: 'tent' as const,
    tempTolerance: 'medium' as const,
    windTolerance: 'medium' as const,
    rainTolerance: 'medium' as const,
  });

  const [safetyPreferences, setSafetyPreferences] = useState({
    allowRain: false,
    allowHighFireRisk: false,
    maxWindMph: 15,
  });

  const cToF = (c: number) => (c * 1.8 + 32).toFixed(1);


  const apiKey = import.meta.env.VITE_WEATHERSTACK_KEY;
  const npsKey = import.meta.env.VITE_NPS_KEY;

  function handleSearch(newLocation: string) {
    setLocation(newLocation);
    setStatusMessage('');
  }

  useEffect(() => {
    if(!location) return;

    const fetchAllData = async () => {
      setLoading(true);
      setError(null);

      try {
        const currentRes = await fetch(
          `https://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(
            location
          )}`
        )
        const currentData = await currentRes.json()
        if (currentData.error) throw new Error(currentData.error.info)

        let historicalData = null
        try {
            const date = new Date ()
            date.setDate(date.getDate() - 5)
            const historicalDate = date.toISOString().split('T')[0]

            const histRes = await fetch( `https://api.weatherstack.com/historical?access_key=${apiKey}&query=${encodeURIComponent(
            location
          )}&historical_date=${historicalDate}`
        )
        historicalData = await histRes.json()
        } catch {
            console.warn('Historical not available on this plan')
        }

        let parkImages: { name: string; url: string } [] = []
        try {
            const parkRes = await fetch(`https://developer.nps.gov/api/v1/parks?q=${encodeURIComponent(location)}&api_key=${npsKey}`
          )
          const parkData = await parkRes.json()
          parkImages = parkData.data
          ?.filter((park: any) => park.images && park.images.length > 0)
          .slice(0,5)
          ?.map((park: any) => ({
            name: park.fullName,
            url: park.images[0].url,
          })) ?? [];
        } catch {
          console.warn('Could not fetch park images')
        }

        setWeather({
            ...currentData,
            historical: historicalData?.historical ?? null,
            parkImages,
        })
    } catch (err) {
        setError('Failed to fetch weather or park data');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData()
  }, [location, apiKey, npsKey])

  const tempF = weather?.current ? weather.current.temperature  * 1.8 + 32 : null;
  
  async function saveUserPreferences() {
    setStatusMessage('Attempting to save preferences...');
    await supabase.from('user_preferences').upsert({
          id: 1,
          comfort_preferences: comfortPreferences,
          safety_preferences: safetyPreferences,
        },
      )
      .eq('id', 1);
    
    if (!error) {
      setStatusMessage('Preferences saved!');
    } else {
      setStatusMessage('Failed to save preferences.');
      console.error('Supabase preferences error:', error);
    }
  }

  async function saveWeatherSearch() {
    if(!weather || tempF === null) return;

    await supabase.from('weather_searches').insert({

      city: weather.location.name,
      state: weather.location.region,
      temperature_f: tempF,
      wind_kmh: weather.current.wind_speed ?? 0,
      humidity: weather.current.humidity ?? 0,
      comfort_score: comfortScore,
      safety_score: safetyScore,
      recommended: comfortScore > 70 && safetyScore > 70,
      comfort_preferences: comfortPreferences,
      safety_preferences: safetyPreferences,
    });

    setStatusMessage('Weather search saved!');
    }

  return (
    <div className="app">
      <WeatherForm onSearch={handleSearch} />

      {weather && tempF !== null && (
        <>
        <PreferencesPanel
          comfortPreferences={comfortPreferences}
          setComfortPreferences={setComfortPreferences}
          safetyPreferences={safetyPreferences}
          setSafetyPreferences={setSafetyPreferences}
        />

        <CurrentWeatherCard
          weather={weather}
          tempF={tempF}
        />

        <ComfortAnalysis
          weatherData={weather}
          tempF={tempF}
          preferences={comfortPreferences}
          onScoreChange={setComfortScore}
        />
        <SafetyAnalysis
          weatherData={weather}
          preferences={safetyPreferences}
          onScoreChange={setSafetyScore}
        />

        {weather.historical && (
            <div className="card">
                <h3> Historical Comparison (5 days ago)</h3>
                {Object.entries(weather.historical).map(([date, day]: any) => (
                    <div key={date}>
                        <strong>On this date: {date}</strong> - it was {cToF(day.mintemp)}° / {cToF(day.maxtemp)}° F lower/higher
                </div>
        ))}
        {weather && <WeatherChart weather={weather} />}
        </div>
        )}
        <CampingRecommendation
          comfortScore={comfortScore}
          safetyScore={safetyScore}
        />
        {weather.parkImages && weather.parkImages.length > 0 && (
            <div className="card" style={{ textAlign: 'center' }}>
                <h3>National Park Images</h3>

                <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                style={{ padding: '1rem 0' }}
                >
                {weather.parkImages?.map((park: { name: string; url: string }, index:number) => (
                        <SwiperSlide key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img
                            src={park.url}
                            alt={park.name}
                            style={{ width: 300, borderRadius: 8 }}
                        />
                        <div style={{ marginTop: 8, fontWeight: 'bold' }}>{park.name}</div>
                        </SwiperSlide>
                    ))}
                    </Swiper>
            </div>
            )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center'}}>
          <button 
            onClick={saveUserPreferences} style = {{ marginRight: '1rem' }}>
              Save Preferences
            </button>
            <button onClick={saveWeatherSearch}>Save Weather Search</button>
        </div>
        {statusMessage && <p className="status">{statusMessage}</p>}
        </>
      )}
      </div>
        )
}

export default WeatherPage; 