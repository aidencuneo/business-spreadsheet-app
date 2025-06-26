import styled from 'styled-components';
import Icon from './Icon';

const ExpandIconS = styled(Icon)`
    vertical-align: middle;
    padding-top: 0.11em;
    padding-right: 10px;
    font-size: 24px;
`;

export default function ExpandIcon(p) {
    return <ExpandIconS style={{ marginBottom: '5px' }}>keyboard_arrow_down</ExpandIconS>
}
