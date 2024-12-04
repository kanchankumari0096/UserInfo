import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Custom styles for the table
const tableStyle = {
  width: '80%',
  margin: '20px auto',
  borderCollapse: 'collapse',
  fontFamily: 'Arial, sans-serif',
};

const headerStyle = {
  backgroundColor: '#1976d2',
  color: 'white',
  textAlign: 'left',
  padding: '10px',
};

const cellStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

const rowStyle = {
  backgroundColor: '#f9f9f9',
};

const hoverStyle = {
  backgroundColor: '#f1f1f1',
};

function UserListTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  //API call to get the data
  useEffect(() => {
    axios
      .get('https://dummyjson.com/users')
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

//To handle the next button
  const handleNextPage = () => {
    if (page < Math.ceil(users.length / rowsPerPage) - 1) {
      setPage(page + 1);
    }
  };

// To handle the previous button
  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>; 

  return (
    <div style={{ overflowX: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>User Information</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>ID</th>
            <th style={headerStyle}>Name</th>
            <th style={headerStyle}>Email</th>
            <th style={headerStyle}>Username</th>
            <th style={headerStyle}>Phone</th>
            <th style={headerStyle}>City</th>
            <th style={headerStyle}>IP</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((user, index) => (
            <tr
              key={user.id}
              style={index % 2 === 0 ? rowStyle : null}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? rowStyle.backgroundColor : 'white')}
            >
              <td style={cellStyle}>{user.id}</td>
              <td style={cellStyle}>{`${user.firstName} ${user.lastName}`}</td>
              <td style={cellStyle}>{user.email}</td>
              <td style={cellStyle}>{user.username}</td>
              <td style={cellStyle}>{user.phone}</td>
              <td style={cellStyle}>{user.address.city}</td>
              <td style={cellStyle}>{user.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
        <button onClick={handlePrevPage} disabled={page === 0} style={buttonStyle}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {page + 1} of {Math.ceil(users.length / rowsPerPage)}
        </span>
        <button onClick={handleNextPage} disabled={(page + 1) * rowsPerPage >= users.length} style={buttonStyle}>
          Next
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  margin: '0 5px',
  backgroundColor: '#1976d2',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default UserListTable;
