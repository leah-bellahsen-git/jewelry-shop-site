

import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from "primereact/checkbox";
import { Email } from "@mui/icons-material";
import { useLoginUserMutation } from '../app/appUser/userAPiSlice'
import { setToken } from '../authSlice';
import { setName} from '../authSlice';
import { useDispatch } from "react-redux";
import BasicDemo from "../components/view3";
import '../components/login.css'
import { useNavigate } from "react-router-dom";


export default function HeadlessDemo() {
    const [visible, setVisible] = useState(false);
    // const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = {
        userName:"aa",
        password:"11",
        phone:"999",
        Shoppingbasket:[]
      }
      

    const [login, { isError, isSuccess, error, isLoading, data }] = useLoginUserMutation()

    const Login = async () => {
        setVisible(false)
        const userName = document.getElementById("username").value
        const pass = document.getElementById("password").value
        const mail = document.getElementById("email").value
        const phoneNum = document.getElementById("phone").value
        login({ userName: userName, password: pass })
       

    }
    useEffect(() => {
        if (isSuccess) {
            console.log("success");
            console.log(data);
            dispatchEvent(setToken(data))
            console.log("login", login);
            // dispatchEvent(setName(data))
            // navigate("/register")
        }
        console.log(data);
    }, [isSuccess])
    return (
        <div className="card flex justify-content-center">
            <Button label="כניסה"
                onClick={() => setVisible(true)}
                style={{
                    marginTop: "50px", width: '150px', fontSize: '16px'
                    , height: '50px', borderRadius: '10px', marginRight: '5%', backgroundColor: 'white', color: 'black'
                }} />
            <Dialog
                visible={visible}

                modal
                onHide={() => setVisible(false)}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ maxHeight: '750px', borderRadius: '8px', direction: 'rtl', width: '500px', height: '750px', backgroundColor: "white", backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>

                        <span style={{ color: 'black', marginRight: '50%', fontSize: '30px' }}>כניסה</span>
                        <div className="inline-flex flex-column gap-2" style={{ marginTop: '8%', marginRight: '20%' }}>
                            <br />  <br />
                            <label htmlFor="username" className="text-primary-50 font-semibold" style={{ color: 'black', fontSize: '20px' }}>
                                שם משתמש
                            </label>
                            <InputText id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50" style={{ b: "#6e4800", width: '200px', height: '25px', borderRadius: '10px', marginTop: '5%', marginRight: '5%' }}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2" style={{ marginTop: '5%', marginRight: '20%', color: 'black', fontSize: '20px' }}>
                            <label htmlFor="username" className="text-primary-50 font-semibold" style={{ fontFamily: 'cursive' }}>
                                סיסמה
                            </label>
                            <InputText id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="password" style={{ width: '200px', height: '25px', borderRadius: '10px', marginTop: '5%', marginRight: '12.5%' }}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2" style={{ marginTop: '5%', marginRight: '20%', color: 'black', fontSize: '20px' }}>
                            <label htmlFor="email" className="text-primary-50 font-semibold">
                                מייל
                            </label>
                            <InputText id="email" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="email" style={{ width: '200px', height: '25px', borderRadius: '10px', marginTop: '5%', marginRight: '16%' }}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2" style={{ marginTop: '5%', marginRight: '20%', color: 'black', fontSize: '20px' }}>
                            <label htmlFor="phone" className="text-primary-50 font-semibold">
                                טלפון
                            </label>
                            <InputText id="phone" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" style={{ width: '200px', height: '25px', borderRadius: '10px', marginTop: '5%', marginRight: '14%' }}></InputText>
                        </div>
                        {/* <Checkbox onChange={e => setChecked(e.checked)} checked={checked} style={{width:'20px',height:'18px',borderColor:'black',borderStyle:'solid',borderRadius:'5px',marginRight:'20%',marginTop:'5%'}}></Checkbox><span style={{color:'#bd8e17',marginRight:'5%',fontSize:'20px'}}>לקוח </span>
                        <br/>
                        <Checkbox onChange={e => setChecked1(e.checked)} checked={checked1} style={{width:'20px',height:'18px',borderColor:'black',borderStyle:'solid',borderRadius:'5px',marginRight:'20%',marginTop:'5%'}}></Checkbox><span style={{color:'#bd8e17',marginRight:'5%',fontSize:'20px'}}>מזכירה </span>
                        <br/>
                        <Checkbox onChange={e => setChecked2(e.checked)} checked={checked2} style={{width:'20px',height:'18px',borderColor:'black',borderStyle:'solid',borderRadius:'5px',marginRight:'20%',marginTop:'5%'}}>nzfhrv</Checkbox><span style={{color:'#bd8e17',marginRight:'5%',fontSize:'20px'}}>מנהל </span> */}
                        <div className="flex align-items-center gap-2">
                            <Button label="כניסה" onClick={Login} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" style={{ marginTop: "50px", width: '150px', height: '50px', borderRadius: '10px', marginRight: '17%', backgroundColor: 'white', color: 'black' }}></Button>
                            <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" style={{ marginTop: "50px", width: '150px', height: '50px', borderRadius: '10px', marginRight: '5%', backgroundColor: 'white', color: 'black' }}></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}

