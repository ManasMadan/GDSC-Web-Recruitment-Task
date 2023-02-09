import { getGradientColor, getShadeColor } from "@/methods/colorMethods";
import styles from "@/styles/Home.module.css";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { sampleCurrentWeatherData } from "@/methods/sampleData";
import CurrentWeather from "@/components/CurrentWeather";

export default function Home() {
  const [location, setLocation] = useState([0, 0]);
  const [currentWeatherData, setCurrentWeatherData] = useState(
    sampleCurrentWeatherData
  );
  const [unitsMetric, setUnitsMetric] = useState(0);

  const setGradientColor = (weather) => {
    const gradientColor = getGradientColor(weather);
    const shadeColor = getShadeColor(gradientColor, -10);
    const root = document.querySelector(":root");
    root.style.setProperty("--gradientColor", gradientColor);
    root.style.setProperty("--shadeColor", shadeColor);
  };
  const getWeatherData = async () => {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=${
        unitsMetric ? "metric" : "imperial"
      }&lat=${location[0]}&lon=${location[1]}&appid=${
        process.env.NEXT_PUBlIC_API_KEY
      }`
    );
    if (result.status == 200) {
      const data = await result.json();
      setCurrentWeatherData(data);
      setGradientColor(data["weather"][0]["main"]);
    } else {
      alert("API Limit Exhausted");
    }
  };
  useEffect(() => {
    getWeatherData();
  }, [location, unitsMetric]);

  return (
    <main className={styles.main}>
      <SearchBar setLocation={setLocation} />
      <CurrentWeather
        currentWeatherData={currentWeatherData}
        unitsMetric={unitsMetric}
        setUnitsMetric={setUnitsMetric}
      />
    </main>
  );
}
