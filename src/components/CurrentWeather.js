import React, { useState } from "react";
import styles from "@/styles/CurrentWeather.module.css";
import Image from "next/image";

export default function CurrentWeather({
  currentWeatherData,
  unitsMetric,
  setUnitsMetric,
}) {
  const [loading, setLoading] = useState(true);
  return (
    <div className={styles["current-weather-container"]}>
      <div className={styles["current-location-map-container"]}>
        {loading ? (
          <Image
            src="/icons/loading-spinner.webp"
            width={128}
            height={128}
            alt="Loading..."
          />
        ) : null}
        <iframe
          width="128"
          height="128"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          loading="lazy"
          onLoad={() => setLoading(false)}
          referrerpolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${currentWeatherData["coord"]["lat"]},${currentWeatherData["coord"]["lon"]}&z=13&output=embed`}
        />
      </div>

      <div className={styles["current-weather-top-container"]}>
        <h2>{currentWeatherData["name"]}</h2>
        <h2>{currentWeatherData["sys"]["country"]}</h2>
      </div>
    </div>
  );
}
