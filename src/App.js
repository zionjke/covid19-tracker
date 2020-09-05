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
import {prettyPrintStat, sortData} from "./utils/utils";
import Linegraph from "./components/Linegraph";
import "leaflet/dist/leaflet.css"

function App() {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({lat:50.450001, lng:30.523333});
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");

    const onCountryChange = async (e) => {
        const url = e.target.value === 'worldwide'
            ? 'all'
            : `countries/${e.target.value}`

        const data = await api.countriesData(url)
        setCountry(e.target.value)
        setCountryInfo(data)
        setMapCenter([data.countryInfo.lat,data.countryInfo.long])
        setMapZoom(4)
    }
    console.log(country)

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
            setMapCountries(data)
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
                    <InfoBox active={casesType === 'cases'}
                             isRed
                             onClick={ e => setCasesType("cases")}
                             title="Coronavirus cases"
                             total={countryInfo.cases}
                             cases={prettyPrintStat(countryInfo.todayCases)}/>
                    <InfoBox active={casesType === 'recovered'}
                             onClick={ e => setCasesType("recovered")}
                             title="Recovered"
                             total={countryInfo.recovered}
                             cases={prettyPrintStat(countryInfo.todayRecovered)}/>
                    <InfoBox active={casesType === 'deaths'}
                             isRed
                             onClick={ e => setCasesType("deaths")}
                             title="Deaths"
                             total={countryInfo.deaths}
                             cases={prettyPrintStat(countryInfo.todayDeaths)}/>
                </div>
                <Map center={mapCenter}
                     casesType={casesType}
                     countries={mapCountries}
                     zoom={mapZoom}/>
            </div>
            <Card className="app__right">
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableData}/>
                    <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
                        <Linegraph className="app__graph" casesType={casesType}/>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;

