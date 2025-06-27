import styled from 'styled-components';
import { parseMoney } from '../util/money';

const MoneyValueS = styled.span`
    font-weight: bold;
`;

export default function Moneyvalue(p) {
    const [value, currency] = parseMoney(p.value);
    const sign = value < 0 ? '-' : '';

    return <MoneyValueS style={p.style}>{sign}${Math.abs(value)} {currency}</MoneyValueS>;
};
