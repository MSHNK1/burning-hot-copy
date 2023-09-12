import { useState } from 'react';
import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Layout from './components/layout/layout';
import { AudioContext } from './utility/AudioContext';

function App() {
  const [isMuted, setMuted] = useState(true);

  const toggleMute = () => {
    setMuted((prevState) => !prevState);
  };

  return (
    <>
      <AudioContext.Provider value={{isMuted, toggleMute}}>
        <Header />
        <Layout />
        <Footer />
      </AudioContext.Provider>
    </>
  )
}

export default App;