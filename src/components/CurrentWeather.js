import React from "react";
import styles from "@/styles/CurrentWeather.module.css";

export default function CurrentWeather({
  currentWeatherData,
  unitsMetric,
  setUnitsMetric,
}) {
  return (
    <div className={styles["current-weather-container"]}>
      {currentWeatherData["name"]}
    </div>
  );
}
