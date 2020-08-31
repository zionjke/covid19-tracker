import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {api} from "./dal/api";

function App() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getCountries = async () => {
      await api.allCountriesData().then(data => {
        const countries = data.map(country => ({
          name: country.country,
          value: country.countryInfo.iso2
        }))
        setCountries(countries)
      })
    }
    getCountries()
  }, [])
  return (
      <div className="app">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant='outlined' value='abc'>
              {
                countries.map((country, index) => (
                    <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                ))
              }
              {/*<MenuItem value='worldwide'>Worldwide</MenuItem>*/}
              {/*<MenuItem value='worldwide'>Worldwide</MenuItem>*/}
              {/*<MenuItem value='worldwide'>Worldwide</MenuItem>*/}
              {/*<MenuItem value='worldwide'>Worldwide</MenuItem>*/}
            </Select>
          </FormControl>
        </div>
      </div>
  );
}

export default App;
