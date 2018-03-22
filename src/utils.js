/**
 * Return the id of the location targeted by the event
 * @param  {Event} event Occured event
 * @return {String}      Id of the location
 */
export function getLocationId(event) {
	return event.target.id;
}

/**
 * Return the name of the location targeted by the event
 * @param  {Event} event Occured event
 * @return {String}      Name of the location
 */
export function getLocationName(event) {
	return event.target.attributes.name.value
}

/**
 * Indicate if the location targeted by the event is selected
 * @param  {Event} event Occured event
 * @return {Boolean}     Is the location selected
 */
export function getLocationSelected(event) {
	return event.target.attributes['aria-checked'].value === 'true';
}
