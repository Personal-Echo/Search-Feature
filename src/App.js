//import logo from './logo.svg';
import './App.css';
import React, { Component, useRef } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      filteredData1: [],
      filteredData2: [],
      selectedSearch: []
    }
    this.myRef = React.createRef();
  }

  handleSearch (event) {
    let value = event.target.value;
    let result1 = [];
  
    console.log(value);
    if(value==="select name"){
      
      this.setState ({filteredData1: []})
      this.setState ({filteredData2: []})
      this.setState ({selectedSearch: []})
    }
    
    result1 = this.state.allData.filter((data) => {
      return data.author.search(value) !== -1 
    });

    this.setState({filteredData1: result1}, () => 
            console.log(this.state.filteredData1)
    )

    this.setState ({filteredData2: []})
  }

  setID (event) {
    let value = event.target.value;
    let result2 = [];

    result2 = this.state.filteredData1.filter((data) => {
      return (data.author.search(value) && data.id.search(value) !== -1)
    })
    console.log(result2)
    this.setState({filteredData2: result2}, () =>
      console.log(this.state.filteredData2)    
    )
  }

  setURL (event) {
    let value = event.target.value;
    console.log(value);   
  } 

  resetValue () {
    this.setState ({filteredData1: []})
    this.setState ({filteredData2: []})
    this.setState ({selectedSearch: []})
    document.getElementById("authorname").selectedIndex = 0; //1 = option 2  
  }

  searchData (data) {
    this.setState({selectedSearch: this.state.filteredData2}, () =>
      console.log(this.state.selectedSearch)
    )


    let printElement = document.getElementById('#sresult');
    var printWindow = window.open('', 'PRINT');
    printWindow.document.write(document.documentElement.innerHTML);
    setTimeout(() => { // Needed for large documents
      printWindow.document.body.style.margin = '0 0';
      printWindow.document.body.innerHTML = printElement.outerHTML;
      printWindow.document.close(); // necessary for IE >= 10
      printWindow.focus(); // necessary for IE >= 10*/
      printWindow.print();
      printWindow.close();
    }, 1000)

 /*     // Getting user input
     var message = ("input[name=message]").val();
  
     // Opening URL
     window.open(
         "whatsapp://send?text=" + message,

         // This is what makes it 
         // open in a new window.
         '_blank' 
     ); */
 
    /* let val1 = this.state.filteredData2.map(obj => {
      return obj.author + "--" + obj.id +"--" + obj.download_url;
    })
    console.log(val1) */
  }

  componentDidMount() {
    axios.get('https://picsum.photos/v2/list?limit=2000')
    .then(res => {
    console.log(res.data)

    this.setState({
      allData: res.data,
      filteredData1: [],
      filteredData2: [],
      selectedSearch: []
    });
    })
    .catch(error => {
      console.log('Error getting data: ' + error);
    })            
}

  render() {   
    return (   
      <div className="App">
      <div className="row">

      <div className="column" >    
        <div className="float-child-left">
          <h4>Search Author</h4>
          <hr />
                
          <label htmlFor="authorname">Choose Name:</label>
          <br></br>
          <select id='authorname' onChange={(event) => this.handleSearch(event)} >
              <option>select name</option>
              {this.state.allData.map((value, index) => { 
                return(
                  <option key={value.id}>
                    {value.author}
                  </option>
                )
              })}
          </select>
          <br></br>
          <br></br><br></br>
          <label htmlFor="authorid">Choose ID:</label>
          <br></br>
          <select id='authorid' onChange={(event) => this.setID(event)}>
            <option>select id</option>
            {this.state.filteredData1.map((value,index)=>{
              return(        
                <option key={value.id}>
                  {value.id}
                </option>        
              )
            })}
          </select>
          <br></br><br></br><br></br>
          <label htmlFor="authorurl">Choose URL:</label>
          <br></br>
          <select id='authorurl' onChange={(event) => this.setURL(event)}>
            <option>select url</option>
            {this.state.filteredData2.map((value,index)=>{
              return(        
                <option key={value.id}>
                  {value.url}
                </option>        
              )
            })}
          </select>

          <br></br>
          <br></br>
          <br></br>
          <button onClick={() => this.resetValue()}>Reset</button>
          <hr />
          {this.state.selectedSearch.map((value,index)=>{
            return(              
                <div id='sresult' key={value.id}>
                  Author Name:  {value.author}<br></br>
                  Image width:  {value.width}<br></br>
                  Image Height: {value.height}<br></br>
                  Image URL:    {value.download_url}
                </div>             
            )
          })}    
          <button onClick={() => this.searchData(document.getElementById(#sresult))}>Search</button>
        </div>
        </div>

        <div className="column">
          <div className="float-child-right">
          <h4>Search Results</h4>      
          
          {this.state.filteredData1.map((value,index)=>{
            return(            
                <div key={value.id}>
                  {value.author}------{value.id}
                </div>              
            )
          })}
          <hr />
          {this.state.selectedSearch.map((value,index)=>{
            return(              
                <div id='sresult' key={value.id}>
                  Author Name:  {value.author}<br></br>
                  Image width:  {value.width}<br></br>
                  Image Height: {value.height}<br></br>
                  Image URL:    {value.download_url}
                </div>             
            )
          })}    
          
          </div>      
        </div>
        <div className="column" />
      </div>
      </div>
      
    );
  }  
}
export default App;
