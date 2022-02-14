//import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import { Stack } from '@fluentui/react/lib/Stack';
//import { Dropdown, DefaultButton, ComboBox, IComboBoxStyles } from '@fluentui/react';
import { Dropdown } from '@fluentui/react-northstar';



class App extends Component {
  constructor(props) {
    super(props);

      this.state = {
        data: [],
        filteredData: [],
        filteredDataStates: {},
        resetValues: false,
        
        config: {
          filters: [
            {
              type: "dropdown",
              id: "authorList",
              placeholder: "Select Author Name",
              label: "Dropdown Search 1 ",
              dataReference: "author",
              value: "author",
              required: true,
              allowFreeform: true,
              autoComplete: true
            },
            {
              type: "dropdown",
              id: "authorID",
              placeholder: "Select ID",
              label: "Dropdown Search 2",
              dataReference: "id",
              value: "id",
              allowFreeform: true,
              autoComplete: true
            },
            {
              type: "dropdown",
              id: "authorURL",
              placeholder: "Select URL",
              label: "Dropdown Search 3",
              dataReference: "url",
              value: "url",
              allowFreeform: true,
              autoComplete: true
            }
          ]
        }
      };  
      this.resetState = this.resetState.bind(this);        
    }
    
    handleSearch (event, selectedOption, dataReference, filterId) {    

      let value = selectedOption.text;
      let result = [];
      let currentFilterState = {}

      console.log(event);
      console.log(selectedOption);
      console.log(dataReference);
      console.log(filterId);
      
      result = this.state.filteredData.filter((data) =>
      {
        console.log(data[dataReference].search(value))
        return data[dataReference].search(value) !== -1 ? true : false;        
      });
      console.log(result)
        //let currentFilterState = {}
        currentFilterState[filterId] = this.state.filteredData
        this.setState({
          config: {
            filters: this.state.config.filters.map( filter => {
              if(filter.id == filterId) {
                return { ...filter, data: this.state.filteredData }
              } else {
                return filter
              }
            })
          }
        })

        this.setState({
          filteredDataStates: {
            ...this.state.filteredDataStates,
            ...currentFilterState
          },
          filteredData: result
        }, () => {
          console.log(this.state.filteredData)
          console.log(this.state.filteredDataStates)
        });   
      }

      resetState = (event, selectedOption, filterId) => {

      this.setState({resetValues: true})

      this.setState({        
        filteredData: this.state.data,
        filteredDataStates: {origin: this.state.data}
      });
      this.currentFilterState = null
/* 
      this.setState({filteredData: this.state.data}, () => 
            console.log(this.state.filteredData)
      )

      this.setState({filteredDataStates: this.state.data}, () => 
          console.log(this.state.filteredDataStates)
      )  */

      };  
    
  componentDidMount() {
      axios.get('https://picsum.photos/v2/list?limit=2000')
      .then(res => {
      console.log(res.data)

      this.setState({
        data: res.data,
        filteredData: res.data,
        filteredDataStates: {
          origin: res.data
        }
      });
          
      //this.setState({filteredData: res.data});
      })
      .catch(error => {
        console.log('Error getting data: ' + error);
      })            
  }
    render () {   
      //console.log("render() method");
      const dropdownStylesCustom = {
        dropdown: { width: 300 }, 
        root: { maxWidth: 300},
      };      
      const dropdownStyles = {
   
        ...dropdownStylesCustom
      }
    
      
      const getOptions = (dataReference, value) => {
        if(value) {
          return value.map(obj => {
            return { key: obj[dataReference].replaceAll(" ", "_"), text: obj[dataReference] }
          })
        } else {
          return this.state.filteredData.map(obj => {
            return { key: obj[dataReference].replaceAll(" ", "_"), text: obj[dataReference] }
          })
        }
      }

      const stackTokens = { childrenGap: 20 };   
            
       return (
       <Stack tokens={stackTokens}>
         
              {
                this.state.config.filters.map(filter => {
                    return <Dropdown
                      search
                      id={filter.id}
                      placeholder={filter.placeholder}
                      label={filter.label}
                      items={getOptions(filter.dataReference, filter.data ? filter.data : undefined)}
                      styles={dropdownStyles}
                      onChange = {(event, selectedOption) => this.handleSearch(event, selectedOption, filter.dataReference, filter.id)}
                      noResultsMessage="We couldn't find any matches."
                      getA11ySelectionMessage={{
                        onAdd: item => `${item} has been selected.`,  }}
                    />                   
                })                
              } 
         
              {/* {
                this.state.config.filters.map(filter => {
                    return <ComboBox
                      //className='select'
                      allowFreeform= {filter.allowFreeform}
                      autoComplete= {filter.autoComplete ? "on" : "off"}
                      id={filter.id}
                      placeholder={filter.placeholder}
                      label={filter.label}
                      options={getOptions(filter.dataReference, filter.data ? filter.data : undefined)}
                      styles={dropdownStyles}
                      onChange = {(event, selectedOption) => this.handleSearch(event, selectedOption, filter.dataReference, filter.id)}
                      //selectedKey={ getOptions }
                      //notifyOnReselect={true}                     
                    />                   
                })                
              }      */}

               
        
        </Stack>
      );
  }  
}
export default App;
