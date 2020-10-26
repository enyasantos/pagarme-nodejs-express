import styled from 'styled-components';

export const About = styled.div`


`

export const CrediCard = styled.div `

`;

export const Form = styled.div `
    width: 300px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    margin: auto;

    input {
        width: 100%;
        border: 0;
        border-radius: 5px;

        margin: 10px 0;
        padding: 8px;

        box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    }

    button {
        width: 100%;
        
        border: none;
        background: #f880a0;

        text-transform: uppercase;
        color: #FFFFFF;
        font-size: 14px;
        letter-spacing: .1em;

        padding: 10px 0;
        margin-bottom: 20px;
        
        transition: all .3s;

        &:hover {
            background: #FFFFFF;
            color: #F06E91;
        } 
    }
`;
