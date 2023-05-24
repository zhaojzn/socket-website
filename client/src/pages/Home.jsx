import React from 'react'
import { useEffect, useState, useContext} from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { currentUser } = useContext(AuthContext);

    const [balance, setBalance] = useState(0);
    const [userId, setUserId] = useState('');
    const [userList, setUserList] = useState([]);
    const [socket, setSocket] = useState(null); // Store socket in component state
  
    useEffect(() => {
      const newSocket = io('http://localhost:3000');
      setSocket(newSocket); // Set the socket in component state
      newSocket.on('connect', () => {
        console.log('Connected to server');
        setUserId(currentUser.uid); // Set the generated ID as the user ID
        newSocket.emit('join', currentUser.uid); // Send the generated ID when joining
        newSocket.emit('getUsers'); // Send the generated ID when joining
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
        newSocket.disconnect(currentUser.uid);
      };
    }, []);
  
    const serverCall = () => {
      const betAmount = 100; // Replace with the actual bet amount from your component
      socket.emit('placeBet', betAmount);
    };
  
    return (
      <div className="h-screen flex items-center justify-center bg-bg">
        <div className="h-1/2 w-1/2 bg-white rounded-lg items-center justify-center text-center flex flex-col">
          <span>Balance: {balance}</span>
          <span>User: {userId}</span>
          <span>Connected Users:</span>
          {userList.map((user) => (
            <div key={user}>
              <p>{user}</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Home