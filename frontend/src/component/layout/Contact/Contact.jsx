import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import MetaData from "../MetaData";

const Contact = () => {
    return (
        <>
            <MetaData title="CONTACT US" />
            <h1 id="contactHeading">CONTACT US</h1>
            <div className="contactContainer">
                <a className="mailBtn" href="mailto:garg.sahil1995@gmail.com">
                    <Button> garg.sahil1995@gmail.com</Button>
                </a>
            </div>
        </>
    );
};

export default Contact;