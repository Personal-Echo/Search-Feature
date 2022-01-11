//import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
//import { Stack } from '@fluentui/react/lib/Stack';
//import { Dropdown } from '@fluentui/react/lib';



class App extends Component {
  constructor(props) {
    super(props);

      this.state = {               
        authors: [],
        ids: [],
        urls: [],  
        selectedAuthor: '--Choose Author--',
		selectedID: '--Choose ID--'          
      };
      this.changeAuthor = this.changeAuthor.bind(this);
      this.changeID = this.changeID.bind(this);
    }   
    
    componentDidMount() {
        /* this.setState({
			authors : [
				{ name: 'A1', ids: [ {name: '1', urls: ['https:\\github.com']} ] },
                { name: 'A2', ids: [ {name: '29', urls: ['https:\\github.com']} ] },
				{ name: 'B', ids: [ {name: '2', urls: ['https:\\google.com']} ] },
				{ name: 'C', ids: [ {name: '3', urls: ['https:\\outlook.com']} ] },
				{ name: 'D', ids: [ {name: '4', urls: ['https:\\gmail.com']} ] },
				{ name: 'E', ids: [ {name: '5', urls: ['https:\\youtube.com']} ] }
			]
		});          */
        axios.get('https://picsum.photos/v2/list?limit=2000')
        .then(res => {
        console.log(res.data)
  
        this.setState({
          data: res.data,
          allData: res.data,
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

  changeAuthor(event) {
    this.setState({selectedAuthor: event.target.value});
    this.setState({ids: this.state.filteredData.find(info => info.name === event.target.value).ids}); 
}

 changeID(event) {
    this.setState({selectedID: event.target.value});
    const stats = this.state.authors.find(info => info.name === this.state.selectedAuthor).ids;
    this.setState({urls : stats.find(stat => stat.name === event.target.value).urls});
} 
  
  render () {   
     
       return (
        
        <div className='float-container'>           
            <div className='float-child-left'>
                <label>Author:</label>
                <br></br>
                    <select placeholder="Author" value={this.state.selectedAuthor} onChange={this.changeAuthor}>
                        <option>--Choose Author--</option>
                        {this.state.authors.map((e, key) => {
                            return <option key={key}>{e.name}</option>;
                        })}
                    </select>
                <br></br>
                <br></br>

                <label>ID:</label>
                <br></br>
                    <select placeholder="ID" value={this.state.selectedID} onChange={this.changeID}>
                        <option>--Choose ID--</option>
                        {this.state.ids.map((e, key) => {
                            return <option key={key}>{e.name}</option>;
                        })}
                    </select>  
                    
                <br></br>
                <br></br>
                    
                <label>URLs:</label>
                <br></br>
                    <select placeholder="URLs">
                        /<option>--Choose URL--</option>
                        {this.state.urls.map((e, key) => {
                            return <option key={key}>{e}</option>;
                        })}
                    </select>
		    </div>
        </div>
        
      );
  }  
}
export default App;
