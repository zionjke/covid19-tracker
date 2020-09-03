import axios from 'axios'

const instanse = axios.create({
    baseURL: "https://disease.sh/v3/covid-19/"
})



export const api = {
    allCountriesData() {
        return instanse.get('countries').then(r => r.data)
    },

    countriesData(countryCode) {
        return instanse.get(countryCode).then(r => r.data)
    },

    allCountriesInfo() {
        return instanse.get('all').then(r => r.data)
    },

    historyData() {
        return  instanse.get('historical/all?lastdays=120').then(r => r.data)
    }

}