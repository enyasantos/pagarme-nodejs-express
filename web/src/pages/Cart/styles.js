import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;

    padding: 10px;

    display: flex;
    flex-direction: column;

    h2 {
        text-transform: uppercase;
        font-size: 24px;
        font-weight: bold;
        color: #393554;
        letter-spacing: .1em;
        text-align: center;
    }
`;

export const EmptyCart = styled.div`

    margin-top: -50px;

    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h4 {
        font-weight: normal;
        font-size: 32px;
        color: #393554;
    }

    p {
        text-align: center;
        font-size: 16px;
        letter-spacing: .05em;
        color: #f880a0;

        border: none;

        margin: 15px;
    }

    a {
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: .05em;
        font-size: 14px;
        color: #393554;

        padding: 10px 40px;

        background: #f880a0;
    }
`;

export const CartTable = styled.table`
    width: 90%;
    margin-left: 5%;
    border-collapse: collapse;

    thead {
        tr {
            th {
                padding: 10px 0;
                border-bottom: 1px solid #2c292d;

                text-align: justify;
                font-weight: normal;
            }
        }
    }

    tbody {

        tr {
            td {
                padding: 10px 0;
                border-bottom: 1px solid #2c292d;
                color: #393554;
            }

            .product {
                display: flex;

                img {
                    width: 120px;
                    height: 120px;

                    object-fit: cover;
                }

                div {
                    display: flex;
                    flex-direction: column;
                    align-items: baseline;
                    justify-content: flex-end;

                    margin-left: 30px;

                    p {
                        font-size: 20px;
                        color: #393554;
                    }

                    button {
                        margin-top: 20px;

                        border: 1px solid #f880a0;
                        border-radius: 2px;

                        text-transform: uppercase;
                        color: #f880a0;

                        padding: 5px 15px;
                    }
                }
            }
        }
    }

    tfoot {
        tr {
            td {
                padding: 10px 0;

                text-align: end;
                color: #393554;
            }
        }
    }
`

export const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const Button = styled.button `

    align-self: flex-end;
    justify-self: flex-end;

    width: 260px;

    margin-top: 30px;
    margin-right: 5%;

    border: 0;

    text-transform: uppercase;
    letter-spacing: .05em;
    font-size: 14px;

    padding: 10px 0;

    &.buy {
        background: #f880a0;

        a {
            text-decoration: none;
            color: #393554;
        }
    }

    &.to-home {
        border: 1px solid #f880a0;

        a {
            text-decoration: none;
            color: #f880a0;
        }
    }
`


