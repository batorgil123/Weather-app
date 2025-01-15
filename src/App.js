import "./App.css";
import { useEffect, useState, useCallback } from "react";

function App() {
  const [countriesSearch, setCountriesSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [cities, setCities] = useState([]);

  const citiesFilter = (countries) => {
    return countries.flatMap((country) =>
      country.cities.map((city) => `${city}, ${country.country}`)
    );
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const result = await response.json();
      const countriesAndCities = citiesFilter(result.data);
      setCities(countriesAndCities);
      setFilteredData(countriesAndCities);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterData = useCallback(() => {
    const filtered = cities
      .filter((city) =>
        city.toLowerCase().startsWith(countriesSearch.toLowerCase())
      )
      .slice(0, 5);
    setFilteredData(filtered);
  }, [countriesSearch, cities]);

  useEffect(() => {
    filterData();
  }, [countriesSearch, filterData]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setCountriesSearch(event.target.value);
  };

  return (
    <div className="App">
      <div>
        <input
          placeholder="Search"
          onChange={handleChange}
          className="w-[567px] h-[80px] border border-gray-300 rounded-[40px]"
        />
      </div>
      <div>
        {countriesSearch.length > 0 &&
          filteredData.map((city, index) => <div key={index}>{city}</div>)}
      </div>
    </div>
  );
}

export default App;
