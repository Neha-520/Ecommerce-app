import React, { useState, useEffect } from "react";
import "./Password.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

const ResetPassword = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
    );

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(match.params.token, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");

            history.push("/login");
        }
    }, [dispatch, error, alert, history, success]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Change Password" />
                    <div className="PasswordContainer">
                        <div className="PasswordBox">
                            <h2 className="PasswordHeading">Update Profile</h2>

                            <form
                                className="PasswordForm"
                                onSubmit={resetPasswordSubmit}
                            >
                                <div>
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div >
                                    <LockIcon />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="PasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ResetPassword;
