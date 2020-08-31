import React, {useEffect, useState} from 'react';
import './App.scss';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {api} from "./dal/api";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');

  const onCountryChange = (e) => {
      setCountry(e.target.value)
  }

  useEffect(() => {
    const getCountries = async () => {
      const data = await api.allCountriesData()
        const countries = data.map(country => ({
          name: country.country,
          value: country.countryInfo.iso2
        }))
        setCountries(countries)
    }
    getCountries()
  }, [])

  return (
      <div className="app">
          <div className="app__left">
              <div className="app__header">
                  <h1>COVID-19 TRACKER</h1>
                  <FormControl className="app__dropdown">
                      <Select onChange={onCountryChange} variant='outlined' value={country}>
                          <MenuItem value={country}>{country}</MenuItem>
                          {
                              countries.map((country, index) => (
                                  <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                              ))
                          }

                      </Select>
                  </FormControl>
              </div>
              <div className="app__stats">
                  <InfoBox title="Coronavirus cases" total={2000} cases={1200040}/>
                  <InfoBox title="Recovered" total={1000} cases={36262}/>
                  <InfoBox title="Deaths" total={78} cases={663460}/>
              </div>
              <Map/>
          </div>
        <Card className="app__right">
            <CardContent>
                <h3>Live Cases by Country</h3>
                <h3>Worldwide new cases</h3>
            </CardContent>
        </Card>
      </div>
  );
}

export default App;

