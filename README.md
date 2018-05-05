# react-svg-map

[![npm version](https://badge.fury.io/js/react-svg-map.svg)](https://badge.fury.io/js/react-svg-map)
[![Build Status](https://travis-ci.org/VictorCazanave/react-svg-map.svg?branch=master)](https://travis-ci.org/VictorCazanave/react-svg-map)
[![codecov](https://codecov.io/gh/VictorCazanave/react-svg-map/branch/master/graph/badge.svg)](https://codecov.io/gh/VictorCazanave/react-svg-map)
[![Dependency Status](https://david-dm.org/VictorCazanave/react-svg-map.svg)](https://david-dm.org/VictorCazanave/react-svg-map)
[![NSP Status](https://nodesecurity.io/orgs/victorcazanave/projects/fad41a53-4937-4a49-982e-485959827083/badge)](https://nodesecurity.io/orgs/victorcazanave/projects/fad41a53-4937-4a49-982e-485959827083)

A React.js component to display an interactive SVG map.

![React SVG Map](react-svg-map.gif)

## Demo

[Take a look at the live demo!](https://victorcazanave.com/react-svg-map)

## Installation

`npm install --save react-svg-map`

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

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| map | object | **required** | Describe SVG map to display. See [maps section](#maps) for more details. |
| tabIndex | string | '0' | Tabindex of each location. This property is used to set the `tabindex` HTML attribute. |
| type | string | 'none' | Type of each location: 'radio'/'checkbox'/'link'. This property is only used to set the `role` HTML attribute and should match the behavior of your map. See examples for more details. |
| onLocationMouseOver | func |  | Invoked when the user put the mouse over a location. |
| onLocationMouseOut | func |  | Invoked when the user put the mouse out of a location. |
| onLocationMouseMove | func |  | Invoked when the user move the mouse on a location. |
| onLocationClick | func |  | Invoked when the user click on a location. |
| onLocationFocus | func |  | Invoked when the user focus a location (with mouse or keyboard). |
| onLocationBlur | func |  | Invoked when the user unfocus a location. |
| isLocationSelected | func |  | Executed to determine if a location is selected when using checkbox or radio behavior. This property is used to set the `aria-checked` HTML attribute. |

## Maps

### Existing maps

The component provides maps that can be imported and used directly.

#### Australia

Locations (states and territories):
* Australian Capital Territory
* New South Wales
* Northern Territory - Groote Eylandt
* Northern Territory - Mainland
* Northern Territory Melville Island
* Queensland - Fraser Island
* Queensland - Mainland
* Queensland - Mornington Island
* South Australia - Kangaroo Island
* South Australia - Mainland
* Tasmania - Cape Barren
* Tasmania - Flinders Island
* Tasmania - King Currie Island
* Tasmania - Mainland
* Victoria
* Western Australia

#### France

Locations (regions):
* Auvergne-Rhône-Alpes
* Bourgogne-Franche-Comté
* Bretagne
* Centre-Val de Loire
* Corse
* Grand Est
* Hauts-de-France
* Île-de-France
* Normandie
* Nouvelle-Aquitaine
* Occitanie
* Pays de la Loire
* Provence-Alpes-Côte d'Azur

#### Taiwan

Locations (counties and cities):
* Changhua County
* Chiayi City
* Chiayi County
* Hualien County
* Hsinchu City
* Hsinchu County
* Kaohsiung City
* Keelung City
* Miaoli County
* Nantou County
* New Taipei City
* Penghu County
* Pingtung County
* Taichung City
* Tainan City
* Taipei City
* Taitung County
* Taoyuan City
* Yilan County
* Yunlin County

#### USA

Locations (states):
* Alaska
* Alabama
* Arkansas
* Arizona
* California
* Colorado
* Connecticut
* Washington, DC
* Delaware
* Florida
* Georgia
* Hawaii
* Iowa
* Idaho
* Illinois
* Indiana
* Kansas
* Kentucky
* Louisiana
* Massachusetts
* Maryland
* Maine
* Michigan
* Minnesota
* Missouri
* Mississippi
* Montana
* North Carolina
* North Dakota
* Nebraska
* New Hampshire
* New Jersey
* New Mexico
* Nevada
* New York
* Ohio
* Oklahoma
* Oregon
* Pennsylvania
* Rhode Island
* South Carolina
* South Dakota
* Tennessee
* Texas
* Utah
* Virginia
* Vermont
* Washington
* Wisconsin
* West Virginia
* Wyoming

### Custom maps

You can modify existing maps or create your own.

#### Modify a map

1. Import the map to modify.
1. Create a new object from this map.
1. Pass this new object as `map` prop of `<SVGMap />` component.

```javascript
import React from 'react';
import { SVGMap, Taiwan } from 'react-svg-map';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Create new map object
    this.customTaiwan = {
      ...Taiwan,
      label: 'Custom map label',
      locations: Taiwan.locations.map((location) => {
        // Modify each location
      })
    };
  }

  render() {
    return (
      <SVGMap map={this.customTaiwan} />
    );
  }
}
```

It is recommended to not modify the SVG properties (viewBox, path), because it may break the map's display.

#### Create a map

If you create a new map (other country, city...), feel free to share it and add it to this project creating a pull request!

## License

MIT
