import { Outlet } from "react-router-dom"
import { } from "reactstrap"
import {
  Nav,
  NavItem,
  NavLink,
	Col, Container, Row
} from 'reactstrap';

export const Layout = () => {
	return (
		<>
			<Container className="bg-light border" fluid="lg">
				<Row>
					<Col>
						<Nav>
							<NavItem>
								<NavLink active	href="/">
									Home
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/classroom">
									Classroom
								</NavLink>
							</NavItem>
						</Nav>
					</Col>
				</Row>
				<Row>
					<Col>
						<Outlet />
					</Col>
				</Row>
			</Container>
		</>
	)
}