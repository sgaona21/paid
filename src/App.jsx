import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import ExpensePage from './ExpensePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ExpensePage />
  )

}

export default App;
