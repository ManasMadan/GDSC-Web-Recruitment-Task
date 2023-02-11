import React from "react";
import styles from "@/styles/CurrentWeather.module.css";
import Image from "next/image";
import WeatherForecast from "@/components/WeatherForecast";
const MapAccordingToLocation = ({ latitude, longitude }) => {
  return (
    <div className={styles["current-location-map-container"]}>
      <iframe
        title="Google Map Location"
        width="100%"
        height="200"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=13&output=embed`}
      />
    </div>
  );
};

export default function CurrentWeather({
  currentWeatherData,
  unitsMetric,
  setUnitsMetric,
  location,
}) {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const cityName = currentWeatherData["name"];
  const countryName = regionNames.of(currentWeatherData["sys"]["country"]);

  return (
    <div className={styles["container"]}>
      <div className={styles["current-weather-place-container"]}>
        <h3>
          {cityName}, {countryName}
        </h3>
      </div>
      <div className={styles["current-weather"]}>
        <div className={styles["current-weather-container"]}>
          <div
            className={styles["weather-unit-swap-icon"]}
            onClick={() => setUnitsMetric(!unitsMetric)}
            style={{ zIndex: 1, cursor: "pointer" }}
          >
            <Image
              src={`/icons/swap-icon.webp`}
              width="50"
              height="50"
              alt={currentWeatherData["weather"][0]["description"]}
            />
          </div>
          <div className={styles["weather-unit-swap-icon"]}>
            <Image
              src={`/icons/ellipse.png`}
              width="50"
              height="50"
              alt={currentWeatherData["weather"][0]["description"]}
            />
          </div>
          <div className={styles["current-weather-main-container"]}>
            <div className={styles["current-weather-icon-container"]}>
              <Image
                src={`/weather-icons/${currentWeatherData["weather"][0]["icon"]}.webp`}
                width="100"
                height="100"
                alt={currentWeatherData["weather"][0]["description"]}
                style={{ objectFit: "contain" }}
              />
              <h3>{currentWeatherData["weather"][0]["description"]}</h3>
            </div>
            <div className={styles["current-weather-data-container"]}>
              <div className={styles["current-weather-temperature"]}>
                <Image
                  src="/icons/thermometer.webp"
                  width="35"
                  height="70"
                  alt="thermometer-icon"
                  style={{ objectFit: "contain" }}
                />
                {currentWeatherData["main"]["temp"]}&#176;
                {unitsMetric ? "C" : "F"}
              </div>
              <div className={styles["current-weather-feels-like"]}>
                <p>{currentWeatherData["weather"][0]["main"]}</p>
                <Image src="/icons/dot.webp" width="5" height="5" alt="dot" />
                <p>
                  FEELS LIKE {currentWeatherData["main"]["feels_like"]}&#176;
                  {unitsMetric ? "C" : "F"}
                </p>
              </div>
              <div className={styles["current-weather-values-container"]}>
                <div
                  id={styles["min_temp"]}
                  className={styles["current-weather-icon-value-container"]}
                >
                  <p>
                    {currentWeatherData["main"]["temp_min"]}
                    &#176;
                    {unitsMetric ? "C" : "F"}
                  </p>
                  <Image
                    src="/icons/min-temp.webp"
                    width="20"
                    height="20"
                    alt="min-temp-icon"
                  />
                </div>
                <div
                  id={styles["max_temp"]}
                  className={styles["current-weather-icon-value-container"]}
                >
                  <p>
                    {currentWeatherData["main"]["temp_max"]}
                    &#176;
                    {unitsMetric ? "C" : "F"}
                  </p>
                  <Image
                    src="/icons/max-temp.webp"
                    width="20"
                    height="20"
                    alt="max-temp-icon"
                  />
                </div>
                <div className={styles["current-weather-icon-value-container"]}>
                  <p>{currentWeatherData["main"]["pressure"]} Pa</p>
                  <Image
                    src="/icons/atm-pressure.webp"
                    width="20"
                    height="20"
                    alt="atm-pressure-icon"
                  />
                </div>
                <div className={styles["current-weather-icon-value-container"]}>
                  <p>{currentWeatherData["main"]["humidity"]} %</p>
                  <Image
                    src="/icons/humidity.webp"
                    width="20"
                    height="20"
                    alt="humidity-icon"
                  />
                </div>
                <div className={styles["current-weather-icon-value-container"]}>
                  <p>
                    {currentWeatherData["wind"]["speed"]}{" "}
                    {unitsMetric ? "m/s" : "mph"}
                  </p>
                  <Image
                    src="/icons/wind-speed.webp"
                    width="20"
                    height="20"
                    alt="wind-speed-icon"
                  />
                </div>
                <div className={styles["current-weather-icon-value-container"]}>
                  <p>
                    {currentWeatherData["wind"]["deg"]}
                    &#176;
                  </p>
                  <Image
                    src="/icons/wind-direction.webp"
                    width="20"
                    height="20"
                    alt="wind-direction-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <MapAccordingToLocation
          latitude={currentWeatherData["coord"]["lat"]}
          longitude={currentWeatherData["coord"]["lon"]}
        />

        <WeatherForecast location={location} unitsMetric={unitsMetric} />
      </div>
    </div>
  );
}
