import styled from 'styled-components';
import { getLightOrDark } from '../util/colourUtil';
import Icon from './Icon';
import DeleteIcon from './DeleteIcon';
import ExpandIcon from './ExpandIcon';
import Money from './Money';
import { useState } from 'react';
import Button from './Button';
import * as data from '../util/data';
import { parseMoney, toAUD } from '../util/money';

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
    }

    const deleteTransaction = i => {
        if (!confirm('Are you sure you want to delete this transaction?'))
            return;

        setTransactions(transactions.splice(i, 1));
        data.saveTransactions(p.name, transactions);
    }

    const colour = getLightOrDark(p.colour.substring(1), '#eeeeee', '#121212');
    const [opened, setOpened] = useState(false);
    const [transactions, setTransactions] = useState(data.getTransactions(p.name));
    const [total, setTotal] = useState(0);
    console.log(transactions);

    data.sumTotal(p.name).then(setTotal);

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
                <Money value={total} />
                <ExpandIcon type={opened ? 'less' : 'more'} />
            </div>
        </CategoryWrapper>

        {opened &&
            <>
                <Button
                    onClick={addTransaction}
                    style={{ marginLeft: '36px' }}
                    colour="#eeeeee"
                >
                    New Transaction
                </Button>

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
                            <DeleteIcon onClick={e => { e.stopPropagation(); deleteTransaction(i); }} />
                            <span>{t[1] ? t[1] : 'Unnamed Transaction'}</span>
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
