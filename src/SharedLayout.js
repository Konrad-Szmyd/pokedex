import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const OutletWrapper = styled.div`
    background-color:#c1946a;
`

const SharedLayout = () => {
    return (
        <div>
            <Nav />
            <OutletWrapper>
                <Outlet />
            </OutletWrapper>
            <Footer />
        </div>
    )
}

export default SharedLayout
