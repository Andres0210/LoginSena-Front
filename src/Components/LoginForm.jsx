import React, { useEffect, useState } from 'react';
import style from '../Styles/loginForm.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { getUserByEmail, loginUser, verificarSesion } from '../Redux/Actions/actions';
import Swal from 'sweetalert2';


const LoginForm = () => {

    const navigate = useNavigate();
    const [verificado, setVerificado] = useState(true);
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

    const handleInputChange = (event) => {

        const { name, value } = event.target;
        setUsuario({
            ...usuario,
            [name]: value
        })
    }

    useEffect(() => {
        const verificar = async () => {

            const resultado = await dispatch(verificarSesion());
            setVerificado(resultado.data.logued);
            if (resultado.data.logued) {
                navigate('/home')
            }
        };

        verificar();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const respuesta = await dispatch(loginUser(usuario));
        console.log(respuesta);
        if (respuesta.response) {
            if (!respuesta.response.data.access) {
                Swal.fire('Error de ingreso:', respuesta.response.data.error, 'error');
            }
        } else {
            dispatch(getUserByEmail(usuario.email))
            navigate('/home');
        }
    }

    return (
        <div class="container">
            {verificado ?
                <div></div> :
                <div className={style.container}>
                    {/* <div className={style.loginContent}>
                <h2>PAGINA PRINCIPAL</h2>
            </div> */}

                    <div className={style.formContainer}>
                        <div className={style.imageLogin}>
                            <div className={style.contenido}>
                                <h2>MediGuardPro</h2>
                                <h3>Tu Solución Integral de Gestión de Mantenimiento Biomédico</h3>
                                <p className={style.description}>
                                    MediGuardPro es tu aliado en la gestión eficiente y efectiva de equipos
                                    biomédicos. Nuestra plataforma te permite llevar un control total de tus activos
                                    médicos, desde el registro hasta el mantenimiento, para que puedas centrarte en
                                    brindar la mejor atención médica.
                                </p>
                                <div className={style.toDo}>
                                    {/* <h4>¿Qué puedes hacer con MediGuardPro?</h4> */}
                                    <div className={style.listaImg}>
                                        {/* <ul>
                                    <li><p><strong>Registro y control: </strong> Registra todos tus equipos biomédicos de
                                        manera organizada y detallada. Mantén un inventario completo con un solo clic.</p></li>
                                    <li><p><strong>Mantenimiento Preventivo y Correctivo: </strong> Planifica y realiza
                                        mantenimientos preventivos y correctivos de manera proactiva. Evita fallas inesperadas y
                                        garantiza la disponibilidad de tus equipos.</p></li>
                                    <li><p><strong>Informes y Reportes: </strong> Anexa informes de servicios y mantenimientos
                                        para llevar un historial completo. Genera informes detallados con un simple vistazo.</p></li>
                                    <li><p><strong>Notificaciones y Alertas: </strong> Recibe notificaciones de tareas pendientes
                                        y mantenimientos programados. Nunca te perderás una fecha importante.</p></li>
                                    <li><p><strong>Acceso en Cualquier Momento y Lugar: </strong> Accede a tus datos desde cualquier
                                        dispositivo y en cualquier lugar. La gestión de equipos biomédicos nunca ha sido tan flexible.</p></li>
                                </ul> */}
                                        {/* <img src={imagenMedicos} alt='' /> */}
                                    </div>
                                </div>


                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className={style.form}>
                            <h3>Iniciar Sesión</h3>
                            <div>
                                <input
                                    className={style.entradas}
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={usuario.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder='correo electrónico'
                                />
                            </div>
                            <div>
                                <input
                                    className={style.entradas}
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={usuario.password}
                                    onChange={handleInputChange}
                                    required
                                    placeholder='contraseña'
                                />
                            </div>
                            <div>
                                <button className={style.btnsesion} type='submit'>CONTINUE</button>
                                <div>
                                    <p>No tienes una cuenta? <Link to='/registro'>Registrar</Link> </p>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            }

        </div>
    );
}

export default LoginForm;
