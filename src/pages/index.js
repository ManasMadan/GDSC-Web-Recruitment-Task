import styles from "@/styles/Home.module.css";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { sampleCurrentWeatherData } from "@/methods/sampleData";
import CurrentWeather from "@/components/CurrentWeather";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [currentWeatherData, setCurrentWeatherData] = useState(
    sampleCurrentWeatherData
  );
  const [unitsMetric, setUnitsMetric] = useState(1);

  const getWeatherData = async () => {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=${
        unitsMetric ? "metric" : "imperial"
      }&lat=${location[0]}&lon=${location[1]}&appid=${
        process.env.NEXT_PUBLIC_API_KEY
      }`
    );
    if (result.status == 200) {
      const data = await result.json();
      setCurrentWeatherData(data);
      localStorage.setItem("lastWeather", JSON.stringify(data));
      localStorage.setItem("lastWeatherUpdate", new Date());
    } else {
      const lastLocalWeather = JSON.parse(localStorage.getItem("lastWeather"));
      if (lastLocalWeather) {
        setCurrentWeatherData(lastLocalWeather);
      } else {
        alert("API Limit Exhausted");
      }
    }
  };

  useEffect(() => {
    const lastLocalWeather = JSON.parse(localStorage.getItem("lastWeather"));
    if (lastLocalWeather) {
      setCurrentWeatherData(lastLocalWeather);
    }
  }, []);
  useEffect(() => {
    if (location) {
      getWeatherData();
    }
  }, [location, unitsMetric]);

  return (
    <main
      className={styles.main}
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_HOST_NAME}/background-images/sunset.webp)`,
      }}
    >
      <SearchBar setLocation={setLocation} />
      <CurrentWeather
        currentWeatherData={currentWeatherData}
        unitsMetric={unitsMetric}
        setUnitsMetric={setUnitsMetric}
        location={location}
      />
    </main>
  );
}
