import React from 'react'
import Helmet from 'react-helmet'

const MetaData = ({ title }) => {
    return (
        //to give page title
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

export default MetaData
