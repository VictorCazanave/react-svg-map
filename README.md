# react-taiwan-map
A React.js component to display an interactive SVG map of Taiwan.

## Installation
`npm install react-taiwan-map --save`

## Usage
1. Import react-taiwan-map to use TaiwanMap component.
1. Optionally, import react-taiwan-map/lib/css/index.css if you want to apply the default styling.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import TaiwanMap from 'react-taiwan-map';
import 'react-taiwan-map/lib/css/index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TaiwanMap />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```
