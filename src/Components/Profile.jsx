import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verificarSesion } from '../Redux/Actions/actions';
import Navbar from './Navbar';
import style from '../Styles/profileStyles.module.css'


const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [verificado, setVerificado] = useState(false);
    const usuarioLogued = useSelector(state => state.user);

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

    //Formatear fecha:
    const fechaCompleta = usuarioLogued.fn;
    const fecha = new Date(fechaCompleta);
    const opcionesDeFormato = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const fechaFormateada = fecha.toLocaleDateString(undefined, opcionesDeFormato);

    //calcular edad:
    const fechaActual = new Date();
    const diferenciaMilisegundos = fechaActual - fecha;
    const milisegundosEnUnAnio = 1000 * 60 * 60 * 24 * 365.25; // Considera años bisiestos
    const edad = Math.floor(diferenciaMilisegundos / milisegundosEnUnAnio);
    //------------------

    return (
        <div>
            {
                !verificado ?
                    <div></div>
                    :
                    <div className={style.container}>
                        <Navbar />
                        <div className={style.homeContainer}>

                            <div className={style.detallesContainer}>
                                <h3>Detalles de tu perfil </h3>
                                <div>
                                    <p><strong>Nombre: </strong>{usuarioLogued.full_name}</p>
                                    <p><strong>Email: </strong>{usuarioLogued.email}</p>
                                    <p><strong>Número identidad: </strong>{usuarioLogued.dni}</p>
                                    <p><strong>Fecha nacimiento: </strong>{fechaFormateada}</p>
                                    <p><strong>Edad: </strong>{edad} años</p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
     
        </div>
    );
}

export default Profile;
