import React, {useContext} from 'react'
import { CountryContext } from '../Contexts/CountryContext'
import '../table.css';

function Table() {
    const {tableData} = useContext(CountryContext);
    return (
        <div className="table">
            {
                tableData.map(({country, cases})=>(
                        <tr key={Math.random()}>
                            <td>{country}</td>
                            <td>{cases}</td>
                        </tr>
                    ))
            }
        </div>
                    
    )
}

export default Table
