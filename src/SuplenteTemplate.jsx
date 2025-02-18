import React from 'react';

const SuplenteTemplate = ({
    jogador,
    selecionado,
    setSuplenteSelecionado,
}) => {

    const handleClick = () => {
        selecionado
            ? setSuplenteSelecionado(null)
            :
            setSuplenteSelecionado(jogador.id);
    }

    return (
        <li className={`jogador ${selecionado ? 'selecionado' : ''}`}
            key={jogador.id}
            onClick={handleClick}>
            <span className='jogador-nome'>{jogador.nome}</span>
            <span className="jogador-posicao">{jogador.posicao}</span>
            <span className="jogador-geral">{jogador.geral}</span>
        </li>
    );
}

export default SuplenteTemplate;