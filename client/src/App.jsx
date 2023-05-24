import { useEffect, useState } from 'react';
import './index.css';
import io from 'socket.io-client';

function App() {
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState('');
  const [userList, setUserList] = useState([]);
  const [socket, setSocket] = useState(null); // Store socket in component state

  useEffect(() => {
    const newSocket = io('http://localhost:3000');

    setSocket(newSocket); // Set the socket in component state

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Event listener for receiving gamble result
    newSocket.on('gambleResult', (result) => {
      console.log('Received gamble result:', result);
      // Update the relevant component with the received result
    });

    newSocket.on('users', (result) => {
      setUserList(result);
      console.log(result);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const serverCall = () => {
    const betAmount = 100; // Replace with the actual bet amount from your component
    socket.emit('placeBet', betAmount);
    socket.emit('getUsers');
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
}

export default App;