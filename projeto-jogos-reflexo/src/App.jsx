import { useState, useEffect } from "react";
import Semaforo from "./components/semaforo";
import "./index.css";

const luzes = 5;
const luzDelay = 720;

export default function App() {
  const [fase, setFase] = useState();
  const [luzAtiva, setLuzAtiva] = useState(0);
  const [clicar, setClicar] = useState(false);
  const [mensagem, setMensagem] = useState("Clique em 'Iniciar Corrida'");
  const [placar, setPlacar] = useState({ player1: 0, player2: 0 });

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
          setClicar(true);
        }, 1000);
        return () => clearTimeout(greenTimer);
      }
    }
  }, [luzAtiva, fase]);

  function largada() {
    setLuzAtiva(0);
    setFase("red");
    setMensagem("Preparar...");
    setClicar(false);
  }

  function click(jogador) {
    if (!fase) return;

    if (!clicar) {
      setMensagem(`Jogador ${jogador} queimou a largada! Ponto para o adversário.`);
      if (jogador === 1) {
        setPlacar((p) => ({ ...p, player2: p.player2 + 1 }));
      } else {
        setPlacar((p) => ({ ...p, player1: p.player1 + 1 }));
      }
      setClicar(false);
      setFase(null);
    } else {
      setMensagem(`Jogador ${jogador} venceu!`);
      if (jogador === 1) {
        setPlacar((p) => ({ ...p, player1: p.player1 + 1 }));
      } else {
        setPlacar((p) => ({ ...p, player2: p.player2 + 1 }));
      }
      setClicar(false);
      setFase(null);
    }
  }

  return (
    <div className="main">
        <div className="header">
          <h2>Placar</h2>
          <p><span>Jogador 1:</span> {placar.player1} pontos</p>
          <p><span>Jogador 2:</span> {placar.player2} pontos</p>
        </div>
      <h1>Jogo de Reflexo</h1>

      <div className="luzes">
        {Array.from({ length: luzes }).map((_, index) => (
          <Semaforo
            key={index}
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

      <div className="btn-players">
        <button onClick={() => click(1)}>Jogador 1</button>
        <button onClick={() => click(2)}>Jogador 2</button>
      </div><br />

      <button onClick={largada} className="btn-start">
        Iniciar Corrida
      </button>
    </div>
  );
}
