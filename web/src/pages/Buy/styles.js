import styled from 'styled-components';

export const Title = styled.div `
    width: 100%;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 30px; 
    p {
        text-transform: uppercase;

        font-size: 24px;
        font-weight: bold;

        color: #393554;
        letter-spacing: .1em;
    }
`;

export const Product = styled.div `
    width: 400px;

    display: flex;
    
    align-items: center;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;

    margin: auto;

    color: #393554;

    h3 {
        text-transform: uppercase;
        letter-spacing: .1em;
        color: #401b40;
        text-align: center;
        margin-bottom: 10px;
    }

    img {
        width: 100%;
        margin-bottom: 10px;
    }

    p {
        text-align: justify;
        margin: 10px 0;
    }

    button {
        width: 100%;
        margin-top: 10px;

        border: 0;
        background: #f880a0;

        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: .1em;
        color: #401b40;

        padding: 10px 25px;

        transition: background .3s;

        &:hover {
            background: #F06E91;
        }
    }
`;