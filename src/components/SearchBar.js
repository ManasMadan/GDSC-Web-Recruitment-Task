import React, { useEffect, useState } from "react";
import styles from "@/styles/SearchBar.module.css";
import useDebounce from "@/hooks/useDebounce";

export default function SearchBar({ color }) {
  const [typing, setTyping] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery && query.trim().length > 2) {
      setTyping(true);
    } else {
      setTyping(false);
    }
  }, [debouncedQuery, query]);

  useEffect(() => {
    // Get API Request
  }, [debouncedQuery]);

  return (
    <nav
      style={{ backgroundColor: color }}
      className={typing ? styles["searchbar-expanded"] : styles["searchbar"]}
    >
      <input
        type="text"
        onChange={(e) => {
          if (e.target.value.trim().length > 2) {
            setQuery(e.target.value.trim());
          } else {
            setQuery("");
          }
        }}
        placeholder="Search City..."
        className={styles["searchbar-input"]}
        style={{
          backgroundColor: color,
        }}
      />
    </nav>
  );
}
