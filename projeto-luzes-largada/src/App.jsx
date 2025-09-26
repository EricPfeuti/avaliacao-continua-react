import { useState, useEffect } from "react";
import Semaforo from "./components/semaforo";
import "./index.css";

const luzes = 5;
const luzDelay = 720;

export default function App() {
  const [fase, setFase] = useState();
  const [luzAtiva, setLuzAtiva] = useState(0);
  const [mensagem, setMensagem] = useState("Clique em Iniciar Corrida");

  useEffect(() => {
    if (fase === "red") {
      if (luzAtiva < luzes) {
        const timer = setTimeout(() => {
          setLuzAtiva((prev) => prev + 1);
        }, luzDelay);
        return () => clearTimeout(timer);
      } else {
        const greenTimer = setTimeout(() => {
          setFase("green");
          setMensagem("GO!");
        }, 1000);
        return () => clearTimeout(greenTimer);
      }
    }
  }, [luzAtiva, fase]);

  function largada() {
    setLuzAtiva(0);
    setFase("red");
    setMensagem("Preparar...");
  };

  return (
    <div className="main">
      <h1>Luzes de Largada</h1>

      <div className="luzes">
        {Array.from({ length: luzes }).map((_, index) => (
          <Semaforo key={index} 
          color={
            fase === "green"
                ? "green"
                : index < luzAtiva
                ? "red"
                : "off"
            }
          />
        ))}
      </div>

      <h2>{mensagem}</h2><br />

      <button onClick={largada} className="btn-start">
        Iniciar Corrida
      </button>
    </div>
  );
}
