import { useState } from 'react';
import './App.css'
import Modal from './components/Modal/Modal';
import MemoryGame from './page/MemoryGame'
import MemoryGamePage from './page/MemoryGamePage';

function App() {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  }

  const hideModal = () => {
    setShow(false);
  }

  return (
    <>
      <button onClick={() => showModal()}>Show</button>
      <Modal show={show} onClose={hideModal}>
        <p>Hola</p>
      </Modal>
      <MemoryGame />
    </>
  )
}

export default App
