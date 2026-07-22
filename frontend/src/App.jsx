import { BrowserRouter, Routes, Route } from 'react-router-dom';import './App.css';
import PollForm from './components/PollForm';
import PollList from './home'
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<PollList />} />
          <Route path="/polls/:id" element={<div>Poll Details & Voting Page</div>} />
          <Route path="/create" element={<PollForm />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;