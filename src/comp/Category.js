import styled from 'styled-components';
import { getLightOrDark } from '../util/colourUtil';
import Icon from './Icon';
import DeleteIcon from './DeleteIcon';
import ExpandIcon from './ExpandIcon';
import MoneyValue from './MoneyValue';
import { useState } from 'react';
import Button from './Button';

const CategoryWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    user-select: none;
`;

export default function Category(p) {
    const colour = getLightOrDark(p.colour.substring(1), '#eeeeee', '#121212');
    const [opened, setOpened] = useState(false);

    return <>
        <CategoryWrapper
            style={{ background: p.colour, color: colour }}
            onClick={() => setOpened(!opened)}
        >
            <div>
                <DeleteIcon onClick={e => { e.stopPropagation(); p.onDelete(p); }} />
                <span>{p.name}</span>
            </div>
            <div>
                <MoneyValue value='-5.158 usd' style={{ paddingRight: '10px' }} />
                <ExpandIcon type={opened ? 'less' : 'more'} />
            </div>
        </CategoryWrapper>

        {opened &&
            <>
                <Button style={{ marginLeft: '36px' }} colour="#eeeeee">New Transaction</Button>
                <CategoryWrapper
                    style={{ background: '#ef3535', color: '#eeeeee', marginLeft: '36px' }}
                >
                    <div>
                        <DeleteIcon />
                        <span>Unnamed Transaction</span>
                    </div>
                    <div>
                        <MoneyValue value='-5.158 usd' style={{ paddingRight: '10px' }} />
                    </div>
                </CategoryWrapper>
            </>
        }
    </>;
}
