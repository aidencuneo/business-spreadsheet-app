import styled from 'styled-components';
import Icon from './Icon';

const ExpandIconS = styled(Icon)`
    vertical-align: middle;
    padding: 0.11em 10px 0 10px;
    font-size: 24px;
    font-weight: bold;
`;

export default p =>
    <ExpandIconS {...p} style={{ ...p.style, marginBottom: '5px' }}>expand_{p.type ?? 'more'}</ExpandIconS>;
