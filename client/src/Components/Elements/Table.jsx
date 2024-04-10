import React, { useState } from "react";
import InputText from "./InputText";
import "../../css/table.css";

export default function Table({ tableData, pageTitle }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const data = tableData || [];
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  if (!sortConfig.key && columns.length > 0) {
    setSortConfig({
      key: columns[0],
      direction: "ascending",
    });
  }

  const sortBy = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        (typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof value === "number" && value.toString().includes(searchTerm))
    )
  );

  filteredData.sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <>
      <div className="table-title">
        <h1 className="text-size-6 text-weight-semibold text-style-neutral">
          {pageTitle}
        </h1>
        <InputText
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  onClick={() => sortBy(column)}
                  style={
                    index === 0
                      ? { width: "38px" }
                      : { width: index === 1 ? "164px" : null }
                  }
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td className="no-results" colSpan={columns.length}>
                  No results. Try search something else.
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={index}>
                  {columns.map((column, columnIndex) => (
                    <td key={columnIndex}>{item[column]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
