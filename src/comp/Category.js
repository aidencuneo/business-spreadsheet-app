import styled from 'styled-components';
import { getLightOrDark } from '../util/colourUtil';
import Icon from './Icon';
import DeleteIcon from './DeleteIcon';
import ExpandIcon from './ExpandIcon';
import Value from './Value';

const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`;

export default function Category(p) {
    const colour = getLightOrDark(p.colour.substring(1), '#eeeeee', '#121212');

    return (
        <Wrap style={{ background: p.colour, color: colour }}>
            <div>
                <DeleteIcon />
                <span>{p.name}</span>
            </div>
            <div>
                <Value style={{ paddingRight: '10px' }}>5</Value>
                <ExpandIcon />
            </div>
        </Wrap>
    );
}
