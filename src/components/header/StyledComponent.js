
import React from 'react'

import CategoriesChanger from './CategoriesChanger'
import LogoChanger from './LogoChanger'

import DumbComponent from './DumbComponent'

function StyledComponent() {
    return (
        <div style={{position: 'relative'}}>
            <CategoriesChanger/>
            <LogoChanger/>
            <DumbComponent logo={'logo'}/>
        </div>
    )
}

export default StyledComponent
