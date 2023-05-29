import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";


const Sidebar = () => (

    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse">
        <div className="position-sticky pt-3 sidebar-sticky">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink className="nav-link" to={'/'}>

                        Dashboard
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to={'/users'}>

                        Users
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to={'/roles'}>

                        Roles
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to={'/products'}>

                        Products
                    </NavLink>
                </li>
            </ul>
        </div>
    </nav>
)

export default Sidebar;