import { round } from "./util";

const isMoneyChar = (c) => c >= '0' && c <= '9' || c == '.' || c == '-';

export function parseMoney(money) {
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

    return [round(value, 2), currency.toUpperCase()];
}
