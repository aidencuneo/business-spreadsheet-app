import styled from 'styled-components';
import Icon from './Icon';

const MoveIconS = styled(Icon)`
    vertical-align: middle;
    padding: 0.11em 10px 0 0;
    font-size: 24px;
    font-weight: bold;
`;

export default p =>
    <MoveIconS {...p} style={{ ...p.style, marginBottom: '5px' }}>arrow_{p.type ?? 'down'}ward</MoveIconS>;
