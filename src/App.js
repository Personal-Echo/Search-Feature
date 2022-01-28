import './App.css';
import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      filteredData1: [],
      filteredData2: [],
      selectedSearch: [],
      sValue1: [],
      sValue2: [],
      sValue3: []      
    };
  }

  /*loadOptions (query) {
    return fetch(`http://localhost:3000/collabs?q=${query}`)
    .then((res) => res.json());
  };*/

  handleSearch(event) {
    let value = event.author;
    let result = [];

     this.setState({ sValue1: event }, () => 
      console.log(this.state.sValue1)
    );

    console.log(value);
    result = this.state.allData.filter((data) => {
      return data.author.search(value) !== -1;
    });

    this.setState({ filteredData1: result }, () =>
      console.log(this.state.filteredData1)
    );

    this.setState({ filteredData2: [] });
    this.setState({ selectedSearch: result });

    this.setState({ sValue2: null })
    this.setState({ sValue3: null })
  }

  setID(event) {
    let value = event.id;
    let result = [];   
    this.setState({sValue2: event}, () => 
      console.log(this.state.sValue2)
    );

    result = this.state.filteredData1.filter((data) => {
      return data.author.search(value) && data.id.search(value) !== -1;
    });
    console.log(result);
    this.setState({ filteredData2: result }, () =>
      console.log(this.state.filteredData2)
    );
    this.setState({ selectedSearch: result });
  }

  setURL (event) {
    // let value = event.target.value;
    // console.log(value)

    // this.setState({selectedSearch: this.state.filteredData2}, () => 
    // console.log(this.state.selectedSearch)
    // )

    this.setState({sValue3: event}, () => 
      console.log(this.state.sValue2)
    );
  }

  resetValue() {
    this.setState({ filteredData1: [] });
    this.setState({ filteredData2: [] });
    this.setState({ selectedSearch: [] });
    this.setState({ sValue1: [] });
    this.setState({ sValue2: [] });
    this.setState({ sValue3: [] });

  }

  searchResults() {
    var divText = document.getElementById("searchContent").innerHTML;
    var myWindow = window.open("", "", "width=400,height=300");
    var doc = myWindow.document;
    doc.open();
    doc.write(divText);
    doc.close();
  }

  componentDidMount() {
    axios
      .get("https://picsum.photos/v2/list?limit=2000")
      .then((res) => {
        console.log(res.data);

        this.setState({
          allData: res.data,
          //filteredData1: [],
          //filteredData2: [],
          //selectedSearch: []
        });
        document.getElementById("searchContent").style.display = "none";
      })
      .catch((error) => {
        console.log("Error getting data: " + error);
      });
  }

  render() {
    return (
      <div className="float-container">
        <div className="float-child-left">
          <label>Search Author</label>
          <br></br>
          <br></br>
          <br></br>
          <hr />
          <label htmlFor="authorname">Name</label>
          <br></br>
          <br></br>      
          <Select
            id="authorname"
            value={this.state.sValue1}
            options={this.state.allData}
            getOptionLabel={(option) => option.author}
            getOptionValue={(option) => option.id}
            onChange={(event) => this.handleSearch(event)}
            ref={ref => { this.select = ref; }}
            isSearchable  
          />
  
          <br></br>
          <br></br>
          <label htmlFor="authorid">ID</label>
          <br></br>
          <br></br>
          <Select
            id="authorid"
            value={this.state.sValue2}
            setOptionLabel={(option) => option.id}
            options={this.state.filteredData1}
            getOptionLabel={(option) => option.id}
            getOptionValue={(option) => option.id}
            onChange={(event) => this.setID(event)}
            ref={ref => { this.select = ref; }}
            isSearchable
          />


          <br></br>
          <br></br>
          <label htmlFor="authorurl">URL</label>
          <br></br>
          <br></br>
          <Select
            id="authorimageurl"
            value={this.state.sValue3}
            setOptionLabel={(option) => option.id}
            options={this.state.filteredData2}
            getOptionLabel={(option) => option.url}
            getOptionValue={(option) => option.id}
            onChange={(event) => this.setURL(event)}
            ref={ref => { this.select = ref; }}
            isSearchable
          />

          <br></br>
          <br></br>
          <button onClick={() => this.resetValue()}>Reset</button>
          <button id="searchbtn" onClick={() => this.searchResults()}>
            Search
          </button>
        </div>

        <div id="searchContent">
          {this.state.selectedSearch.map((value) => {
            <br></br>;
            return (
              <div>
                Author Name: {value.author}
                <br></br>
                ID: {value.id}
                <br></br>
                Image Height: {value.height}
                <br></br>
                Image Download Link: {value.download_url} <br></br>
                <br></br>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default App;