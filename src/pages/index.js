import { getGradientColor, shadeColor } from "@/methods/colorMethods";
import styles from "@/styles/Home.module.css";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { sampleCurrentWeatherData } from "@/methods/sampleData";

export default function Home() {
  const [gradientColor, setGradienColor] = useState(
    getGradientColor(sampleCurrentWeatherData["weather"][0]["main"])
  );
  const [location, setLocation] = useState([0, 0]);
  const [currentWeatherData, setCurrentWeatherData] = useState(
    sampleCurrentWeatherData
  );
  const [unitsMetric, setUnitsMetric] = useState(0);
  const getWeatherData = async () => {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=${
        unitsMetric ? "metric" : "imperial"
      }lat=${location[0]}&lon=${location[1]}&appid=${
        process.env.NEXT_PUBlIC_API_KEY
      }`
    );
    const data = await result.json();
    if (data.cod == 200) {
      setCurrentWeatherData(data);
      setGradienColor(getGradientColor(data["weather"][0]["main"]));
    } else {
      alert("API Limit Exhausted");
    }
  };
  useEffect(() => {
    getWeatherData();
  }, [location, unitsMetric]);

  return (
    <main
      className={styles.main}
      style={{
        background: `linear-gradient(to bottom, white 10%, ${gradientColor})`,
      }}
    >
      <SearchBar
        color={shadeColor(gradientColor, -10)}
        setLocation={setLocation}
      />
    </main>
  );
}
