import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [allData,setAllData] = useState([]);
  const [filteredData,setFilteredData] = useState(allData);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];

    console.log(value);
    
    result = allData.filter((data) => {
      return data.author.search(value) != -1;
    });
    setFilteredData(result);
  }

  useEffect(() => {
    axios('https://picsum.photos/v2/list')
    .then(response => {
    console.log(response.data)
    setAllData(response.data);
    setFilteredData(response.data);
    })
    .catch(error => {
    console.log('Error getting data: ' + error);
    })
    }, []);

  const styles = { display:'inline', width:'30%', height:50, float:'left', padding:5, border:'0.5px solid black', marginBottom:10, marginRight:10}
return (
  <div className="App">
    <div style={{ margin: '0 auto', marginTop: '10%' }}>
      <label>Search:   </label>
      
      <select id="loc" onChange={(event) => handleSearch(event)}>
      <option value="">select value</option>
      <option>aa</option>
      <option>ris</option>
      <option>vel</option>
    </select>
    </div>
    
    <div style={{padding:10}}>
      {filteredData.map((value,index)=>{
      return(
        <div>
          <div style={styles} key={value.id}>
            {value.author}
          </div>
        </div>
      )
      })}
    </div>
</div>
  );
}

export default App;
