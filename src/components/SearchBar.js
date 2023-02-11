import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/SearchBar.module.css";
import useDebounce from "@/hooks/useDebounce";
const SearchReults = React.lazy(() => import("@/components/SearchReults"));

export default function SearchBar({ setLocation }) {
  const [typing, setTyping] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const ref = useRef(null);

  const handleSearchResultClick = (location) => {
    setQuery("");
    setTyping(false);
    setLocation(location);
  };

  useEffect(() => {
    if (debouncedQuery && query.trim().length) {
      setTyping(true);
    } else {
      setTyping(false);
    }
  }, [debouncedQuery, query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setTyping(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        setLocation([position.coords.latitude, position.coords.longitude])
      );
    }
  };

  return (
    <nav
      className={`${typing ? styles["searchbar-expanded"] : ""} ${
        styles["searchbar"]
      }`}
      ref={ref}
    >
      <div className={styles["searchbar-input"]}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            if (e.target.value.trim().length) {
              setQuery(e.target.value);
            } else {
              setQuery("");
            }
          }}
          placeholder="Search City..."
        />
        <button onClick={detectLocation}>DETECT LOCATION</button>
      </div>

      {debouncedQuery && typing ? (
        <SearchReults
          query={debouncedQuery}
          handleSearchResultClick={handleSearchResultClick}
        />
      ) : null}
    </nav>
  );
}
