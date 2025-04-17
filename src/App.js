import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, PrimaryButton } from '@fluentui/react';

class App extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      selectedFilters: {
        authorList: null,
        authorID: null,
        authorURL: null
      }
    };

    this.state = {
      data: [],
      filteredData: [],
      selectedFilters: {...this.initialState.selectedFilters},
      config: {
        filters: [
          {
            type: "dropdown",
            id: "authorList",
            placeholder: "Select Author Name",
            label: "Dropdown Search 1",
            dataReference: "author",
            value: "author",
            required: true
          },
          {
            type: "dropdown",
            id: "authorID",
            placeholder: "Select ID",
            label: "Dropdown Search 2",
            dataReference: "id",
            value: "id"
          },
          {
            type: "dropdown",
            id: "authorURL",
            placeholder: "Select URL",
            label: "Dropdown Search 3",
            dataReference: "url",
            value: "url"
          }
        ]
      },
      // Add a key to force re-render of dropdowns
      resetKey: 0
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    axios.get('https://picsum.photos/v2/list?limit=2000')
      .then(res => {
        this.setState({
          data: res.data,
          filteredData: res.data
        });
      })
      .catch(error => {
        console.error('Error getting data: ', error);
      });
  }

  handleSearch(event, option, dataReference, filterId) {
    const { selectedFilters, config } = this.state;
    const newSelectedFilters = {
      ...selectedFilters,
      [filterId]: option?.text || ''
    };

    // Filter the data according to the selected dropdowns up to this point
    let newFilteredData = this.state.data;
    config.filters.forEach((filter) => {
      const selected = newSelectedFilters[filter.id];
      if (selected) {
        newFilteredData = newFilteredData.filter(item =>
          String(item[filter.dataReference] || '').toLowerCase() === selected.toLowerCase()
        );
      }
    });

    this.setState({
      selectedFilters: newSelectedFilters,
      filteredData: newFilteredData
    });
  }

  resetState() {
    // Reset the selected filters to null and restore the filtered data to original
    this.setState(prevState => ({
      selectedFilters: {...this.initialState.selectedFilters},
      filteredData: this.state.data,
      // Increment reset key to force re-render of dropdowns
      resetKey: prevState.resetKey + 1
    }));
  }

  render() {
    const { filteredData, config, selectedFilters, resetKey } = this.state;

    const dropdownStyles = { dropdown: { width: '100%' }, root: { width: '100%' } };
    const stackTokens = { childrenGap: 15 };

    const getOptions = (dataReference) => {
      const source = filteredData; // Use filtered data for subsequent dropdowns
      const uniqueValues = new Set();
      return source
        .filter(item => !!item[dataReference])
        .filter(item => {
          if (!uniqueValues.has(item[dataReference])) {
            uniqueValues.add(item[dataReference]);
            return true;
          }
          return false;
        })
        .map(obj => {
          const text = String(obj[dataReference] || '');
          return {
            key: text.replace(/\s+/g, "_"),
            text
          };
        });
    };

    const isDropdownDisabled = (index) => {
      if (index === 0) return false; // First dropdown is always enabled
      const prevFilter = config.filters[index - 1];
      return !selectedFilters[prevFilter.id]; // Disable if previous dropdown has no selection
    };

    return (
      <div className="App">
        <div className="card">
          <h1>Search Authors</h1>
          <Stack tokens={stackTokens}>
            {config.filters.map((filter, index) => (
              <Dropdown
                key={`${filter.id}-${resetKey}`} // Add resetKey to force re-render on reset
                placeholder={filter.placeholder}
                label={filter.label}
                options={getOptions(filter.dataReference)}
                styles={dropdownStyles}
                onChange={(event, option) =>
                  this.handleSearch(event, option, filter.dataReference, filter.id)
                }
                disabled={isDropdownDisabled(index)}
                selectedKey={undefined} // Always start with undefined, let controlled component handle selection
                defaultSelectedKey={undefined} // Ensure no default selection
              />
            ))}
            <PrimaryButton text="Reset" onClick={this.resetState} style={{ marginTop: 20 }} />
          </Stack>
        </div>
      </div>
    );
  }
}

export default App;