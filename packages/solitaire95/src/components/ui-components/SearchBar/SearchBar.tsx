import React from "react";
import styles from "./SearchBar.module.scss";

type SearchBarPropTypes = {
  ariaLabel?: string;
  onChange?: (e: React.SyntheticEvent) => void;
  searchBarValue?: string;
};

export const SearchBar: React.VFC<SearchBarPropTypes> = ({
  ariaLabel,
  onChange,
  searchBarValue,
}) => {
  return (
    <div className={styles.search__container}>
      <input
        value={searchBarValue}
        onChange={onChange}
        className={styles.search__input}
        aria-labelledby={ariaLabel}
      />
    </div>
  );
};
