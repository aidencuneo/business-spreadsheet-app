import styled from 'styled-components';
import { moneyToString, parseMoney, toAUD } from '../util/money';
import { useState } from 'react';
import { round } from '../util/util';

export default p => {
    const [value, currency] = parseMoney(p.value);
    console.log(p.value);

    const [money, setMoney] = useState(moneyToString(value, currency));
    const [lastValue, setLastValue] = useState();

    if (lastValue != value) {
        setMoney(moneyToString(value, currency));
        setLastValue(value);

        if (currency != 'AUD') {
            toAUD([value, currency]).then(aud =>
                setMoney(`${moneyToString(aud)} (${moneyToString(value, currency)})`),
            );
        }
    }

    // console.log('got', value, currency, money);

    return <span style={p.style}>{money}</span>;
};
