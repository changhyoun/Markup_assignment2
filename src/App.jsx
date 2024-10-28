import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Container from './Components/Container'

function App() {

  return (
    <Router basename="/Markup_assignment2">
    <div className="App">
      <Routes>
        <Route path="/" element={<Container />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App;

