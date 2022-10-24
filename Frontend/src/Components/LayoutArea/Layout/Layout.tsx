import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {

    return (
        <div className="Layout">
            <header>
                <AuthMenu />
            </header>
            <main>
                <Routing />
            </main>
            <footer>
               <Footer />
            </footer>
        </div>
    );
}

export default Layout;
