export default function VolumeBar({ initialVolume, onChange }) {
  return (
    <input
      type="range"
      min="0"
      max="100"
      value={initialVolume}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
