# Contributing

If you want to contribute to this project, here's a quick guide:
1. Fork the repository
1. Develop your code changes
1. Ensure eslint is happy: `npm run lint`
1. Ensure the tests pass: `npm test`
1. Commit your changes
1. Push to your fork
1. Submit a pull request

## Creating a new map
### Map file
* Name the file `[country].js` in Kebab case. For example: `new-zealand.js`
* Use `Map of [Country]` as `label`
* Adjust the `viewBox` to have no empty space on each side (top, bottom, left, right)
* Use English `name`s by default in `[country].js`
* Create a specific `[country].[lang].js` file to use another language. For example: `taiwan.zh.js`, `france.fr.js`...
* Use semantic `id`s (shortnames or full names in Kebab case). For example: `ny` for New York, `taipei-city` for Taipei City...
* Add the map in `/src/maps/`
* Import and export the map in `/src/index.js`

### Tests
* Add a test in `/__tests__/svg-map.test.js` for this map: `displays map of [Country]` (in alphabetical order)
* Update the snapshots with `npm run build-tests`
* Run ESLint with `npm run lint`
* Run the tests with `npm test`

### Documentation
* Add the country with the list of locations alphabetically sorted in the [existing maps section](https://github.com/VictorCazanave/react-svg-map#existing-maps)

## Reporting a bug
[Open an issue](https://github.com/VictorCazanave/react-svg-map/issues/new).
