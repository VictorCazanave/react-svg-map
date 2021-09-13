import React from 'react';
import France from '@svg-maps/france.regions';
import { SVGMap } from '../../../src/';
import { getLocationId, getLocationName } from '../utils';

class LinkMap extends React.PureComponent {
  constructor(props) {
    super(props);

    // Linking locations ids with urls
    this.links = {
      ara: 'https://en.wikipedia.org/wiki/Auvergne-Rh%C3%B4ne-Alpes',
      bfc: 'https://en.wikipedia.org/wiki/Bourgogne-Franche-Comt%C3%A9',
      bre: 'https://en.wikipedia.org/wiki/Brittany_(administrative_region)',
      cvl: 'https://en.wikipedia.org/wiki/Centre-Val_de_Loire',
      cor: 'https://en.wikipedia.org/wiki/Corsica',
      ges: 'https://en.wikipedia.org/wiki/Grand_Est',
      hdf: 'https://en.wikipedia.org/wiki/Hauts-de-France',
      idf: 'https://en.wikipedia.org/wiki/%C3%8Ele-de-France',
      nor: 'https://en.wikipedia.org/wiki/Normandy',
      naq: 'https://en.wikipedia.org/wiki/Nouvelle-Aquitaine',
      occ: 'https://en.wikipedia.org/wiki/Occitanie_(administrative_region)',
      pdl: 'https://en.wikipedia.org/wiki/Pays_de_la_Loire',
      pac: 'https://en.wikipedia.org/wiki/Provence-Alpes-C%C3%B4te_d%27Azur',
    };

    this.state = {
      pointedLocation: null,
      focusedLocation: null,
      clickedLocation: null,
    };
  }

  handleLocationMouseOver = event => {
    const pointedLocation = getLocationName(event);
    this.setState({ pointedLocation: pointedLocation });
  };

  handleLocationMouseOut = () => {
    this.setState({ pointedLocation: null });
  };

  handleLocationClick = event => {
    const clickedLocation = getLocationName(event);
    const clickedLocationId = getLocationId(event);
    this.setState({ clickedLocation: clickedLocation });
    window.open(this.links[clickedLocationId], '_blank');
  };

  handleLocationFocus = event => {
    const focusedLocation = getLocationName(event);
    this.setState({ focusedLocation: focusedLocation });
  };

  handleLocationBlur = () => {
    this.setState({ focusedLocation: null });
  };

  render() {
    return (
      <article className='examples__block'>
        <h2 className='examples__block__title'>France SVG map as links</h2>
        <div className='examples__block__info'>
          <div className='examples__block__info__item'>
            Pointed location: {this.state.pointedLocation}
          </div>
          <div className='examples__block__info__item'>
            Focused location: {this.state.focusedLocation}
          </div>
          <div className='examples__block__info__item'>
            Clicked location: {this.state.clickedLocation}
          </div>
        </div>
        <div className='examples__block__map'>
          <SVGMap
            map={France}
            type='link'
            onLocationMouseOver={this.handleLocationMouseOver}
            onLocationMouseOut={this.handleLocationMouseOut}
            onLocationClick={this.handleLocationClick}
            onLocationFocus={this.handleLocationFocus}
            onLocationBlur={this.handleLocationBlur}
          />
        </div>
      </article>
    );
  }
}

export default LinkMap;
