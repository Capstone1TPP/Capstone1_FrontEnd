import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PollList from './home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PollList />} />
          <Route path="/polls/:id" element={<div>Poll Details & Voting Page</div>} />
          <Route path="/create" element={<div>Create Poll Form</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;