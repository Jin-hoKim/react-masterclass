import styled from "styled-components";

interface ContainerProps {
    bgColor: string;
    borderColor: string;
}

const Container = styled.div<ContainerProps>`
    width: 100px;
    height: 100px;
    background-color: ${(props) => props.bgColor};
    border-radius: 100px;
    border: 3px solid ${(props) => props.borderColor};
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface CircleProps {
    bgColor: string;
    borderColor?: string;
    text?: string;
}

export default function Circle({
    bgColor,
    borderColor,
    text = "defaultTxt",
}: CircleProps) {
    return (
        <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
            {text}
        </Container>
    );
}
