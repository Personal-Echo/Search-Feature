//import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import { Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';
//import React, { useState, useEffect } from 'react';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //config: ["author", "download_url","id"],
      allData: [],
      filteredData: []
      };
      
      //this.handleSearch = this.handleSearch.bind(this);      
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

  componentDidMount() {
    
      axios.get('https://picsum.photos/v2/list?limit=2000')
      .then(res => {
      console.log(res.data)

      this.setState({allData: res.data});
      console.log(this.state.allData);
     
      this.setState({filteredData: res.data});
      console.log(this.state.filteredData);
      })
      .catch(error => {
      console.log('Error getting data: ' + error);
      })
  }

    render () {   

      const dropdownStyles = {
        dropdown: { width: 300 },
      };
  
      const options = this.state.allData.map(obj => {
        return { key: obj.author.replaceAll(" ", "_"), text: obj.author}
      })
      
      
      /*[ data
      { key: 'plantHeader', text: 'Plants', itemType: DropdownMenuItemType.Header },
      { key: 'ris', text: 'ris' },
      { key: 'vatten', text: 'Vatten' },
      { key: 'el', text: 'El', disabled: true },
     
     /*  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
      { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
      { key: 'broccoli', text: 'Broccoli' },
      { key: 'carrot', text: 'Carrot' },
      { key: 'lettuce', text: 'Lettuce' }, */
    //];

 
     const filtered_Data = (evt, index) => {
     console.log(evt.target.value) 
/*         const itemData = index.data;
        console.log(index.key, index.text);*/
    } 

    const stackTokens = { childrenGap: 20 };

      return (
        <Stack tokens={stackTokens}>
          <Dropdown
            placeholder="Select an option"
            label="Basic uncontrolled example"
            options={options}
            styles={dropdownStyles}
            onChange = {(event, selectedOption) => this.handleSearch(event, selectedOption)}
            //onChange = {filteredData}
            //onChange = {(event) => filtered_Data(event)}
            
          />
    
          <Dropdown
            label="Disabled example with defaultSelectedKey"
            defaultSelectedKey="el"
            options={options}
            disabled={true}
            styles={dropdownStyles}
          />
    
          <Dropdown
            placeholder="Select options"
            label="Multi-select uncontrolled example"
            defaultSelectedKeys={['apple', 'banana', 'grape']}
            multiSelect
            options={options}
            styles={dropdownStyles}
            //onChange = {(event) => this.handleSearch(event)}
            //onChange = {onChange}
          />
          <div>
            { 
              this.state.filteredData.map( obj => {
                return <li>{obj.author}</li>
              })
            }
            
          </div>
        </Stack>

/*           <div style={{padding:10}}>
          filteredData(value,index){
          return(
            <div>
              <div style={styles} key={value.id}>
                {value.author}
              </div>
            </div>
          )
          }
          </div>	 */
      );


  }
  
}
export default App;
