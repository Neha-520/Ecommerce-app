import React from 'react';
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import './Shipping.css'

const CheckOutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />,
        },
    ];

    return (<>
        <Stepper alternativeLabel activeStep={activeStep} style={{ boxSizing: "border-box" }}>
            {
                steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            style={{
                                color: activeStep >= index ? "#3b32c0" : "#9d9c9c",
                            }}
                            icon={item.icon}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))
            }
        </Stepper>
    </>
    );
};

export default CheckOutSteps;
