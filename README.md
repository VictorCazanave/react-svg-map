# react-svg-map

A React.js component to display an interactive SVG map.

## Demo

[Take a look at the live demo](https://victorcazanave.com/react-svg-map)

## Installation

`npm install react-svg-map`

## Usage

* Import `SVGMap` component and the map you want from `react-svg-map`.
* Optionally, import `react-svg-map/lib/index.css` if you want to apply the default styles.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { SVGMap, Taiwan } from 'react-svg-map';
import 'react-svg-map/lib/index.css';

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

## API

| Prop                                  | Type              | Default                                                                             | Description                                                                                                                                                                                                               |
| ------------------------------------- | ----------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| map                               | object              | **Required**                                                                        | Describe SVG map to display.                                                                                                                                                       |
