import React, {useEffect, useState} from 'react';
import './scss/App.scss';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {api} from "./dal/api";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Table from "./components/Table";
import {sortData} from "./utils/utils";

function App() {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);

    const onCountryChange = async (e) => {
        const url = e.target.value === 'worldwide'
            ? 'all'
            : `countries/${e.target.value}`

        const countryInfo = await api.countriesData(url)
        setCountry(e.target.value)
        setCountryInfo(countryInfo)
    }

    useEffect(() => {
        api.allCountriesInfo().then(data => setCountryInfo(data))
    },[])

    useEffect(() => {
        const getCountries = async () => {
            const data = await api.allCountriesData()
            const countries = data.map(country => ({
                name: country.country,
                value: country.countryInfo.iso2
            }))

            const sortedData = sortData(data)
            setTableData(sortedData)
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
                            <MenuItem value='worldwide'>Worldwide</MenuItem>
                            {
                                countries.map((country, index) => (
                                    <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>
                </div>
                <div className="app__stats">
                    <InfoBox title="Coronavirus cases"
                             total={countryInfo.cases}
                             cases={countryInfo.todayCases}/>
                    <InfoBox title="Recovered"
                             total={countryInfo.recovered}
                             cases={countryInfo.todayRecovered}/>
                    <InfoBox title="Deaths"
                             total={countryInfo.deaths}
                             cases={countryInfo.todayDeaths}/>
                </div>
                <Map/>
            </div>
            <Card className="app__right">
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableData}/>
                    <h3>Worldwide new cases</h3>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;

