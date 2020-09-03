import * as React from 'react';
import '../scss/Table.scss'


const Table = ({countries}) => {
    return (
        <div className='table'>
            {
                countries.map((country, index) => (
                    <tr key={index}>
                        <td>{country.country}</td>
                        <td><strong>{country.cases}</strong></td>
                    </tr>
                ))}
        </div>
    );
};

export default Table