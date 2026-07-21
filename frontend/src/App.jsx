import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PollList from './home';
import './App.css';
import PollForm from './components/PollForm';

function App() {
  return (
    <BrowserRouter>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PollList />} />
          <Route path="/polls/:id" element={<div>Poll Details & Voting Page</div>} />
          <Route path="/create" element={<PollForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;