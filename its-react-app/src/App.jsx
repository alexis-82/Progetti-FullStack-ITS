import './App.css'
import { Routes, Route } from "react-router-dom";
import { Classroom } from './Features/Classroom/Classroom'
import { Layout } from './Layout'
import { Home } from './Features/Home/Home'

function App() {
  return (
    <>
			<Routes>
        <Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
          <Route path="classroom" element={<Classroom />} />

        </Route>
      </Routes>
    </>
  )
}

export default App
