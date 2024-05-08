import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../authSlice';
import apiSlice from '../app/apiSlice';
import { Button } from 'primereact/button';

const MyAppBar = () => {
    const { isUserLoggedIn } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogoutClick = () => {
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        // sessionStorage.removeItem("role")

        navigate("/")
    }
    const role = sessionStorage.getItem("role")

    const itemRenderer = (item) => (
        <>
            {(( (item.num > 1 && item.num < 4) && !isUserLoggedIn) || (item.num < 2) || (item.num >= 4 && isUserLoggedIn)) &&
                <Link to={item.url} style={{ textDecoration: 'none' }}>
                    <a className="flex align-items-center p-menuitem-link">
                        <span className={item.icon} />
                        <span className="mx-2">{item.label}</span>
                        {item.badge && <Badge className="ml-auto" value={item.badge} />}
                        {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
                    </a>
                </Link>}
        </>
    );
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            num: 1,
            template: itemRenderer,
            url: './'
        },
        {
            label: 'Login',
            icon: 'pi pi-chevron-right',
            num: 2,
            template: itemRenderer,
            url: './login'
        },
        {
            label: 'Register',
            icon: 'pi pi-user-plus',
            num: 3,
            template: itemRenderer,
            url: './register'

        },
        {
            label: 'View',
            icon: 'pi pi-chart-bar',
            num: 4,
            template: itemRenderer,
            url: './view'
        },
        {
            label: 'Previous Orders',
            icon: 'pi pi-history',
            num: 5,
            template: itemRenderer,
            url: './PreviousOrders'
        },
        {
            label: 'Comment',
            icon: 'pi pi-comment',
            num: 6,
            template: itemRenderer,
            url: '/comments'
        }
        
    ];

    // const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;

    const start = <img alt="logo" src="./jewelry/shutterstock_223221508.jpg" height="40" className="mr-2"></img>;

    // const end = (
    //     <div className="flex align-items-center gap-2">
    //         <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
    //         <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
    //     </div>
    // );
    return (
        ( role !== "admin")&& <>
            {console.log("isUserLoggedIn: ", isUserLoggedIn)}
            
            <div className="card">
                {/*   sessionStorage.getItem("role")==="admin" &&*/}
                <Menubar model={items} start={start} />
            </div>

            { isUserLoggedIn && <><br/><Button icon="pi pi-sign-out" onClick={handleLogoutClick} label="Logout" rounded /></>}

        </>
    )
}
export default MyAppBar
