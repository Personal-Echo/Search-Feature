//import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
//import { Stack } from '@fluentui/react/lib/Stack';
//import { Dropdown, DefaultButton } from '@fluentui/react/lib';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      filteredData: [],
      filteredData1: []
    }
  }

  handleSearch (event) {
    let value = event.target.value;
    let result = [];
  
    console.log(value);

    result = this.state.allData.filter((data) => {
      return data.author.search(value) !== -1 
    });

    this.setState({filteredData: result}, () => 
            console.log(this.state.filteredData)
    )

    this.setState ({filteredData1: []})
  }

  setID (event) {
    let value = event.target.value;
    let resulturl = [];

    resulturl = this.state.filteredData.filter((data) => {
      return (data.author.search(value) && data.id.search(value) !== -1)
    })
    console.log(resulturl)
    this.setState({filteredData1: resulturl}, () =>
      console.log(this.state.filteredData1)    
    )
  }

  setURL (event) {
    let valueURL = event.target.value;
    console.log(valueURL)
  } 

  resetValue () {
    this.setState ({filteredData: []})
    this.setState ({filteredData1: []})
  
    document.getElementById("authorname").selectedIndex = 0; //1 = option 2  
  }

  componentDidMount() {
    axios.get('https://picsum.photos/v2/list?limit=2000')
    .then(res => {
    console.log(res.data)

    this.setState({
      allData: res.data,
      filteredData: [],
      filteredData1: []
    });
    })
    .catch(error => {
      console.log('Error getting data: ' + error);
    })            
}

  render() {
    return (      
        <div className='float-container'>
          <div className='float-child-left'>
            <label>Search Author:   </label>      
            
            <br></br>    
            <select id='authorname' onChange={(event) => this.handleSearch(event)} >
              <option>select name</option>
              {this.state.allData.map((value, index) => { 
                return(
                  <option key={value.id} value={value.author}>
                    {value.author}
                  </option>
                )
              })}
            </select>  
          
            <br></br>
            <select id='authorid' onChange={(event) => this.setID(event)}>
              <option>select id</option>
              {this.state.filteredData.map((value,index)=>{
                return(        
                    <option key={value.id}>
                      {value.id}
                    </option>        
                )
              })}
            </select>

            <br></br>
            <select id='authorurl' onChange={(event) => this.setURL(event)}>
              <option>select url</option>
              {this.state.filteredData1.map((value,index)=>{
                return(        
                    <option key={value.id}>
                      {value.url}
                    </option>        
                )
              })}
            </select>

            <br></br>
            <br></br>
            <button onClick={() => this.resetValue()}>Reset</button>

          </div>
        </div>      
    );
  }  
}
export default App;
