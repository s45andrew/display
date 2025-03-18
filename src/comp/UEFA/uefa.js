import React from "react";

const Uefa = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "20px",
        padding: "20px",
        backgroundColor: "#f4f4f9",
        color: "#333",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>
        Table Sorted by Coefficient 2026/27
      </h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          margin: "20px 0",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr>
            <th style={headerStyle}>position26/27 (27/28)</th>
            <th style={headerStyle}>country</th>
            <th style={headerStyle}>2019/20</th>
            <th style={headerStyle}>2020/21</th>
            <th style={headerStyle}>2021/22</th>
            <th style={headerStyle}>2022/23</th>
            <th style={headerStyle}>2023/24</th>
            <th style={headerStyle}>2024/25*</th>
            <th style={headerStyle}>Coefficient 2025/26</th>
            <th style={headerStyle}>Coefficient 2026/27</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cellStyle}>1(1)1(1)</td>
            <td style={cellStyle}>England</td>
            <td style={cellStyle}>18.571</td>
            <td style={cellStyle}>24.357</td>
            <td style={cellStyle}>21.000</td>
            <td style={cellStyle}>23.000</td>
            <td style={cellStyle}>17.375</td>
            <td style={cellStyle}>24.250</td>
            <td style={cellStyle}>104.303</td>
            <td style={cellStyle}>109.982</td>
          </tr>
          {/* Repeat rows here */}
        </tbody>
      </table>
    </div>
  );
};

// Style objects for cells and headers
const headerStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
  backgroundColor: "#4CAF50",
  color: "white",
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};

export default Uefa;
