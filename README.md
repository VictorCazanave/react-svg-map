 # react-svg-map

[![npm version](https://badge.fury.io/js/react-svg-map.svg)](https://badge.fury.io/js/react-svg-map)
[![Build Status](https://travis-ci.org/VictorCazanave/react-svg-map.svg?branch=master)](https://travis-ci.org/VictorCazanave/react-svg-map)
[![codecov](https://codecov.io/gh/VictorCazanave/react-svg-map/branch/master/graph/badge.svg)](https://codecov.io/gh/VictorCazanave/react-svg-map)
[![Dependency Status](https://david-dm.org/VictorCazanave/react-svg-map.svg)](https://david-dm.org/VictorCazanave/react-svg-map)
[![peerDependencies Status](https://david-dm.org/VictorCazanave/react-svg-map/peer-status.svg)](https://david-dm.org/VictorCazanave/react-svg-map?type=peer)

A set of React.js components to display an interactive SVG map.

![React SVG Map](https://github.com/VictorCazanave/react-svg-map/blob/master/react-svg-map.gif)

## Demo

[Take a look at the live demo!](https://victorcazanave.com/react-svg-map)

## Installation

`npm install --save react-svg-map`

## Usage

### Simple SVG Map

This is the base component to display an SVG map.

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

### Checkbox SVG Map
This is an implementation of `SVGMap` that behaves like a group of checkboxes.
It is based on [this WAI-ARIA example](https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-1/checkbox-1.html) to support keyboard navigation and be accessible.

* Import `CheckboxSVGMap` component and the map you want from `react-svg-map`.
* Optionally, import `react-svg-map/lib/index.css` if you want to apply the default styles.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { CheckboxSVGMap, Taiwan } from 'react-svg-map';
import 'react-svg-map/lib/index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CheckboxSVGMap map={Taiwan} />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

### Radio SVG Map
This is an implementation of `SVGMap` that behaves like a group of radio buttons.
It is based on [this WAI-ARIA example](https://www.w3.org/TR/wai-aria-practices/examples/radio/radio-1/radio-1.html) to support keyboard navigation and be accessible.

* Import `RadioSVGMap` component and the map you want from `react-svg-map`.
* Optionally, import `react-svg-map/lib/index.css` if you want to apply the default styles.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { RadioSVGMap, Taiwan } from 'react-svg-map';
import 'react-svg-map/lib/index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RadioSVGMap map={Taiwan} />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

## API

### SVGMap

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| map | object | **required** | Describe SVG map to display. See [maps section](#maps) for more details. |
| className | string | `'svg-map'` | CSS class of `<svg>`. |
| role | string | `'none'` | ARIA role of `<svg>`. |
| locationClassName | string | `'svg-map__location'` | CSS class of each `<path>`. |
| locationTabIndex | string or function | `'0'` | Tabindex each `<path>`. |
| locationRole | string | `'none'` | ARIA role of each `<path>`. |
| onLocationMouseOver | function |  | Invoked when the user puts the mouse over a location. |
| onLocationMouseOut | function |  | Invoked when the user puts the mouse out of a location. |
| onLocationMouseMove | function |  | Invoked when the user moves the mouse on a location. |
| onLocationClick | function |  | Invoked when the user clicks on a location. |
| onLocationKeyDown | function |  | Invoked when the user hits a keyboard key on a location. |
| onLocationFocus | function |  | Invoked when the user focuses a location. |
| onLocationBlur | function |  | Invoked when the user unfocuses a location. |
| isLocationSelected | function |  | Executed to determine if a location is selected. This property is used to set the `aria-checked` HTML attribute. |
| tabIndex | string | `'0'` | **DEPRECATED:** Although this property still works, it has been replaced by `locationTabIndex` and will be removed in next major version. |
| type | string | `'none'` | **DEPRECATED:** Although this property still works, it has been replaced by `locationRole` and will be removed in next major version. |

### CheckboxSVGMap

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| map | object | **required** | Describe SVG map to display. See [maps section](#maps) for more details. |
| className | string | `'svg-map'` | CSS class of `<svg>`. |
| locationClassName | string | `'svg-map__location'` | CSS class of each `<path>`. |
| onChange | function |  | Invoked when the user selects/deselects a location. The list of selected locations is passed as parameter. |
| onLocationMouseOver | function |  | Invoked when the user puts the mouse over a location. |
| onLocationMouseOut | function |  | Invoked when the user puts the mouse out of a location. |
| onLocationMouseMove | function |  | Invoked when the user moves the mouse on a location. |
| onLocationFocus | function |  | Invoked when the user focuses a location. |
| onLocationBlur | function |  | Invoked when the user unfocuses a location. |

### RadioSVGMap

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| map | object | **required** | Describe SVG map to display. See [maps section](#maps) for more details. |
| className | string | `'svg-map'` | CSS class of `<svg>`. |
| locationClassName | string | `'svg-map__location'` | CSS class of each `<path>`. |
| onChange | function |  | Invoked when the user selects a location. The selected location is passed as parameter. |
| onLocationMouseOver | function |  | Invoked when the user puts the mouse over a location. |
| onLocationMouseOut | function |  | Invoked when the user puts the mouse out of a location. |
| onLocationMouseMove | function |  | Invoked when the user moves the mouse on a location. |
| onLocationFocus | function |  | Invoked when the user focuses a location. |
| onLocationBlur | function |  | Invoked when the user unfocuses a location. |

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

#### Utah, USA

Locations (counties):
* Beaver County
* Box Elder County
* Cache County
* Carbon County
* Daggett County
* Davis County
* Duchesne County
* Emery County
* Garfield County
* Grand County
* Iron County
* Juab County
* Kane County
* Millard County
* Morgan County
* Piute County
* Rich County
* Salt Lake County
* San Juan County
* Sanpete County
* Sevier County
* Summit County
* Tooele County
* Uintah County
* Utah County
* Wasatch County
* Washington County
* Wayne County
* Weber County

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

If you create a new map (other country, city...), feel free to [contribute](CONTRIBUTING.md)!

## License

MIT
