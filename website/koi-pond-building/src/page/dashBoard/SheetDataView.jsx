import React, { useState, useEffect } from 'react';
import './sheetDataView.css'; // Make sure to create this separate CSS file

const SPREADSHEET_ID = '1xH6rs-E5hlLYisTPgNztpu52mmYDyWUgJnHhnphC5fw';
const SHEET_NAME = 'Form Responses 2'; 
const API_KEY = 'AIzaSyAIYS7nOlYpkttlBhA84pllh2lJtkQwyDc'; 

const SheetDataViewComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!result.values || result.values.length === 0) {
          throw new Error('No data received from the API');
        }

        const [headers, ...rows] = result.values;
        
        const parsedData = rows.map(row => headers.reduce((obj, header, index) => {
          obj[header] = row[index] || '';
          return obj;
        }, {}));

        setData(parsedData);
      } catch (e) {
        console.error('Fetch error:', e);
        setError(`Error fetching data: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return <div className="loading">Loading<span className="loading-dots"></span></div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (data.length === 0) return <div className="no-data">No data available</div>;

  const formatStages = (stagesString) => {
    const stages = stagesString.split(',').map(stage => stage.trim());
    return stages.map((stage, index) => (
      <div key={index} className="stage-item">{stage}</div>
    ));
  };

  return (
    <div className="sheet-data-container">
      <h2 className="main-title">Koi Pond Quote Requests</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search requests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="table-container">
        <table className="sheet-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Email</th>
              <th>Project Info</th>
              <th>Customer Info</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, index) => (
              <tr key={index}>
                <td>{row['Timestamp']}</td>
                <td>{row['Email address']}</td>
                <td>
                  <div className="info-group">
                    <span className="info-label">Location:</span> {row['Project location ']}
                  </div>
                  <div className="info-group">
                    <span className="info-label">Area:</span> {row['Estimated construction area for the Koi pond '] || 'N/A'}
                  </div>
                  <div className="info-group">
                    <span className="info-label">Style:</span> {row['What style would you like for your house design? ']}
                  </div>
                  <div className="info-group">
                    <span className="info-label">Stage:</span>
                    <div className="stages-container">
                      {formatStages(row['Stage that needs designing? '])}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="info-group">
                    <span className="info-label">Name:</span> {row['Your name ']}
                  </div>
                  <div className="info-group">
                    <span className="info-label">Phone:</span> {row['Phone number ']}
                  </div>
                  <div className="info-group">
                    <span className="info-label">Contact:</span> {row['Contact method ']}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SheetDataViewComponent;
