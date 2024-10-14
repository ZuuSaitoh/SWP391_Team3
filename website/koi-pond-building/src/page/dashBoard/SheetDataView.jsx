import React, { useState, useEffect } from 'react';
import './dashBoard.css';

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

        const headers = result.values[0];
        const rows = result.values.slice(1);
        
        const parsedData = rows.map(row => {
          return headers.reduce((obj, header, index) => {
            obj[header] = row[index] || '';
            return obj;
          }, {});
        });

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="loading">Đang tải<span className="loading-dots"></span></div>;
  if (error) return <div className="error">Lỗi: {error}</div>;
  if (data.length === 0) return <div className="no-data">Không có dữ liệu</div>;

  return (
    <div className="sheet-data-container">
      <h1 className="sheet-title">Đăng kí báo giá thiết kế hồ cá Koi</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="table-container">
        <table className="sheet-table">
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Email</th>
              <th>Thông tin dự án</th>
              <th>Thông tin khách hàng</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="time-cell">{row['Timestamp']}</td>
                <td className="email-cell">{row['Email address']}</td>
                <td className="project-info-cell">
                  <div className="info-box">
                    <p><strong>Vị trí:</strong> {row['Vị trí dự án']}</p>
                    <p><strong>Diện tích:</strong> {row['Diện tích xây dựng hồ koi ở dự kiến'] || row['Diện tích xây dựng hồ koi ở dự kiến '] || 'Không có thông tin'}</p>
                    <p><strong>Phong cách:</strong> {row['Bạn muốn thiết kế nhà theo phong cách nào?']}</p>
                    <p><strong>Giai đoạn:</strong> {row['Giai đoạn cần thiết kế?*']}</p>
                  </div>
                </td>
                <td className="customer-info-cell">
                  <div className="info-box">
                    <p><strong>Tên:</strong> {row['Tên bạn*']}</p>
                    <p><strong>SĐT:</strong> {row['Số điện thoại*']}</p>
                    <p><strong>Cách liên hệ:</strong> {row['Cách liên hệ*']}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SheetDataViewComponent;
