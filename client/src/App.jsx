import { useEffect, useState } from 'react'
import './index.css'
import io from 'socket.io-client'

function App() {
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState('');
  let socket;
  useEffect(() => {
    socket = io('http://localhost:3000')

    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Event listener for receiving gamble result
    socket.on('gambleResult', (result) => {
      console.log('Received gamble result:', result);
      // Update the relevant component with the received result
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const serverCall = () => {
    const betAmount = 100; // Replace with the actual bet amount from your component
    socket.emit('placeBet', betAmount);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="h-1/2 w-1/2 items-center justify-center text-center flex flex-col">
        <span>Balance: {balance}</span>
        <span>User: {userId}</span>
        <button onClick={serverCall}>Click here</button>
      </div>
    </div>
  );
};

export default App
