import './App.css';
import { useContext } from 'react';
import Graph from './Components/Graph';
import Header from './Components/Header';
import InfoBox from './Components/InfoBox'
import Map from './Components/Map';
import CountryContextProvider from './Contexts/CountryContext';
import {CountryContext} from './Contexts/CountryContext';
import Table from './Components/Table';
import { Card, CardContent } from '@material-ui/core'


function App() {


  const Stats = () => {
    const {countryData} = useContext(CountryContext);
    return ( 
      <div className="stats">
        <InfoBox title="Corona virus cases" cases={countryData.todayCases} total={countryData.cases}/>
        <InfoBox title="Recovered" cases={countryData.todayRecovered} total={countryData.recovered}/>
        <InfoBox title="Deaths" cases={countryData.todayDeaths} total={countryData.deaths}/>
      </div>
     );
  }
  
  const LeftPane = () =>{
    return(
      <div className="leftPane">  
        <Header/>
        <Stats />
        <Map />
      </div>
    )
  }

  const RightPane = () =>{
    return(
      <div className="rightPane">
        <Card>
          <CardContent>
            <h3>Live cases by countries</h3>
            <Table/>
            <h3>World wide new cases</h3>
            <Graph />
          </CardContent>
        </Card>
        
      </div>
    )
  }


  return (
    <div className="App">
      <CountryContextProvider>
          <LeftPane />
          <RightPane />
      </CountryContextProvider>
    </div>

  );
}

export default App;
