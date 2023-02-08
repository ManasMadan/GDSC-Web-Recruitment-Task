import { getGradientColor, shadeColor } from "@/methods/colorMethods";
import styles from "@/styles/Home.module.css";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";

const weatherConditions = [
  "Clouds",
  "Clear",
  "Tornado",
  "Squall",
  "Ash",
  "Dust",
  "Sand",
  "Fog",
  "Haze",
  "Smoke",
  "Snow",
  "Mist",
  "Rain",
  "Drizzle",
  "Thunderstorm",
];

export default function Home({ data }) {
  const [gradientColor, setGradienColor] = useState(
    getGradientColor(weatherConditions[1])
  );

  useEffect(() => {
    setGradienColor(getGradientColor(weatherConditions[1]));
  }, [data]);

  return (
    <main
      className={styles.main}
      style={{
        background: `linear-gradient(to bottom, white 10%, ${gradientColor})`,
      }}
    >
      <SearchBar color={shadeColor(gradientColor, -10)} />
    </main>
  );
}
