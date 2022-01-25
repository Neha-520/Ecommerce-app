import React, { useState } from 'react'
import './Header.css'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import Backdrop from "@material-ui/core/Backdrop"

import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ListAltIcon from '@material-ui/icons/ListAlt'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';


const UserOptions = ({ user }) => {
    const { cartItems } = useSelector((state) => state.cart)

    const [open, setOpen] = useState(false);
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();

    const dashboard = () => {
        history.push("/admin/dashboard")
    }

    const orders = () => {
        history.push("/orders")
    }

    const account = () => {
        history.push("/account")
    }

    const cart = () => {
        history.push("/cart")
    }

    const logoutUser = () => {
        dispatch(logout());
        alert.success("Logout Successfully");
    }

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? 'tomato' : "unset" }} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];

    if (user.role === 'admin') {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard
        });
    }

    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                open={open}
                direction='down'
                className="speedDial"
                icon={<img
                    className='speedDialIcon'
                    src={user.avatar.url ? user.avatar.url : "/Profile"}
                    alt='Profile'
                />}
            >
                {options.map((item, i) => (

                    <SpeedDialAction
                        key={i}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </>
    )
}

export default UserOptions
