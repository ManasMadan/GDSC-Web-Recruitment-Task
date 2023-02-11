import React, { useEffect, useState } from "react";
import styles from "@/styles/SearchBar.module.css";
import Image from "next/image";
import { sampleSearchResults } from "@/methods/sampleData";

export default function SearchReults({ query, handleSearchResultClick }) {
  const SearchResult = ({ name, country, state, location }) => {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    const countryName = regionNames.of(country);
    let stateName = state ? " " + state + ", " : " ";
    const resultString = `${name},${stateName}${countryName}`;
    return (
      <div
        className={styles["searchbar-result"]}
        onClick={() => handleSearchResultClick(location)}
      >
        <Image
          src="/icons/location-icon.webp"
          width={16}
          height={16}
          alt="Map Pin Location"
        />
        <span>{resultString}</span>
      </div>
    );
  };
  const [results, setResults] = useState(sampleSearchResults);
  const [loading, setLoading] = useState(true);

  const getSearchResults = async () => {
    setLoading(true);
    const result = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?limit=5&q=${query}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
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
    } else {
      setResults([]);
    }
  }, [query]);

  if (loading) {
    return (
      <div className={styles["search-results-container"]}>
        <div className={styles["search-results-preloader"]}>
          <Image
            src="/icons/earth-preloader.webp"
            width={64}
            height={64}
            alt="Loading..."
          />
        </div>
      </div>
    );
  }
  if (!results.length) {
    return (
      <div className={styles["search-results-container"]}>
        <p className={styles["searchbar-no-results"]}>No Result Found</p>
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
