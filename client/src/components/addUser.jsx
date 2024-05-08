

import React, { useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";


import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { Controller, useForm } from "react-hook-form";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";
import { useAddProductMutation } from "../app/appProduct/productApiSlice";
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { useAddUserMutation } from "../app/appUser/userAPiSlice";

export default function AddUser() {
    const [visible, setVisible] = useState(false);


    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [{ data, loading, error }, refetch] = useAxios('http://localhost:4444/api/user')
    // const {delItem, updateItem, addItem, getItem} = useHTTP('user')

    const [addFunc, { data, isLoading, isSuccess, isError, error, refetch }] = useAddUserMutation({})


    const [showMessage, setShowMessage] = useState(false);
    // const [formData, setFormData] = useState({});
    const defaultValues = {
        userName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: ''
    }
    const toast = useRef(null);

    useEffect(() => {
        if (isSuccess) {

        }


    }, [isSuccess])
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = async (data2) => {
        setVisible(false)
        console.log("data2: ", data2);
        addFunc(data2)

        // const role = sessionStorage.getItem("role")
        // console.log("role: ", role);
        // if (role === "admin") {
        //     console.log("yes");
        //     navigate('/adminAppBar')

        // }
        // else {
        //     console.log("no");
        // }


        console.log("toast: ", toast.current)


        console.log('data from submit', data2);
        setShowMessage(true);
        reset();

    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
        };
    };

    const onUpload = () => {
        toast?.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };
    return (
        <div className="card flex justify-content-center">
            <Button label="Add a new user" icon="pi pi-user-plus" onClick={() => setVisible(true)} />
            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-200), var(--primary-700))' }}>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">


                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="userName" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="userName" className={classNames({ 'p-error': errors.name })}>name</label>
                                </span>
                                {getFormErrorMessage('userName')}
                            </div>


                            <div className="field">

                                <span className="p-float-label">
                                    <Controller name="email" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field}
                                            autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="email" className={classNames({ 'p-error': errors.root })}>email</label>
                                </span>


                                {getFormErrorMessage('email')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="password" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="password" className={classNames({ 'p-error': errors.name })}>password</label>
                                </span>
                                {getFormErrorMessage('password')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="phone" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="phone" className={classNames({ 'p-error': errors.name })}>phone</label>
                                </span>
                                {getFormErrorMessage('phone')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="address" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="address" className={classNames({ 'p-error': errors.name })}>address</label>
                                </span>
                                {getFormErrorMessage('address')}
                            </div>

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="role" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="role" className={classNames({ 'p-error': errors.name })}>role</label>
                                </span>
                                {getFormErrorMessage('role')}
                            </div>

                            <br />



                            <div className="card flex justify-content-center">
                                {/* <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload uploadHandler={customBase64Uploader} /> */}
                            </div>
                            <div>
                                {/* <Button type="submit" label="Submit" className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" /> */}
                                <Button type="submit" label="Submit" className="mt-2" />

                                {/* <Button label ="Sign-In" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button> */}

                            </div>

                        </form>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
