import React, { PureComponent } from 'react';
import USA from '@svg-maps/usa';

import { SVGMap } from '../../../src';
import { getLocationName } from '../utils';

class TooltipHeatMap extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pointedLocation: null,
      tooltipStyle: {
        display: 'none',
      },
    };
  }

  handleLocationMouseOver = event => {
    const pointedLocation = getLocationName(event);
    this.setState({ pointedLocation });
  };

  handleLocationMouseOut = () => {
    this.setState({ pointedLocation: null, tooltipStyle: { display: 'none' } });
  };

  handleLocationMouseMove = event => {
    const tooltipStyle = {
      display: 'block',
      top: event.clientY + 10,
      left: event.clientX - 100,
    };
    this.setState({ tooltipStyle });
  };

  getLocationClassName = (location, index) => {
    // Generate random heat map
    return `svg-map__location svg-map__location--heat${index % 4}`;
  };

  render() {
    return (
      <article className='examples__block'>
        <h2 className='examples__block__title'>
          USA SVG heat map with tooltips
        </h2>
        <div className='examples__block__map examples__block__map--usa'>
          <SVGMap
            map={USA}
            locationClassName={this.getLocationClassName}
            onLocationMouseOver={this.handleLocationMouseOver}
            onLocationMouseOut={this.handleLocationMouseOut}
            onLocationMouseMove={this.handleLocationMouseMove}
          />
          <div
            className='examples__block__map__tooltip'
            style={this.state.tooltipStyle}>
            {this.state.pointedLocation}
          </div>
        </div>
      </article>
    );
  }
}

export default TooltipHeatMap;
