export function getNodeAttributes(node) {
	return Object.values(node.attributes).reduce(
		(acc, curr) => ({ ...acc, [curr.name]: curr.value }),
		{}
	);
}
