import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../authSlice';
import apiSlice from '../app/apiSlice';
import { Button } from 'primereact/button';

const AdminAppBar = () => {
    console.log("AdminAppBar!!!!!!!!!!!!!");
    const { isUserLoggedIn } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogoutClick = () => {
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        // const role = sessionStorage.getItem("role")

        navigate("/")
    }
    const role = sessionStorage.getItem("role")


    const itemRenderer = (item) => (
        <>


            <Link to={item.url} style={{ textDecoration: 'none' }}>
                {/* {console.log(item.url)} */}
                <a className="flex align-items-center p-menuitem-link">
                    <span className={item.icon} />
                    <span className="mx-2">{item.label}</span>
                    {item.badge && <Badge className="ml-auto" value={item.badge} />}
                    {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
                </a>
            </Link>
        </>
    );
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            num: 1,
            template: itemRenderer,
            url: '/homePage'
        },
        {
            label: 'View',
            icon: 'pi pi-chart-bar',
            num: 2,
            template: itemRenderer,
            url: '/viewAdmin'
        },
        {
            label: 'All Orders',
            icon: 'pi pi-table',
            num: 3,
            template: itemRenderer,
            url: '/orders'
        },
        {
            label: 'All users',
            icon: 'pi pi-users',
            num: 4,
            template: itemRenderer,
            url: '/allUsers'
        },

    ];

    const start = <img alt="logo" src="./jewelry/shutterstock_223221508.jpg" height="40" className="mr-2"></img>;

    // const end = (
    //     <div className="flex align-items-center gap-2">
    //         <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
    //         <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
    //     </div>
    // );
console.log("logged? ", isUserLoggedIn);
    return (
        <>

            {/*   */}

            {/* sessionStorage.getItem("role")==="admin" && */}
            <div className="card">
                {<Menubar model={items} start={start} />}
            </div>
            { isUserLoggedIn && <><br/><div ><Button icon="pi pi-sign-out"  onClick={handleLogoutClick} label="Logout" rounded /></div></>}

        </>
    )
}
export default AdminAppBar
