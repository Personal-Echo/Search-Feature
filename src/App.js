//import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import { Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, TextField} from '@fluentui/react/lib';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allData: [],
      filteredData: [],
      firstTextFieldValue: [],
      country: null, 
      region: null,
      isActive: true,
      name: ""
      };          
    }
    
    handleSearch (event, selectedOption) {
      let value = selectedOption.text;
      let result = [];        
  
      console.log(selectedOption);

      result = this.state.allData.filter((data) =>
      {
        console.log(data.author.search(value))
        return data.author.search(value) !== -1 ? true : false;
      });

      console.log(result)
        this.setState({filteredData: result}, () => {
          console.log(this.state.filteredData)
      });      
    }

    selectCountry (val) {
      console.log(val)
      this.setState({ country: val });
    }
  
    selectRegion (val) {
      console.log(val)
      this.setState({ region: val });
    }

    textField (val) {      
      this.setState({firstTextFieldValue: val})
    }

    handleShow = () => {
      this.setState({isActive: true})
    }

    handleHide = () => {
      this.setState({isActive: false})
    }
    handleInput = event => {
      this.setState({name: event.target.value})
    }
    logValue = () => {
      console.log(this.state.name)
    }

  componentDidMount() {
    
      axios.get('https://picsum.photos/v2/list?limit=2000')
      .then(res => {
      console.log(res.data)

      this.setState({allData: res.data});
      //console.log(this.state.allData);
     
      this.setState({filteredData: res.data});
      //console.log(this.state.filteredData);
      })
      .catch(error => {
        console.log('Error getting data: ' + error);
      })            
  }

    render () {   

      const dropdownStyles = {
        dropdown: { width: 300 },
      };

      const textFieldStyles = { 
        fieldGroup: { width: 300 } 
      };
  
      const options = this.state.allData.map(obj => {
        return { key: obj.author.replaceAll(" ", "_"), text: obj.author }
      }) 
 
      const onChangeFirstTextFieldValue = (event, newValue) => {
          console.log(newValue);
      }

      const { country, region } = this.state;      

      const stackTokens = { childrenGap: 20 };   

      return (
        <Stack tokens={stackTokens}>
          <Dropdown
            id = "authorList"
            placeholder="Select Author"
            label="Dropdown Search"
            options={options}
            styles={dropdownStyles}
            onChange = {(event, selectedOption) => this.handleSearch(event, selectedOption)}            
          />
          <div>
            { 
              this.state.filteredData.map( obj => {
                return <ul><li>{obj.author}</li></ul>
              })
            }            
          </div>
          <div>
          <TextField
            label = "Basic Text Field"
            value = {this.firstTextFieldValue}
            onChange = {onChangeFirstTextFieldValue}
            styles = {textFieldStyles}
          />
          </div>
          <div>
            <CountryDropdown
              value={country}
              onChange={(val) => this.selectCountry(val)} 
            />
            <RegionDropdown
              country={country}
              value={region}
              onChange={(val) => this.selectRegion(val)} 
            />
          </div>
          <div>
            {this.state.isActive ? <h2>Hello</h2> : null}
            <button onClick = {this.handleShow}> Show </button>
            <button onClick = {this.handleHide}> Hide </button>
          </div>
          <div>
          <TextField
            id="readvalue"
            label = "Complete Name"
            placeholder = "Enter Name"
            //value = {this.handleInput}
            onChange = {this.handleInput}
            styles = {textFieldStyles}
          />
          <button onClick = {this.logValue}> Log Value </button>
          </div>

        </Stack>
      );
  }  
}
export default App;
