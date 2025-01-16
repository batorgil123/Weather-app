import "./App.css";
import { useEffect, useState, useCallback } from "react";
import sun from "./img/icon.png";
import moon from "./img/icon (1).png";
import { ReactComponent as Local_logo1 } from "./img/localization_icon (1).svg";
import { ReactComponent as Local_logo2 } from "./img/localization_icon.svg";
import search from "./img/search.png";

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
      <div className=" w-screen h-screen flex flex-row rounded-[30px] ">
        <div className="bg-gray-300 w-2/4 h-screen rounded-[30px] flex justify-center">
          <div className="absolute ml-[5%] mt-[5%]">
            <img className="w-[48px] h-[48px] absolute ml-[10px] mt-[15px]" src={search} />
            <input
              placeholder="Search"
              onChange={handleChange}
              className="pl-20 w-[512px] h-[80px] rounded-[40px] font-sans text-2xl text-left text-[40px]"
            />

            <div className="bg-white border rounded-[40px]">
              {countriesSearch.length > 0 &&
                filteredData.map((city, index) => (
                  <div className="py-[10px] px-[20px] text-[25px]" key={index}>
                    {city}
                  </div>
                ))}
            </div>
          </div>
          <div className="w-[414px] h-[828px] bg-white rounded-[48px] mt-[30%] flex flex-col items-center justify-around">
            <p className="text-black text-[50px] ml-[10%]  font-sans font-bold tracking-[5px] flex flex-row justify-between w-[350px] p-0 items-center">
              City <Local_logo1 />
            </p>

            <img className="w-[262px] h-[262px]" src={sun} />

            <div className="flex flex-col justify-start w-[70%]">
              <div className="text-[120px] font-[800] bg-gradient-to-t from-gray-300 to-black bg-clip-text text-transparent">
                12
              </div>
              <div>Stats</div>
            </div>
          </div>
        </div>
        <div className="bg-black w-2/4 h-screen rounded-[30px] flex justify-center">
          <div className="w-[414px] h-[828px] bg-gray-800  rounded-[48px] mt-[30%] flex flex-col items-center justify-around">
            <p className="text-white text-[50px] ml-[10%]  font-sans font-bold tracking-[5px] flex flex-row justify-between w-[350px] p-0 items-center">
              City <Local_logo2 />
            </p>

            <img className="w-[262px] h-[262px]" src={moon} />
            <div className="flex flex-col justify-start w-[70%]">
              <div className="text-[120px] font-[800] bg-gradient-to-b from-gray-300 to-black bg-clip-text text-transparent">
                12
              </div>
              <div>Stats</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
