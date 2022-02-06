import React, { useState } from "react";
import styles from "./SearchBar.module.scss";

export const SearchBar: React.VFC = () => {
  const [searchBarValue, setSearchBarValue] = useState("");

  return (
    <div className={styles.inputContainer}>
      <input
        value={searchBarValue}
        onChange={(e) => setSearchBarValue(e.target.value)}
        className={styles.inputField}
      />
    </div>
  );
};
