import { BrowserRouter, Routes, Route } from 'react-router-dom';import './App.css';
import PollForm from './components/PollForm';
import PollList from './home'
import NavBar from './components/NavBar';
import PollDetail from './pages/PollDetails';

function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<PollList />} />
          <Route path="/create" element={<PollForm />} />
          <Route path="/polls/:id" element={<PollDetail />} />
          <Route path="/polls/:id/results" element={<div>Hello Results</div>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;