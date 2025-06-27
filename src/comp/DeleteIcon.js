import styled from 'styled-components';
import Icon from './Icon';

const DeleteIconS = styled(Icon)`
    vertical-align: middle;
    padding-top: 0.11em;
    padding-right: 10px;
    font-size: 24px;
`;

export default p =>
    <DeleteIconS {...p} style={{ marginBottom: '5px' }}>delete</DeleteIconS>;
