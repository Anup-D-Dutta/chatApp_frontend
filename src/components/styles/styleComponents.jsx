import { styled } from '@mui/material'
import { Link as LinkComponent } from 'react-router-dom'

export const VisuallyHiddenInput = styled('input')({
    border: 0,
    clip: 'react(0 0 0 0)',
    hight: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    whitespace: 'nowarp',
    position: 'absolute',
    width: 1,
});


export const Link = styled(LinkComponent)`
text-decoration: none;
color: black;
padding:1rem;
&:hover{
taxt-decoration:none;
background-color: rgba(0,0,0,0.1);
} 
`;


export const InputBox = styled("input")`
width: 100%;
height: 100%;
border: 1px solid #777 ;
outline: none;
padding: 1.4rem 2rem;
border-radius: 0.3rem;
background-color: transparent;
color: white;
font-size: 1rem;
`

export const SearchField = styled('input')`
padding: 0rem 1rem;
width: 20vmax;
border: 1px solid red;
outline: none;
border-radius: 0.5rem;
background-color: transparent;
font-size: 1.1rem;
color: white;
`;

export const CurveButton = styled('button')`
padding: 0rem 1rem;
border: 1px solid red;
outline: none;
border-radius: 0.5rem;
background-color: transparent;
font-size: 1.1rem;
color: white;
`;