import { Editor } from "primereact/editor"
import { useState } from "react";


const Comment = ()=>{

    const [text, setText] = useState('');
    return(

        <>
        <br/>
        <br/>
        <br/>
       
        <div className="card">
            <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
        </div>
        </>
    )
}

export default Comment