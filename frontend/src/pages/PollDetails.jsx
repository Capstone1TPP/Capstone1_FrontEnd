import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function PollDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const poll = {
  id: 1,
  title: "Favorite Tech Stack",
  description: "Which stack do you prefer for full-stack web development?",
  options: [
    {
      id: 1,
      text: "PERN Stack (Postgres, Express, React, Node)"
    },
    {
      id: 2,
      text: "MERN Stack (MongoDB, Express, React, Node)"
    },
    {
      id: 3,
      text: "Next.js + Supabase"
    },
    {
      id: 4,
      text: "Django + React"
    }
  ]
}

  // useEffect(() => {
  //   async function fetchPoll() {
  //     try {
  //       const response = await fetch(`http://localhost:4000/polls/${id}`);
  //       const data = await response.json();
  //       setPoll(data);
  //     } catch (err) {
  //       console.error('Error fetching poll:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchPoll();
  // }, [id]);


  const handleVote = async (e) => {
    e.preventDefault();
    if (!selectedOptionId) {
      alert('Please select an option first!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/polls/${id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId: Number(selectedOptionId) }),
      });

      if (response.ok) {
        navigate(`/polls/${id}/results`);
      } else {
        alert('Failed to submit vote.');
      }
    } catch (err) {
      console.error('Error submitting vote:', err);
    }
  };

  if (loading) return <div>Loading poll...</div>;
  if (!poll) return <div>Poll not found.</div>;

  return (
    <div className="poll-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/">&larr; Back to Home</Link>
    </div>

      <h2>{poll.title}</h2>
      <p>{poll.description}</p>

      <form onSubmit={handleVote}>
        <div className="options-list">
          {poll.Options?.map((options) => (
            <label key={options.id} style={{ display: 'block', margin: '10px 0' }}>
              <input
                type="radio"
                name="poll-option"
                value={options.id}
                onChange={(e) => setSelectedOptionId(e.target.value)}
              />
              {option.text}
            </label>
          ))}
        </div>

        <button type="submit">Vote</button>
      </form>
    </div>
  );
}