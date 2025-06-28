import styled from 'styled-components';

const DragLineS = styled.div`
    position: absolute;
    height: 6px;
    width: 100%;
    background: #00ff78;
    pointer-events: none;
    z-index: 1;
`;

export default p =>
    p.y >= 0 && <DragLineS style={{ top: `${p.y - 5}px` }} />;
