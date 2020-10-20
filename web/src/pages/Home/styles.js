import styled from 'styled-components';

export const Wrapper = styled.div `
    width: 90%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    margin: auto;
`;

export const Title = styled.div `
    width: 100%;
    text-align: center;
    margin-top: 20px;
    a {
        text-decoration: none;
        text-transform: uppercase;
        font-size: 24px;
        font-weight: bold;
        color: #393554;
        letter-spacing: .1em;
    }
`

export const Cards = styled.div `
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    margin: auto;
`;

export const Card = styled.div `
    cursor: pointer;

    margin: 30px 50px;

    width: 200px;
    height: 320px;

    display: flex;
    flex-direction: column;

    img {
        width: 100%;
        height: 200px;
    }

    p {
        margin-top: 10px;
        color: #393554;
    }

    .price {
        color: #625B9C;
        margin-bottom: 10px;
    }

    button {
        border: none;
        background: #f880a0;

        text-transform: uppercase;
        color: #FFFFFF;
        font-size: 14px;
        letter-spacing: .1em;

        padding: 10px 0;
        transition: all .3s;

        &:hover {
            background: #FFFFFF;
            color: #F06E91;
        }
    }
`;