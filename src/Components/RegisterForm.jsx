import React, { useEffect, useState } from 'react';
import style from '../Styles/registerForm.module.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { verificarSesion } from '../Redux/Actions/actions';
import { useDispatch } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';


const RegisterForm = () => {

    const [selectedDate, setSelectedDate] = useState(null);


    const navigate = useNavigate();
    const [verificado, setVerificado] = useState(true);
    const [user, setUser] = useState({
        full_name: '',
        email: '',
        dni: '',
        fn: null,
        password: ''
    });

    const dispatch = useDispatch();

    useEffect(() => {
        const verificar = async () => {

            const resultado = await dispatch(verificarSesion());
            setVerificado(resultado.data.logued);
            if (resultado.data.logued) {
                navigate('/home')
            }
        };

        verificar();
        console.log('fecha: ', dayjs());
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3001/users', user)
            .then((response) => {
                console.log('Registro exitoso');
                console.log('Respuesta del servidor:', response.data);
                Swal.fire(
                    'Registro exitoso', 'Por favor inicia sesión', 'success'
                )
                setUser({
                    full_name: '',
                    email: '',
                    dni: '',
                    fn: '',
                    password: ''
                })
                navigate('/');

            })

            .catch((error) => {
                console.log(error.response.data.error);
                Swal.fire(
                    'Error al realizar el registro: ', error.response.data.error, 'error'
                )
            })

    }


    return (
        <div>
            {verificado ? <div></div>
                :
                <div className={style.fondoContainer}>
                    <div className={style.formContainer} >
                        <div className={style.imageLogin}></div>
                        <form onSubmit={handleSubmit} className={style.form}>
                            <fieldset>
                                <legend>Registro</legend>
                                <div class="form-group">
                                    <label for="full_name" class="form-label mt-4">Nombre completo</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="full_name"
                                        name='full_name'
                                        onChange={handleInputChange}
                                        required
                                        value={user.full_name}
                                        placeholder="Ingrese nombre completo" />
                                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>

                                <div class="form-group">
                                    <label for="email" class="form-label mt-4">Correo electrónico</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="email"
                                        name='email'
                                        aria-describedby="emailHelp"
                                        placeholder="Ingrese email"
                                        value={user.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>

                                <div class="form-group">
                                    <label for="dni" class="form-label mt-4">Documento de identidad</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="dni"
                                        name='dni'
                                        onChange={handleInputChange}
                                        required
                                        value={user.dni}
                                        placeholder="Ingrese documento" />
                                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>

                                <div class="form-group mt-4">
                                    <label for='fn'>Fecha de nacimiento</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} class="form-control " >
                                        <DemoContainer components={['DatePicker']} >
                                            <DatePicker
                                                maxDate={dayjs('2023-12-31')}
                                                value={user.fn}
                                                TextFieldComponent={(props) => (
                                                    <TextField {...props} readOnly />
                                                )}
                                                onChange={(newValue) => {
                                                    if(!newValue){
                                                        newValue = new Date()
                                                    }else{
                                                        setUser({
                                                        ...user,
                                                        fn: newValue.format('MM-DD-YYYY')
                                                    })
                                                    }
                                                   
                                                }}
                                            />

                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>

                                <div class="form-group">
                                    <label for="password" class="form-label mt-4">Contraseña</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="password"
                                        name='password'
                                        onChange={handleInputChange}
                                        required
                                        value={user.password}
                                        placeholder="Password"
                                        autocomplete="off" />
                                </div>

                                <div className={style.botonGroup}>
                                    <button type="submit" class="btn btn-primary">Registrarse</button>
                                    <div>
                                        <p>Ya estás registrado? <Link to='/'>Login</Link></p>
                                    </div>
                                </div>
                            </fieldset>
                            {/* <div className={style.formGroup}>
                                <label htmlFor='full_name'>Nombre completo</label>
                                <input
                                    className={style.entradas}
                                    id='full_name'
                                    name='full_name'
                                    value={user.full_name}
                                    onChange={handleInputChange} required
                                    placeholder='Nombre'
                                />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor='email'>Correo electrónico</label>
                                <input
                                    className={style.entradas}
                                    id='email'
                                    name='email'
                                    value={user.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder='Email'
                                />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor='dni'>Documento de identidad</label>
                                <input
                                    className={style.entradas}
                                    id='dni'
                                    name='dni'
                                    value={user.dni}
                                    onChange={handleInputChange}
                                    required
                                    placeholder='Documento de identidad'
                                />
                            </div>
                            <div className={style.formGroup}> */}


                            {/* <input
                                    className={style.entradas}
                                    id='fn'
                                    name='fn'
                                    value={formatDate(selectedDate)} readOnly
                                    onChange={handleInputChange}
                                    required
                                    placeholder='mm-dd-aaaa'
                                /> */}
                            {/* </div>
                            <div className={style.formGroup}>
                                <label htmlFor='password'>Contraseña</label>
                                <input
                                    className={style.entradas}
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={user.password}
                                    onChange={handleInputChange}
                                    required
                                    placeholder='Contraseña'
                                />
                            </div>
                            <div className={style.botonGroup}>
                                <button className={style.btnsesion} type='submit'>Enviar</button>
                                <div>
                                    <p>Ya estás registrado? <Link to='/'>Login</Link></p>
                                </div>
                            </div> */}

                        </form>
                    </div>
                </div>
            }

        </div>
    );
}

export default RegisterForm;
