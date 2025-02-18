import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { jogadores } from './assets/formacao.js';
import PlayerTemplate from './PlayerTemplate';
import SuplenteTemplate from './SuplenteTemplate.jsx';

function App() {
  const [formacoes, setFormacoes] = useState({
    "4-3-3": [
      { id: 1, x: 50, y: 82, posicao: "GL", jogadorId: null },
      { id: 2, x: 30, y: 76, posicao: "ZGE", jogadorId: null },
      { id: 3, x: 70, y: 76, posicao: "ZGD", jogadorId: null },
      { id: 4, x: 11.5, y: 75, posicao: "LE", jogadorId: null },
      { id: 5, x: 88.5, y: 75, posicao: "LD", jogadorId: null },
      { id: 6, x: 50, y: 52.6, posicao: "VOL", jogadorId: null },
      { id: 7, x: 23, y: 48, posicao: "MC", jogadorId: null },
      { id: 8, x: 77, y: 48, posicao: "MC", jogadorId: null },
      { id: 9, x: 50, y: 15.5, posicao: "ATA", jogadorId: null },
      { id: 10, x: 19.5, y: 19, posicao: "PE", jogadorId: null },
      { id: 11, x: 80.5, y: 19, posicao: "PD", jogadorId: null },
    ]
  });
  const [formacaoAtual, setFormacaoAtual] = useState("4-3-3");
  const [time, setTime] = useState({
    capitao: null,
    suplentes: jogadores,
    titulares: [],
  }
  );
  const [jogadorSelecionado, setJogadorSelecionado] = useState({ posicaoId: null, jogadorId: null });
  const [suplenteSelecionado, setSuplenteSelecionado] = useState(null);

  // useEffect(() => {
  //   setTime((prevTime) => ({ ...prevTime, suplentes: jogadores }));
  // }, []);

  // É chamado sempre que o estado de jogadorSelecionado e suplenteSelecionado é alterado.
  useEffect(() => {
    if (jogadorSelecionado.posicaoId !== null && suplenteSelecionado !== null) {
      setTimeout(() => {
        handleSubstituicao(jogadorSelecionado, suplenteSelecionado);
      }, 0);
    }
  }, [jogadorSelecionado, suplenteSelecionado]);

  const handleSubstituicao = (jogadorSelecionado, suplenteSelecionado) => {

    setFormacoes((prevFormacoes) => ({
      ...prevFormacoes,
      // Percorre a formação atual para saber qual jogador foi selecionado pelo usuário,
      // então a posição selecionada recebe o suplenteSelecionado
      // senão a posição e jogador são mantidos
      [formacaoAtual]:
        prevFormacoes[formacaoAtual].map((posicao) =>
          posicao.id === jogadorSelecionado.posicaoId
            ? { ...posicao, jogadorId: suplenteSelecionado }
            : posicao
        ),
    }));

    setTime((prevTime) => {
      // Obtém o objeto suplente, percorrendo a lista de suplentes, 
      // usando o estado suplenteSelecionado como parâmetro para a busca.
      const suplente = prevTime.suplentes.find(j => j.id === suplenteSelecionado);

      // Obtém o jogador a ser substituido, 
      // tendo o jogadorSelecionado como parâmetro para a busca, dentro da lista de titulares.
      const jogadorSubstituido = prevTime.titulares.find(j => j.id === jogadorSelecionado.jogadorId);

      return {
        ...prevTime,
        // O map() é responsável por retornar uma nova lista substituindo o titular pelo suplente,
        // caso a condição seja satisfeita
        titulares:
          jogadorSubstituido
            ? prevTime.titulares.map(j =>
              j.id === jogadorSelecionado.jogadorId
                ? suplente
                : j
            )
            // Enquanto que, se não houver um jogador a ser substituido, 
            // o suplente será apenas adicionado à lista de titulares
            : [...prevTime.titulares, suplente],

        // Se houver um jogadorSubstituido, a lista de suplentes remove o suplenteSelecionado 
        // e adiciona o primeiro aos suplentes
        // senão, apenas remove o jogador suplente da lista
        suplentes: jogadorSubstituido
          ? [...prevTime.suplentes, jogadorSubstituido].filter(j => j.id !== suplenteSelecionado)
          : prevTime.suplentes.filter(j => j.id !== suplenteSelecionado),
      };
    });

    setJogadorSelecionado({ posicaoId: null, jogadorId: null });
    setSuplenteSelecionado(null);
  }

  const removerTitular = (jogadorSelecionado) => {
    const jogadorRemovido = time.titulares.find(j => j.id === jogadorSelecionado.jogadorId);

    setFormacoes((prevFormacoes) => ({
      ...prevFormacoes,
      [formacaoAtual]:
        prevFormacoes[formacaoAtual].map((posicao) =>
          posicao.id === jogadorSelecionado.posicaoId
            ? { ...posicao, jogadorId: null }
            : posicao
        ),
    }))

    setTime((prevTime) => {

      return {
        ...prevTime,
        titulares: prevTime.titulares.filter(t => t.id !== jogadorSelecionado.jogadorId),
        suplentes: [...prevTime.suplentes, jogadorRemovido]
      }
    })
  }

  return (
    <div className="m-auto w-75 d-flex">
      {/* <div className='p-5 border'>
        <p>Formação</p>
        <Form.Select size='sm' onChange={e => onFormationChange(e)}>
          <option disabled>Selecione uma formação</option>
          {formacao.map(item => (
            <option key={item.id} value={item.id}>{item.display}</option>
          ))}
        </Form.Select>
      </div> */}
      <div className="banco">
        <ul>
          {time.suplentes.map(jogador => (
            <SuplenteTemplate jogador={jogador}
              key={jogador.id}
              selecionado={suplenteSelecionado === jogador.id}
              suplenteSelecionado={suplenteSelecionado}
              jogadorSelecionado={jogadorSelecionado}
              setSuplenteSelecionado={setSuplenteSelecionado}
              handleSubstituicao={handleSubstituicao}
            />
          ))
          }

        </ul>
      </div>
      <div className='campo'>
        <div className="campo-imagem"></div>
        <div>
          {

            formacoes[formacaoAtual].map((posicao) => {
              const jogador = time.titulares.find(j => j.id === posicao.jogadorId);

              return (
                <PlayerTemplate
                  key={posicao.id}
                  x={posicao.x}
                  y={posicao.y}
                  posicaoId={posicao.id}
                  posicaoNome={posicao.posicao}
                  jogador={jogador}
                  selecionado={jogadorSelecionado.posicaoId === posicao.id}
                  jogadorSelecionado={jogadorSelecionado}
                  suplenteSelecionado={suplenteSelecionado}
                  setJogadorSelecionado={setJogadorSelecionado}
                  handleSubstituicao={handleSubstituicao}
                  removerTitular={removerTitular}
                />
              )
            })
          }
        </div>
      </div>
      <div className='definicoes'>
        
      </div>
    </div>
  )
}

export default App
