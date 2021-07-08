
import { useState } from "react";
import { useHistory } from "react-router-dom"; 


export const Header = (props) => {
    return(
        <nav className="navbar navbar-default">
            <div ClassName="container">
                <div className="navbar-header">
                    <ul className="nav navbar-nav">
                        <li><link to={"/login/Login"}>Login</link></li>
                        <li><link to={"/login/SignUpPage"}> Singup </link></li>
                    </ul>
                </div>
            </div>
        </nav>                

    )
};
