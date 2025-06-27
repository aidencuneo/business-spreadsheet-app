import styled from 'styled-components';
import { getLightOrDark, getRandColour } from '../util/colourUtil';
import Icon from './Icon';
import DeleteIcon from './DeleteIcon';
import ExpandIcon from './ExpandIcon';
import Money from './Money';
import { useState } from 'react';
import Block from './Block';
import * as data from '../util/data';
import { parseMoney, toAUD } from '../util/money';
import MoveIcon from './MoveIcon';
import RefreshIcon from './RefreshIcon';

const CategoryWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    user-select: none;
`;

export default p => {
    const addTransaction = () => {
        const money = parseMoney((prompt('Enter an amount (example: $5.50 AUD, -$1 USD, 3):') ?? ''));

        if (money.length < 2 || !money[0] || !money[1])
            return;

        const transactions = data.addTransaction(p.name, money);
        setTransactions(transactions);

        // Update outer element
        p.onUpdate();
    }

    const deleteTransaction = i => {
        if (!confirm('Are you sure you want to delete this transaction?'))
            return;

        const filtered = transactions.filter((t, j) => j != i);

        setTransactions(filtered);
        data.saveTransactions(p.name, filtered);

        // Update outer element
        p.onUpdate();
    }

    const renameTransaction = i => {
        const name = (prompt('Enter a new name for this transaction:') ?? '').trim();

        if (!name)
            return;

        const transactions = data.getTransactions(p.name);
        transactions[i][1] = name;

        setTransactions(transactions);
        data.saveTransactions(p.name, transactions);

        // Update outer element
        p.onUpdate();
    }

    const colour = getLightOrDark(p.colour.substring(1), '#eeeeee', '#121212');
    const [opened, setOpened] = useState(false);
    const [transactions, setTransactions] = useState(data.getTransactions(p.name));
    const [total, setTotal] = useState();
    // console.log(p.name, transactions);

    data.sumTotal(p.name).then(setTotal);

    return <>
        <CategoryWrapper
            style={{ background: p.colour, color: colour }}
            onClick={() => setOpened(!opened)}
        >
            <div>
                <DeleteIcon onClick={e => { e.stopPropagation(); p.onDelete(p); }} />
                <MoveIcon onClick={e => { e.stopPropagation(); p.onMoveUp(p) }} type="up" />
                <MoveIcon onClick={e => { e.stopPropagation(); p.onMoveDown(p) }} type="down" />
                <RefreshIcon onClick={e => { e.stopPropagation(); p.onRefresh(p); }} style={{ paddingRight: '15px' }} />
                <span onClick={e => { e.stopPropagation(); p.onRename(p); }}>{p.name}</span>
            </div>
            <div>
                <Money value={total} />
                <ExpandIcon type={opened ? 'less' : 'more'} />
            </div>
        </CategoryWrapper>

        {opened &&
            <>
                <Block
                    onClick={addTransaction}
                    style={{ marginLeft: '36px' }}
                    colour="#eeeeee"
                >
                    New Transaction
                </Block>

                {[...transactions].reverse().map((t, i) =>
                    <CategoryWrapper
                        key={i}
                        style={{
                            background: t[0][0] < 0 ? '#ef3535' : '#00ff78',
                            color: t[0][0] < 0 ? '#eeeeee' : '#121212',
                            marginLeft: '36px',
                        }}
                    >
                        <div>
                            <DeleteIcon onClick={e => { e.stopPropagation(); deleteTransaction(transactions.length - i - 1); }} />
                            <span onClick={() => renameTransaction(transactions.length - i - 1)}>
                                {t[1] ? t[1] : 'unnamed'}
                            </span>
                        </div>
                        <div>
                            <Money value={t[0]} style={{ paddingRight: '10px' }} />
                        </div>
                    </CategoryWrapper>
                )}
            </>
        }
    </>;
}
