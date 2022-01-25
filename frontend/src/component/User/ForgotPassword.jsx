import React, { useState, useEffect } from "react";
import "./Password.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
    );

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, alert, message]);

    return (<>
        {loading ? (
            <Loader />
        ) : (<>
            <MetaData title="Forgot Password" />
            <div className="PasswordContainer">
                <div className="PasswordBox">
                    <h2 className="PasswordHeading">Forgot Password</h2>

                    <form
                        className="PasswordForm"
                        onSubmit={forgotPasswordSubmit}
                    >
                        <div>
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Send"
                            className="PasswordBtn"
                        />
                    </form>
                </div>
            </div>
        </>)}
    </>);
};

export default ForgotPassword;
