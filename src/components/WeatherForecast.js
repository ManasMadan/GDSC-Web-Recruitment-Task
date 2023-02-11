import React, { useEffect, useState } from "react";
import styles from "@/styles/WeatherForecast.module.css";
import Image from "next/image";
import { sampleWeatherForecast } from "@/methods/sampleData";

const ForeCastComponent = ({
  date,
  icon,
  iconAlt,
  temperature,
  unitsMetric,
}) => {
  return (
    <div className={styles["forecast-component-container"]}>
      <h6>{date}</h6>
      <Image
        src={`/weather-icons/${icon}.webp`}
        width="75"
        height="75"
        alt={iconAlt}
        style={{ objectFit: "contain" }}
        objectFit="contain"
      />
      <h5>
        {temperature}&#176;{unitsMetric ? "C" : "F"}
      </h5>
    </div>
  );
};

export default function WeatherForecast({ location, unitsMetric }) {
  const [weatherForecast, setWeatherForecast] = useState(
    sampleWeatherForecast.list
  );

  const getForecastData = async () => {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?units=${
        unitsMetric ? "metric" : "imperial"
      }&lat=${location[0]}&lon=${location[1]}&appid=${
        process.env.NEXT_PUBLIC_API_KEY
      }`
    );
    if (result.status == 200) {
      const data = await result.json();
      setWeatherForecast(data.list);
      localStorage.setItem("lastWeatherForecast", JSON.stringify(data.list));
    } else {
      const lastWeatherForecast = JSON.parse(
        localStorage.getItem("lastWeatherForecast")
      );
      if (lastWeatherForecast) {
        setWeatherForecast(lastWeatherForecast);
      } else {
        alert("API Limit Exhausted");
      }
    }
  };

  useEffect(() => {
    getForecastData();
  }, [location, unitsMetric]);

  return (
    <div>
      <h3 className={styles["FiveDayForecast-Text"]}>5 Day forecast</h3>
      <div className={styles["forecast-container"]}>
        {weatherForecast.map((data, index) => (
          <ForeCastComponent
            key={index}
            date={data["dt_txt"]}
            icon={data["weather"][0]["icon"]}
            iconAlt={data["weather"][0]["description"]}
            temperature={data["main"]["temp"]}
            unitsMetric={unitsMetric}
          />
        ))}
      </div>
    </div>
  );
}
