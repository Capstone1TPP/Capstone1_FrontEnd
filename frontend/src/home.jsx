import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const DUMMY_POLLS = [
  {
    id: 1,
    title: 'Favorite Tech Stack',
    description: 'Which stack do you prefer for full-stack web development?',
  },
  {
    id: 2,
    title: 'Lunch Preferences',
    description: 'What should the team order for lunch on Friday?',
  },
];

export default function PollList() {
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /*useEffect(() => {
    async function fetchPolls() {
      try {
        const response = await fetch('http://localhost:4000/polls'); 
        if (!response.ok) throw new Error('Failed to fetch polls');
        
        const data = await response.json();
        setPolls(data);
      } catch (err) {
        console.error("Error fetching polls:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPolls();
  }, []); 
  */


  if (isLoading) return <div>Loading polls...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="poll-list-container">
      <h2>Active Polls</h2>
      {polls.length === 0 ? (
        <p>No polls available yet.</p>
      ) : (
        polls.map((poll) => (
          <div key={poll.id} className="poll-card">
            <h3>{poll.title}</h3>
            <p>{poll.description}</p>
            <Link to={`/polls/${poll.id}`}>Vote Now</Link>
          </div>
        ))
      )}
    </div>
  );
}