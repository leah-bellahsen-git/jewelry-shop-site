import { Editor } from "primereact/editor"
import { useRef, useState } from "react";
import { Tag } from "antd"
import { useNavigate } from "react-router-dom";


const Comment = ()=>{

    const [close, setClose] = useState(false);
    const [text, setText] = useState('We will always be happy to hear your comments and clarifications');
    const navigate = useNavigate();

    return(
        
        <>
        
        
         <br />
         <br />
         <br/>
         {
         !close &&
        <h1 className="msg">We will always be happy to hear your comments and clarifications</h1>
         }
        <br/>
        <br/>
       {
        !close && <div className="commit">
            <Editor className="edit" style={{ fontSize: '16px', color: 'black', backgroundColor: 'lightgray', textAlign: 'center' }} value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
        </div>
       }
        
           

    <br/>


    {close  && 
        <h1 className="msg">Your commit send successfully! 😊</h1>}

        {/* navigate('/homePage') */}
        {
            close && <button onClick={()=>{setClose(true);}}>Send</button>

        }
        </>
    )
}

export default Comment
