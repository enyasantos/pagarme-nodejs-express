import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;

    background: #FFF;

`

export const Form = styled.form`
    width: 40%;
    margin-left: 30%;
    display: flex;
    flex-direction: column;

    p {
        margin: 20px 0 0px 0;

        color:#393554;
        text-transform: uppercase;
        font-size: 18px;
        letter-spacing: .05em;
        text-align: center;
    }

    .form-group {
        display: flex;
        justify-content: space-between;
        width: 100%;

        div {
            width: 100%;

            margin-top: 10px;

            &.group-2 {
                input, label {
                    margin-left: 2%;
                }
            }

            input {
                width: 98%;
            }
        }
    }

`

export const Input = styled.input`
    width: 100%;

    border: 1px solid #f880a0;
    border-radius: 2px;

    background: transparent;

    padding: 5px;

    transition: border .2s;

    &:focus {
        border: 1px solid  #393554;
    }

`

export const Label = styled.label`
    margin-top: 10px;

    color:#393554;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: .05em;

`
export const SwitchReact = styled.label`
    margin-top: 20px;
    margin-left: 30%;

    width: 40%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
        color:#393554;
        font-size: 15px;
    }
`

export const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 42%;
    margin-left: 30%;

    button {
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

        &.continue {
            background: #f880a0;
            text-decoration: none;
            color: #393554;
        }

        &.go-back {
            border: 1px solid #f880a0;
            background: transparent;
            text-decoration: none;
            color: #f880a0;
        }
    }
`
