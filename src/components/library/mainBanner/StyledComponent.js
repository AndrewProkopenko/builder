import React from 'react'

import DumbComponent from "./DumbComponent"

function StyledComponent(props) {
    return (
        <div>
            <DumbComponent data={props.data} />
        </div>
    )
}

export default StyledComponent
