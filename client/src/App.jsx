import { useState } from 'react'
import './index.css'
import io from 'socket.io-client'
const socket = io('http://localhost:3000')
function App() {


  return (
    <div className="h-screen flex items-center justify-center">
      <div className="h-1/2 w-1/2 items-center justify-center text-center flex flex-col">
        <span>Balance: 0</span>
        <span>User: ID goes here</span>

      </div>
    </div>
  )
}

export default App
