import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { fetchDataFromApi } from "../utils/api";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectCategories, setSelectCategories] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetchSelectedCategoryData(selectCategories);
  }, [selectCategories]);

  const fetchSelectedCategoryData = (query) => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${query}`)
      .then(({contents}) => {
        console.log(contents);
        setSearchResults(contents)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        mobileMenu,
        setMobileMenu,
        selectCategories,
        setSelectCategories,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </Context.Provider>
  );
};
