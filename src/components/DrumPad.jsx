export default function DrumPad({ id, keyTrigger, url, playAudio }) {
  //KeyTrigger is the most important prop
  return (
    <button
      className="drum-pad w-[100px] shadow-[4px_4px_4px_1px_rgba(0,0,0,.8)] rounded m-[4px] bg-gray-500 font-bold"
      id={id}
      //add a function to call our playAudio function so we can set the key
      onClick={() => playAudio(keyTrigger)}
    >
      {keyTrigger}
      <audio id={keyTrigger} className="clip" src={url} />
    </button>
  );
}
