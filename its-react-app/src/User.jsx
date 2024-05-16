export const User = ({ name, city, color }) => {
    // const saluta = "Ciao"
    const saluta = `Ciao ${name}`
    return (
        <div>
            <h2 style={{ color: color }}> {saluta}</h2>
            <p>{city}</p>
        </div>
    )
} 

// export const User = (props) => {
//     return (
//         <div>
//             <h2 style={{ color: '#ff0000' }}> {props.name}</h2>
//             <p>{props.city}</p>
//         </div>
//     )
// } 