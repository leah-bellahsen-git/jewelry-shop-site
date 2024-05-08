import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRef } from 'react';
import { useState } from 'react';

const MediaCard = () => {
    const userNameRef = useRef("")
    const passwordRef = useRef("")

    const login = ()=>{
        return()=>{console.log("aaa");}
    }
    return (
        <Card sx={{ maxWidth: 1000 }}>
            {/* <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
        /> */}
            {/* >תוכן הכרטיס */}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Login
                </Typography>

            </CardContent>
            <CardActions aria-posinset={"center"}>
            <Typography gutterBottom variant="h5" component="div">
                    user name  <input ref={userNameRef} />
                </Typography>
                <br/>
                <Typography  gutterBottom variant="h5" component="div" align="center">
                     password   <input ref={passwordRef} type='password' margin="dense"/>
                </Typography>              
                
            </CardActions>
            <CardActions>
            

                <Button onClick={()=>{login()}} size="large" >Login</Button>                
            </CardActions>
        </Card>
    );
}
export default MediaCard