import '../index.css';

export default function Semaforo({ color }) {
  const luz = {
    backgroundColor:
      color === "red" ? "red" : color === "green" ? "green" : "#333",
  };

  return <div className="luz" style={luz}></div>;
}
