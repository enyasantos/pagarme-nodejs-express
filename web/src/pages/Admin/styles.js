import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    
    font-family: 'Cousine', monospace;

    background: "#fdf9f3";

    padding: 10px;
`;

export const Header = styled.div`
    width: 100%;
    height: 60px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    border: 2px solid #2c292d;

    h2 {
        font-family: 'Cousine', monospace;
        font-size: 32px;
        font-weight: 400;
        letter-spacing: .05em;
        color: #2c292d;
        text-align: center;
    }
`;

export const Cards = styled.div`
    margin-top: 10px;

    width: 65%;
    margin-left: 17.5%;

    display: flex;
    justify-content: space-between;

    .card {
        width: 280px;
        height: 140px;

        border: 2px solid #2c292d;

        padding: 30px 10px;

        display: flex;
        flex-direction: column;
        justify-content: space-around;

        h3 {
            font-weight: 600;
            text-transform: uppercase;
            font-family: 'Cousine', monospace;
        }

        p {
            font-size: 28px;
            font-family: 'Cousine', monospace;
            color: #f37d68;
        }

        span {
            font-family: 'Cousine', monospace;
            font-size: 14px;
        }
    }
`;

export const Orders = styled.div `
    width: 100%;
    margin-top: 10px;

    display: flex;
    border: 2px solid #2c292d;

    table {
        width: 100%;

        border-collapse: collapse;

        thead {
            cursor: alias;

            tr {
                th {
                    font-family: 'Cousine', monospace;

                    border-left: 2px solid #2c292d;

                    padding: 5px 0;

                    &:first-child {
                            border: none;
                        }
                }
            }
        }

        tbody {
            cursor: alias;

            tr {
                border-top: 2px solid #2c292d;
                td {
                    padding: 8px 0;
                    font-family: 'Cousine', monospace;
                    border-left: 2px solid #2c292d;
                    text-align: center;

                    &:first-child {
                        border: none;
                    }
            }
        }
    }
    }
`

