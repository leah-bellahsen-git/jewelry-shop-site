import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import '../styles/register.css';
import useAxios from "axios-hooks"
import useHTTP from '../Hooks/useHttp';
import HomePage from './homePage';
import { useRegisterMutation } from '../features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Register = () => {
    const [registerFunc, { isError, isSuccess, isLoading, data, error }] = useRegisterMutation()
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            if (isError)
                console.log("error on login");
            console.log("success!!!")
            navigate("/login")
        }
    }, [isSuccess])

    useEffect(() => {
        if (error)
            alert(error)
    }, [error])
    // const [{ data, loading, error }, refetch] = useAxios('http://localhost:4444/api/user')
    // const {delItem, updateItem, addItem} = useHTTP('user')

    const [showMessage, setShowMessage] = useState(false);
    // const [formData, setFormData] = useState({});
    const defaultValues = {
        userName: '',
        email: '',
        password: '',
        address: '',
        phone:''
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const onSubmit = async (data2) => {

        registerFunc(data2)

        // setFormData(data);
        console.log('data from submit', data2);
        //send the data to server
        // const response = await addItem(data2)
        // console.log(response)
        alert(`Hello to ${data2.userName}, , you have successfully entered to the website`)
        navigate('/login')
        setShowMessage(true);
        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return (<>
        <div className="form-demo">
            {/* <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                    </p>
                </div>
            </Dialog> */}

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Register</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="userName" control={control} rules={{ required: 'userName is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="userName" className={classNames({ 'p-error': errors.name })}>userName*</label>
                            </span>
                            {getFormErrorMessage('userName')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="email" control={control}
                                    rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} footer={passwordFooter} />
                                )} />
                                <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="phone" control={control}
                                    rules={{ pattern: { value: /[0-9._%+-]/i, message: 'Invalid characters' }, minLength:9, maxLength:10} }
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.phone} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="phone" className={classNames({ 'p-error': !!errors.phone })}>Phone</label>
                            </span>
                            {getFormErrorMessage('phone')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="address" control={control}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.address} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="address" className={classNames({ 'p-error': !!errors.address })}>Address</label>
                            </span>
                            {getFormErrorMessage('address')}
                        </div>
                        <Button type="submit" label="Submit" className="mt-2" />
                    </form>
                </div>
            </div>
        </div></>
    );
}


export default Register