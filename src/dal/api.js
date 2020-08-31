import axios from 'axios'

const instanse = axios.create({
    baseURL: "https://disease.sh/v3/covid-19/"
})



export const api = {
    allCountriesData() {
        return instanse.get('countries').then(r => r.data)
    }
}