import React, { useState } from 'react';
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";


const TeamSettings = ({ formacoes }) => {
    const [mostrarFormacoes, setMostrarFormacoes] = useState(false);

    return (
        <div className='definicoes'>
            <p className='text-white'>Formações</p>
            <div className='seletor-formacao' onClick={() => setMostrarFormacoes(!mostrarFormacoes)}>
                <span>5-3-2</span>
                {mostrarFormacoes ? <IoChevronDownOutline /> : <IoChevronUpOutline />}
            </div>
            {mostrarFormacoes
                ? <div className="formacoes">
                    {Object.entries(formacoes).map(([formacaoNome,]) => {
                        return (
                            <span className='formacao-item' key={formacaoNome}>{formacaoNome}</span>
                        )
                    })}
                </div>
                : null
            }
        </div>
    )

}

export default TeamSettings;