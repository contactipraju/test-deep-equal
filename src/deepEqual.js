// Function to check if every non-undefined value of an object has a match in the second one
const allPropsHasAMatch = (a, b) => {
	// We know both a, b are objects, so it's safe to assume they both are.
	for (let prop in a) {
		if (typeof a[prop] != 'undefined') {
			if (b.hasOwnProperty(prop)) {
				if (!deepEqual(a[prop], b[prop])) {
					return false;
				}
			} else {
				return false;
			}
		}
	}

	return true;
}

// A (mutual) recursive function that checks if two objects are value equal
const deepEqual = (a, b) => {
	if (a === b) {
		return true;
	} else if(
		(a != null && typeof a == 'object') &&
		(b != null && typeof b == 'object')
	) {
		// Make sure every non-undefined property from first object has a match in the second one
		if (!allPropsHasAMatch(a, b))
			return false;

		// Make sure every non-undefined property from second object has a match in the first one
		if (!allPropsHasAMatch(b, a))
			return false;

		// Both objects under comparision are value-equal
		return true;
	} else {
		return false;
	}
}

module.exports = deepEqual;