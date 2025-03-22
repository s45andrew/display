import react from 'react';
import './table.css'
const Table = ({ data }) => {
    return (
        <table className='fullTable' style={{ borderCollapse: "collapse", width: "100%"}}>
            <thead>
                <tr>
                    {Object.keys(data[0]).map((key) => (
                        <th key={key} style={{ border: "1px solid red", padding: "8px"}}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.values(item).map((value, i) => (
                            <td key={i} style={{ border: "1px solid green",padding: "8px"}}>
                                {value}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

    );
};
export default Table;

