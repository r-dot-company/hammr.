import styled from "styled-components"

const Spinner = styled.div`
    text-align: center;

    div {
        width: 8px;
        height: 8px;
        background-color: #fff;
        border-radius: 100%;
        display: inline-block;
        animation: bounce 1.4s infinite ease-in-out both;
        margin-right: 4px;

        &:last-child {
            margin-right: 0;
        }

        &:nth-child(1) {
            animation-delay: -0.32s;
        }

        &:nth-child(2) {
            animation-delay: -0.16s;
        }
    }

    @keyframes bounce {
        0%, 80%, 100% { 
            transform: scale(0);
        } 40% { 
            transform: scale(1.0);
        }
    }
`

export default function LoadingIndicator() {
    return (
        <Spinner>
            <div/><div/><div/>
        </Spinner>
    )
}
