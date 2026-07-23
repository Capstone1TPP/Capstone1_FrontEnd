import { BrowserRouter, Routes, Route } from 'react-router-dom';import './App.css';
import PollForm from './components/PollForm';
import PollList from './home'
import NavBar from './components/NavBar';
import PollVote from './pages/PollVote';
import PollResults from './pages/PollResults';

function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<PollList />} />
          <Route path="/create" element={<PollForm />} />
          <Route path="/polls/:id" element={<PollVote />} />
          <Route path="/polls/:id/results" element={<PollResults />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;