import React, { useState } from 'react';
import './PlayerTemplate.css';
import cardNormal from './assets/card-normal.webp';
import cardSelecionado from './assets/card-selected.webp';
import captain from './assets/captain.png';
import { IoClose } from "react-icons/io5";

const PlayerTemplate = ({
    jogador,
    x,
    y,
    posicaoNome,
    posicaoId,
    selecionado,
    jogadorSelecionado,
    setJogadorSelecionado,
    removerTitular,
    capitao,
    setCapitao
}) => {
    const handleClick = () => {
        selecionado
            ? setJogadorSelecionado({ posicaoId: null, jogadorId: null })
            : setJogadorSelecionado({ posicaoId: posicaoId, jogadorId: jogador?.id });
    }

    // Se não houver jogador selecionado, retornar apenas o esquemaId, pois será o local onde o suplente ocupará
    // Se houver jogador selecionado, retornar o jogadorId e o esquemaId, pois será o local onde o jogador será substituído
    // E o jogador titular retornará para o banco

    return (
        <div
            onClick={handleClick}
            className={`player-template ${selecionado ? 'selecionado' : ''}`}
            style={{
                left: `${x}%`,
                top: `${y}%`,
            }}>
            {selecionado && jogador?.id
                ?
                <div className='player-template-menu'>
                    <div
                        onClick={() => removerTitular(jogadorSelecionado)}
                    ><IoClose />
                    </div>
                    <div
                        onClick={() => setCapitao(jogadorSelecionado)}
                    >C</div>
                </div>
                : null
            }
            <div
                className={`player-template-card ${selecionado ? 'selecionado' : ''}`}
                style={{
                    backgroundImage: `url(${selecionado ? cardSelecionado : cardNormal})`,
                }}
            >
                {
                    jogador ? (

                        <>
                            <div className='player-template-card-captain'>
                                {jogador?.id === capitao ? <img src={captain} /> : null}
                            </div>
                            <div className='player-template-card-name'> {jogador.nome} </div>
                            <div className='d-flex justify-content-around align-items-center'>
                                <div className='player-template-card-position'> {jogador.posicao} </div>
                                <div className='player-template-card-overall'> {jogador.geral} </div>
                            </div>
                            <div className='d-flex justify-content-around'>
                                <div className="nacionalidade">BRA</div>
                                <div className="time-favorito">PAL</div>
                            </div>
                        </>
                    ) : (
                        <span className='player-template-vaga-vazia'>+</span>
                    )
                }
            </div>
            <div className="player-template-position">
                <span className="player-template-position-span">
                    {posicaoNome}
                </span>
            </div>
        </div >
    );
};

export default PlayerTemplate;