import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/app'

if (process.env.REACT_APP_WEBSOCKET_URL) {
  const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)
  socket.addEventListener('open', () => {
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  })
  window.SWINDLE_TETRAD_SOCKET = socket
} else {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  const noop = () => {}
  const mockSocket = {
    addEventListener: noop,
    removeEventListener: noop,
    send: noop,
  }
  window.SWINDLE_TETRAD_SOCKET = mockSocket
}
