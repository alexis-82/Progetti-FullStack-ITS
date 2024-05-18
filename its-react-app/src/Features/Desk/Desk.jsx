import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap"

export const Desk = (props) => {

	return (
		<Card
			style={{
				width: '18rem'
			}}
		>
			<CardBody>
				<CardTitle tag="h5">
					{ props.name }
				</CardTitle>
				<CardSubtitle
					className="mb-2 text-muted"
					tag="h6"
				>
					{ props.city }
				</CardSubtitle>
				<CardText>
					Età: { props.age }
				</CardText>
			</CardBody>
		</Card>
	)
}