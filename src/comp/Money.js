import styled from 'styled-components';
import { parseMoney, toAUD } from '../util/money';
import { useState } from 'react';
import { round } from '../util/util';

const MoneyS = styled.span`
    // font-size: 20px;
    // font-weight: bold;
    vertical-align: middle;
`;

export default p => {
    const [value, currency] = parseMoney(p.value);
    const sign = value < 0 ? '-' : '';

    const [money, setMoney] = useState(`${sign}$${Math.abs(value)}`);

    if (currency != 'AUD' && !money.endsWith(`${currency})`)) {
        toAUD([value, currency]).then(aud =>
            setMoney(`${sign}$${round(Math.abs(aud), 2)} (${money} ${currency})`),
        );
    }

    return <MoneyS style={p.style}>{money}</MoneyS>;
};
