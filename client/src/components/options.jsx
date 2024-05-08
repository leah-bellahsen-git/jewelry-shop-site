import { useState } from "react";
import BasicDemo from "./view3"
import HeadlessDemo from "./login2";



const Options = () => {

    const [flag2, setFlag2] = useState(true)
    const [flagShop, setFlagShop] = useState(false)
    const [flagHome, setFlagHome] = useState(false)

    const user = { userName: "aaa" }


    return (

        <>
            {flagShop && <BasicDemo user={user} />}
            {flagHome && <HeadlessDemo/>}
            {flag2 && <div>
                <h2>hello!</h2>
                <button onClick={() => { setFlagShop(true); setFlag2(false) }}>לקניה</button>
                <br />
                <button>להזמנות אחרונות</button> <br />
                <button>לעידכון פרטים</button><br />
                <button onClick={()=>{setFlagHome(true); setFlag2(false) }}>לדף הבית</button><br />
            </div>}
        </>
    )

}
export default Options