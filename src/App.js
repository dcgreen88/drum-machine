import drumSounds from './audioData.js';
import DrumPad from './components/DrumPad.jsx';
import Display from './components/Display.jsx';
import Switch from './components/Switch.jsx';
import VolumeBar from './components/VolumeBar.jsx';
import { useEffect, useState } from 'react';

function App() {
  //various state
  const [display, setDisplay] = useState('');
  const [power, setPower] = useState(false);
  const [bank, setBank] = useState(false);
  const [volume, setVolume] = useState(50);

  //Add function to each button that plays the audio file
  function playAudio(key) {
    if (power) {
      //Prevents audio when power is off
      const drumKey = drumSounds.find(
        (drum) => drum.keyTrigger === key.toUpperCase() //searches array for object with exact key
      );
      if (drumKey) {
        const audio = document.getElementById(drumKey.keyTrigger);
        setDisplay(drumKey.id);
        if (audio) {
          //if the key exists it selects the audio-element which has id-keytrigger and plays
          audio.currentTime = 0;
          audio.play();
        }
      }
    }
  }

  //Add off/on for Power and Bank switches
  function onOff(id) {
    if (id === 'power') {
      setPower(!power);
      if (power) {
        //if power is set back to off, clears display
        setDisplay('');
      }
    } else {
      setBank(!bank);
      if (bank) {
        setDisplay('Heater Kit');
      } else {
        setDisplay('Smooth Piano Kit');
      }
    }
  }

  //Add a volume manager
  function handleVolumeChange(newVolume) {
    setVolume(newVolume);

    document
      .querySelectorAll('audio')
      .forEach((audio) => (audio.volume = newVolume / 100));
  }

  //Adds eventlistener to page after the app loads
  useEffect(() => {
    //function to be passed to keydown listener
    function handleKeyPress(event) {
      playAudio(event.key);
    }

    //add keydown listener to entire page to trigger audioplay
    document.addEventListener('keydown', handleKeyPress);

    //removes the eventlistener when we leave page for cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div
      id="app"
      className="flex justify-center h-screen items-center bg-neutral-400"
    >
      <div
        id="drum-machine"
        className="max-w-[660px] w-[660px] max-h-[316px] h-[316px] flex border-4 border-yellow-500 bg-neutral-300 p-[10px] justify-between"
      >
        <div id="drum-pads" className="grid grid-cols-3 p-[10px] max-h-[272px]">
          {drumSounds.map((drum) => (
            <DrumPad
              key={drum.id}
              id={drum.id}
              keyTrigger={drum.keyTrigger}
              url={drum.url}
              playAudio={playAudio}
            />
          ))}
        </div>
        <div
          id="controls"
          className="flex flex-col justify-around items-center border border-black w-[240px] font-bold"
        >
          <div id="power">
            Power
            <Switch onOff={power} onClick={() => onOff('power')} />
          </div>
          <Display display={display} />
          <VolumeBar initialVolume={volume} onChange={handleVolumeChange} />
          <div id="bank">
            Bank
            <Switch
              onOff={bank}
              onClick={() => (power ? onOff('bank') : null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
