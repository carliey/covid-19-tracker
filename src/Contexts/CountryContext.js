import React, { createContext, useState } from 'react';

export const CountryContext = createContext();

const CountryContextProvider = (props) => {
    const [countryData, setCountryData] = useState({});
    const [tableData, setTableData] = useState([])
    return (
            <CountryContext.Provider value={{countryData, setCountryData, tableData, setTableData}}>
                {props.children}
            </CountryContext.Provider>
    );
}

export default CountryContextProvider;
