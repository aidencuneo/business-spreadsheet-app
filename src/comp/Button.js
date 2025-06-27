import styled from 'styled-components';
import { getLightOrDark } from '../util/colourUtil';

const ButtonS = styled.div`
    position: relative;
    text-align: center;
    padding: 12px;
    user-select: none;
`;

export default p => {
    const fg = getLightOrDark(p.colour.substring(1), '#eeeeee', '#121212');

    return (
        <ButtonS
            onClick={p.onClick}
            style={{ backgroundColor: p.colour, color: fg, ...p.style }}
        >
            {p.children}
        </ButtonS>
    );
}
