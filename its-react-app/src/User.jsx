/* eslint-disable react/prop-types */
export const User = ({name, city, color, counter}) => {
	// const saluta = 'Ciao';
	const saluta = `Ciao ${name}`
	return (
		<div>
			<h2 style={{color: color}}>{saluta}</h2>
			<p>{city}</p>
			<p>{counter}</p>
		</div>
	)
}

// export const User = (props) => {
// 	return (
// 		<div>
// 			<h2 style={{color: props.color}}>{props.name}</h2>
// 			<p>{props.city}</p>
// 		</div>
// 	)
// }

