# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.1.2]
### Fixed
- Add missing CSS file in production
  
## [2.1.1]
### Fixed
- Handle invalid ids in `selectedLocationIds`

## [2.1.0]
### Added
- Add `selectedLocationId` and `selectedLocationIds` props to handle initial selected locations
- Add `childrenBefore` and `childrenAfter` props to handle "slots"

## [2.0.2]
### Added
- Add files property in package.json to reduce size of package
- 
### Changed
- Update dependencies to fix security issues

## [2.0.1]
### Fixed
- Fix tabindex of CheckboxSVGMap

## [2.0.0]
### Removed
- Externalize maps ([svg-maps](https://github.com/VictorCazanave/svg-maps/))
- Remove deprecated tabIndex and type properties

### Changed
- Update documentation
- Update tests using fake maps

## [1.3.1]
### Changed
- Use GitHub pages to host demo

## [1.3.0]
### Added
- Allow function locationClassName prop of SVGMap, CheckboxSVGMap and RadioSVGMap components

### Changed
- Update examples
- Externalize Jest config
- Update Jest config

## [1.2.0]
### Added
- Create CheckboxSVGMap and RadioSVGMap components
- Add unit tests

### Changed
- Update examples
- Deprecate tabIndex and type properties
- Improve snapshot tests
- Update dev dependencies

## [1.1.0]
### Added
- Create Utah map

### Removed
- Remove deprecated NSP badge

## [1.0.7] - 2018-08-25
### Added
- Add lint script
- Create CONTRIBUTING
- Create CHANGELOG

## [1.0.6] - 2018-07-11
### Added
- Add dev dependencies badge in README

### Changed
- Update prop-types dependency to v15.6.2
- Update dev dependencies

### Fixed
- Fix typo in README

## [1.0.5] - 2018-05-05
### Added
- Add onLocationMouseMove documentation

### Changed
- Update dev dependencies

### Fixed
- Fix indentation in README
- Fix gif URL in README

## [1.0.4] - 2018-04-22
### Added
- Add example gif in README

## [1.0.3] - 2018-04-22
### Added
- Add USA documentation

### Fixed
- Fix installation documentation

## [1.0.2] - 2018-04-22
### Added
- Create USA map
- Create onMouseMove event handler
- Create tooltip example

## [1.0.1] - 2018-04-03
### Added
- Add code coverage badge with [codecov](codecov.io)
