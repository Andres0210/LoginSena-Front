import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verificarSesion } from '../Redux/Actions/actions';
import Navbar from './Navbar';
import style from '../Styles/homeStyles.module.css'

const Home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [verificado, setVerificado] = useState(false);
    // const usuarioLogued = useSelector(state => state.user);

    useEffect(() => {

        const verificar = async () => {
            const resultado = await dispatch(verificarSesion());
            console.log("verificando: ", resultado.data);
            setVerificado(resultado.data.logued);
            if (!resultado.data.logued) {
                navigate('/');
            } else {
                console.log('bienvenido a su sesión');
            }
        };

        verificar();
    }, []);
    return (
        <div>
            {
                !verificado ?
                    <div></div>
                    :
                    <div className={style.container}>
                        <Navbar />
                        <div className={style.homeContainer}>
                            <h2>Esta será la Home de la Página</h2>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Home;
