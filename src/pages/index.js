import { getGradientColor, shadeColor } from "@/methods/colorMethods";
import styles from "@/styles/Home.module.css";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { sampleCurrentWeatherData } from "@/methods/sampleData";

export default function Home() {
  const [gradientColor, setGradienColor] = useState(
    getGradientColor(sampleCurrentWeatherData["weather"]["main"])
  );
  const [location, setLocation] = useState([0, 0]);
  const [currentWeatherData, setCurrentWeatherData] = useState(
    sampleCurrentWeatherData
  );

  const getWeatherData = async () => {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=${process.env.NEXT_PUBlIC_API_KEY}`
    );
    const data = await result.json();
    if (data.cod == 200) {
      setCurrentWeatherData(data);
    } else {
      alert("API Limit Exhausted");
    }
  };
  useEffect(() => {
    getWeatherData();
  }, [location]);
  useEffect(() => {
    setGradienColor(getGradientColor(currentWeatherData["weather"]["main"]));
  }, [currentWeatherData]);

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
