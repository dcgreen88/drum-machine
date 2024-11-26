export default function Switch({ onOff, onClick }) {
  return (
    <div
      id="switch"
      className="flex max-h-[24px] w-[50px] border border-black justify-center bg-black p-[2px]"
      onClick={onClick}
    >
      <div
        id="off"
        className={`h-[19px] flex-auto ${!onOff ? 'bg-blue-500' : 'bg-black'}`}
      ></div>
      <div
        id="on"
        className={`h-[19px] flex-auto ${onOff ? 'bg-blue-500' : 'bg-black'}`}
        onClick={onClick}
      ></div>
    </div>
  );
}
