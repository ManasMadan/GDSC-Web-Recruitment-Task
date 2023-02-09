import React, { useEffect, useState } from "react";
import styles from "@/styles/SearchBar.module.css";
import useDebounce from "@/hooks/useDebounce";
const SearchReults = React.lazy(() => import("@/components/SearchReults"));

export default function SearchBar({ setLocation }) {
  const [typing, setTyping] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

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

  return (
    <nav
      className={typing ? styles["searchbar-expanded"] : styles["searchbar"]}
    >
      <input
        type="text"
        onChange={(e) => {
          if (e.target.value.trim().length) {
            setQuery(e.target.value.trim());
          } else {
            setQuery("");
          }
        }}
        placeholder="Search City..."
        className={styles["searchbar-input"]}
      />
      {debouncedQuery && typing ? (
        <SearchReults
          query={debouncedQuery}
          handleSearchResultClick={handleSearchResultClick}
        />
      ) : null}
    </nav>
  );
}
