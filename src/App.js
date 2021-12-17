//import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import { Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, TextField} from '@fluentui/react/lib';



class App extends Component {
  constructor(props) {
    super(props);

      this.state = {
        data: [], 
        filteredDataStates: {},
        filteredData: [],
        
        config: {
          filters: [
            {
              type: "dropdown",
              id: "authorList",
              placeholder: "Select Author",
              label: "Dropdown Search 1 ",
              dataReference: "author"
            },
            {
              type: "dropdown",
              id: "authorID",
              placeholder: "Select ID",
              label: "Dropdown Search 2",
              dataReference: "id"
            },
            {
              type: "dropdown",
              id: "authorURL",
              placeholder: "Select URL",
              label: "Dropdown Search 3",
              dataReference: "url"
            }
          ]
        },
        name: ""
      };          
    }
    
    handleSearch (event, selectedOption, dataReference, filterId) {
      let value = selectedOption.text;
      
      let result = [];        
  
      console.log(selectedOption);     
      
      result = this.state.filteredData.filter((data) =>
      {
        console.log(data[dataReference].search(value))
        return data[dataReference].search(value) !== -1 ? true : false;        
      });
      console.log(result)
        let currentFilterState = {}
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

      this.setState({
        data: res.data,
        filteredData: res.data,
        filteredDataStates: {
          origin: res.data
        }
      });
          
      this.setState({filteredData: res.data});
      
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
  
      const getOptions = (dataReference, data) => {
        if(data) {
          return data.map(obj => {
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
          <div className='float-container'>
            <div className='float-child-left'>
              {
                this.state.config.filters.map(filter => {
                    return <Dropdown
                      id={filter.id}
                      placeholder={filter.placeholder}
                      label={filter.label}
                      options={getOptions(filter.dataReference, filter.data ? filter.data : undefined)}
                      styles={dropdownStyles}
                      onChange = {(event, selectedOption) => this.handleSearch(event, selectedOption, filter.dataReference, filter.id)}
                    />                    
                })                
              }                         
            </div>
          </div>
        </Stack>
      );
  }  
}
export default App;
