import React, { Component } from "react";
import { Dropdown, DropdownSearchInput } from '@fluentui/react-northstar'

class App extends Component {
    render() {
        const inputItems = [
            'Bruce Wayne',
            'Natasha Romanoff',
            'Steven Strange',
            'Alfred Pennyworth',
            `Scarlett O'Hara`,
            'Imperator Furiosa',
            'Bruce Banner',
            'Peter Parker',
            'Selina Kyle',
          ]
          return(
     
            // <DropdownSearchInput
            //     className="ddl1"
            //     placeholder="search author name..."
            //     items={inputItems}
            // />
            <div
  key="builder-root"
  data-builder-id="builder-root"
>
  <Dropdown
    a11ySelectedItemsMessage=""
    as="Dropdown"
    autoSize="width-always"
    className="authorname"
    clearable
    data-builder-id="8k7j7ss8lbf"
    items={[
      'Item 1',
      'Item 2',
      'Item 3'
    ]}
    placeholder="search author name..."
    search
  />
</div> 
          )
    }
}
export default App