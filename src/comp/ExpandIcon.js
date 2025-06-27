import styled from 'styled-components';
import Icon from './Icon';

const ExpandIconS = styled(Icon)`
    vertical-align: middle;
    padding-top: 0.11em;
    padding-right: 10px;
    font-size: 24px;
    font-weight: bold;
`;

export default function ExpandIcon(p) {
    return <ExpandIconS {...p} style={{ marginBottom: '5px' }}>expand_{p.type ?? 'more'}</ExpandIconS>
}
