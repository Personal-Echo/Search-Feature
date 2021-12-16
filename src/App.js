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
        allData: [],
        filteredData: [],
        firstTextFieldValue: [],
        isActive1: false,
        isActive2: false,

        name: ""
      };          
    }
    
    handleSearch (event, selectedOption) {
      let value = selectedOption.text;
      let result = [];        
  
      console.log(selectedOption);

      if(selectedOption.text === 'Paul Jarvis') 
      {
        console.log(selectedOption.text);
        this.handleShow1();
      }
      else {this.handleHide1();}

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

    textField (val) {      
      this.setState({firstTextFieldValue: val})
    }

    handleShow1 = () => {
      this.setState({isActive1: true})
    } 
    handleHide1 = () => {
      this.setState({isActive1: false})
    }

    handleShow2 = () => {
      this.setState({isActive2: true})
    } 
    handleHide2 = () => {
      this.setState({isActive2: false})
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

      const stackTokens = { childrenGap: 20 };   

      const filteredOption = this.state.filteredData.map(obj => {
        return {text: obj.author}
      })

      return (
        <Stack tokens={stackTokens}>
          <div className='float-container'>
            <div className='float-child-left'>
              <Dropdown
              id = "authorList"
              placeholder="Select Author"
              label="Dropdown Search"
              options={options}
              styles={dropdownStyles}
              onChange = {(event, selectedOption) => this.handleSearch(event, selectedOption)}           
              />      
              
                {this.state.isActive1 ? 
                    <Dropdown
                    placeholder='selected value'
                    label='selected value'
                    options= {filteredOption}
                    styles={dropdownStyles}
                    />               
                : null}

                {this.state.isActive1 ? 
                  this.state.filteredData.map( obj => {
                    return <ul><li>{obj.author} - {obj.id}</li></ul>
                  })
                : null}
           
            </div>
          </div>

          <div className='float-container'>    
            <div className='float-child-left'>
              <button onClick = {this.handleShow2} styles = {textFieldStyles}> Show </button>
              <button onClick = {this.handleHide2} styles = {textFieldStyles}> Hide </button>
              {this.state.isActive2 ? 
                this.state.allData.map( obj => {
                  return <ul><li>{obj.author} - {obj.id}</li></ul>
                })
              : null}     
            </div> 
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
          <TextField
            id="readvalue"
            label = "Complete Name"
            placeholder = "Enter Name"
            //value = {this.handleInput}
            onChange = {this.handleInput}
            styles = {textFieldStyles}
          />
          <button onClick = {this.logValue}> Log Value at Console</button>
          </div>
        </Stack>
      );
  }  
}
export default App;
