import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [countriesSearch, setCountriesSearch] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const [filteredData,setFilteredData] = useState([]);
  const fetchData = () => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((response) => response.json())
      .then((result) => {
        setCountriesData(result.data)
        setFilteredData(result.data)
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    setCountriesSearch()
  },[countriesSearch]);

  const Handlechange = (event) => {
    setCountriesSearch(event.target.value);
  };
  return (
    <div className="App">
      <div>
        <input
          placeholder="Search"
          onChange={Handlechange}
          className="w-[567px] h-[80px] border border-gray-300 rounded-[40px]"
        />
      </div>
      <div>
        {countriesData.map((country,index)=>{
          return <div key={index} >{country.country}</div>
        })}
      </div>
    </div>
  );
}

export default App;
