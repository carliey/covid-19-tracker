import React, { useState, useEffect, useContext } from 'react';
import { CountryContext } from '../Contexts/CountryContext'
import { 
    FormControl,
    MenuItem,
    Select 
 } from '@material-ui/core'
import { sortData } from '../util';

const Header = () => {
    //set country data to global state
    const {setCountryData, setTableData} = useContext(CountryContext);
    //local states
    const [countries, setCountries] = useState([]);
    const [countryCode, setCountryCode] = useState("worldwide");
    
    useEffect(() => {
        //get countries on pageload
        const fetchCountries = async () =>{
            const res = await fetch('https://disease.sh/v3/covid-19/countries?yesterday=true');
            const data = await res.json();
                const countries = data.map((country)=>(
                    {
                        name: country.country,
                        value: country.countryInfo.iso2,
                        _id: country.countryInfo._id
                    }
                ))

                const sortedData = sortData(data);
                setCountries(countries);
                setTableData(sortedData);// from the raw data collected
            }
            
        const fetchWorldCases = async ()=>{
            //get cases of all countries
            const res = await fetch('https://disease.sh/v3/covid-19/all');
            const data = await res.json();
            setCountryData(data);
        }
        
        fetchWorldCases();
        fetchCountries();
    }, [setCountryData, setTableData])
    


    const handleSelect = async (e) =>{
        //get individual country data and set global state
        setCountryCode(e.target.value);
        //fetch the country data using ISO2
        const url = e.target.value === "worldwide" ?
         'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${e.target.value}`;
        let res = await fetch(url);
        let data = await res.json();
        setCountryData(data)
    }    

    return ( 
        <div className="header">
            <h1>Covid-19 Tracker</h1>

            <FormControl>
                <Select
               
                onChange={handleSelect}
                value={countryCode}
                >
                    <MenuItem value='worldwide'><em>Worldwide</em></MenuItem>
                    {
                        countries.map((country)=>(
                        <MenuItem value={country.value} key={Math.random()}>{country.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
     );
}
 
export default Header;