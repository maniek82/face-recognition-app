import React from 'react';


const Navigation = ({onRouteCHange, isSignedIn}) => {
    
        if(isSignedIn) {
            return (
                <nav style={{display:"flex", justifyContent:"flex-end"}}>
                <p
                onClick = {()=>onRouteCHange('signout')}
                className="f3 link dim black underline pa3 pointer">Sign Out</p>
            </nav>
            )
        } else {
            return (
            
                <nav style={{display:"flex", justifyContent:"flex-end"}}>
                <p
                    onClick = {()=>onRouteCHange('register')}
                    className="f3 link dim black underline pa3 pointer">Register</p>
                <p
                    onClick = {()=>onRouteCHange('signin')}
                    className="f3 link dim black underline pa3 pointer">Sign in</p>
                </nav>
           
            )
        }
        
    
}

export default Navigation