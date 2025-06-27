import { round } from './util';
import { Convert } from 'easy-currencies';

const isMoneyChar = (c) => c >= '0' && c <= '9' || c == '.' || c == '-';

export function parseMoney(money) {
    if (Array.isArray(money))
        return money;
    else if (typeof money !== 'string')
        return [0, 'AUD'];

    money = money.replace(/\$/g, '').trim();
    let value = '';
    let currency = '';
    let i = 0;

    for (; i < money.length && isMoneyChar(money[i]); ++i)
        value += money[i];

    for (; i < money.length; ++i)
        currency += money[i];

    if (!currency)
        currency = 'AUD';

    return [round(value, 2), currency.trim().toUpperCase()];
}

export async function toAUD(money) {
    const [value, currency] = parseMoney(money);
    console.log('passed:', value, currency);
    const res = await fetch(`https://aidenbc.com.au/api/currency/${currency}/${value}`);

    return await res.json();
}
