import styled from 'styled-components';
import Icon from './Icon';

const RefreshIconS = styled(Icon)`
    vertical-align: middle;
    padding: 0.11em 10px 0 0;
    font-size: 24px;
    font-weight: bold;
`;

export default p =>
    <RefreshIconS {...p} style={{ ...p.style, marginBottom: '5px' }}>refresh</RefreshIconS>;
