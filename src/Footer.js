import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color:#ffffff;
    background-color:#3e4444;
    
    div{
      margin-left:1rem;
      padding:0.2rem;
    }
    `

const Footer = () => {
  return (
    <Wrapper>
      <div>Made by Konrad Szmyd</div>
    </Wrapper>
  )
}

export default Footer
