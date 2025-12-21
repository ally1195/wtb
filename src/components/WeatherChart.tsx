import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { supabase } from '../lib/supabase';
import { ExtendedWeatherData } from '../types/ExtendedWeatherData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface WeatherChartProps {
  weather: ExtendedWeatherData | null;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ weather }) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const buildChartData = async () => {

      const { data: searches } = await supabase
        .from('weather_searches')
        .select('city, temperature_f')
        .order('created_at', { ascending: false })
        .limit(5);


      const labels = weather?.location?.name
        ? [weather.location.name, ...(searches?.map(s => s.city) ?? [])]
        : searches?.map(s => s.city) ?? [];

      const temps = weather?.current?.temperature
        ? [weather.current.temperature * 1.8 + 32, ...(searches?.map(s => s.temperature_f) ?? [])]
        : searches?.map(s => s.temperature_f) ?? [];

      setChartData({
        labels,
        datasets: [
          {
            label: 'Temperature (°F)',
            data: temps,
            backgroundColor: 'rgba(75,192,192,0.6)',
          },
        ],
      });
    };

    buildChartData();
  }, [weather]);

  if (!chartData) return null;

  return (
    <div className="chart-container" style={{ maxWidth: 700, margin: '2rem auto' }}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Recent City Temperatures' },
            tooltip: { enabled: true },
          },
        }}
      />
    </div>
  );
};

export default WeatherChart;
