# react-svg-map
A React.js component to display an interactive SVG map.

## Installation
`npm install react-svg-map --save`

## Usage
1. Import `react-svg-map` to use `SVGMap` component.
1. Import the map you want from `react-svg-map/maps/`.
1. Optionally, import `react-svg-map/lib/css/index.css` if you want to apply the default styling.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import SVGMap from 'react-svg-map';
import Taiwan from 'react-svg-map/maps/taiwan';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SVGMap map={Taiwan} />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```
