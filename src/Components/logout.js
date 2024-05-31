import React,{Component} from 'react';
import{ AppBar, Drawer, MenuItem, IconButton, Paper, TextField, Button } from '@mui/material';



export default class Logout extends Component{

render(){
    return(
        <div id="navigation">
         
           <div>
         <Button variant="contained" label="Log_Out" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
        </div>
    );
 }
}
const style = {
 margin: 15,
};