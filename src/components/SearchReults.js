import React, { useEffect, useState } from "react";
import styles from "@/styles/SearchBar.module.css";
import Image from "next/image";
import preloader from "@/images/earth_preloader.gif";
import locationImage from "@/images/location-icon.png";
import { sampleSearchResults } from "@/methods/sampleData";
export default function SearchReults({ query, handleSearchResultClick }) {
  const SearchResult = ({ name, country, state, location }) => {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    const countryName = regionNames.of(country);
    let stateName = state ? " " + state + ", " : " ";
    return (
      <div
        className={styles["searchbar-result"]}
        onClick={() => handleSearchResultClick(location)}
      >
        <Image
          src={locationImage}
          width={16}
          height={16}
          alt="Map Pin Location"
        />
        <span className={styles["searchbar-result-text"]}>
          {name},{stateName}
          {countryName}
        </span>
      </div>
    );
  };
  const [results, setResults] = useState(sampleSearchResults);
  const [loading, setLoading] = useState(true);

  const getSearchResults = async () => {
    setLoading(true);
    const result = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${process.env.NEXT_PUBlIC_API_KEY}`
    );
    if (result.status == 200) {
      const data = await result.json();
      setResults(data);
    } else {
      alert("API Limit Exhausted");
    }
    setLoading(false);
  };
  useEffect(() => {
    if (query.trim()) {
      getSearchResults();
      setTimeout(() => setLoading(false), 2000);
    } else {
      setResults([]);
    }
  }, [query]);

  if (loading) {
    return (
      <div className={styles["search-results-preloader"]}>
        <Image src={preloader} width={64} height={64} alt="Loading..." />
      </div>
    );
  }
  return (
    <div className={styles["search-results-container"]}>
      {results.map((result, index) => (
        <SearchResult
          key={index}
          name={result.name}
          state={result.state}
          country={result.country}
          location={[result.lat, result.lon]}
        />
      ))}
    </div>
  );
}
