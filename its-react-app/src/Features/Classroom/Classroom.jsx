import { Container } from "reactstrap"
import { Desk } from "../Desk/Desk"

export const Classroom = () => {
	const students = [
		{
			name: "Alessio",
			city: "Centobuchi",
			age: 42
		},
		{
			name: "Massimo",
			city: "Maltignano",
			age: 52
		},
		{
			name: "Alessandro",
			city: "Macerata",
			age: 29
		},
		{
			name: "Gianluca",
			city: "Grottammare",
			age: 37
		}
	]
	return (
		<>
			<h1>Classroom ITS Frontend</h1>
			{/* <Container>
				<Desk name="Alessio" city="Centobuchi" age="42"/>
				<Desk name="Massimo" city="Maltignano" age="52"/>
				<Desk name="Alessandro" city="Macerata" age="29"/>
				<Desk name="Gianluca" city="Grottammare" age="37"/>
			</Container> */}
			<Container>
				{
					students.map((student, index) => (
						<Desk
							key={index}
							name={student.name}
							city={student.city}
							age={student.age}
					
						/>
					))
				}
			</Container>

		</>
	)
}