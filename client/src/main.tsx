import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { RoomProvider } from './context/room-context.tsx'
import { Home } from './pages/home.tsx'
import { Room } from './pages/room.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoomProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/room/:id' element={<Room />} />
        </Routes>
      </RoomProvider>
    </BrowserRouter>
  </React.StrictMode>,
)