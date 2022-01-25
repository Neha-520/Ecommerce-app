import React, { useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";

import { getAllUsers, clearErrors, deleteUser } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';

const UsersList = ({ history }) => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { error, users } = useSelector((state) => state.allUsers);

    const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success(message);
            history.push("/admin/users");
            dispatch({ type: DELETE_USER_RESET })
        }

        dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError, isDeleted, history, message]);

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 160, flex: 0.7 },

        {
            field: "email",
            headerName: "Email",
            minWidth: 150,
            flex: 0.7,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 140,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                    ? "greenColor"
                    : "redColor";
            }
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteUserHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </>
                );
            },
        },
    ];


    const rows = [];

    users && users.forEach((user) => {
        rows.push({
            id: user._id,
            role: user.role,
            email: user.email,
            name: user.name,
        });
    });

    return (
        <>
            <MetaData title={`ALL USERS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </>
    );
};

export default UsersList;
