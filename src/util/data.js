import { toAUD } from "./money";

const asID = cat => cat.toLowerCase();

export function saveCategories(categories) {
    localStorage.setItem('business_spreadsheet_categories', JSON.stringify(categories));
}

export function getCategories() {
    return JSON.parse(localStorage.getItem('business_spreadsheet_categories') ?? '[]');
}

export const exportToJSON = () =>
    JSON.stringify({
        categories: getCategories(),
        transactions: getTransactions(),
    });

export function importFromJSON(json) {
    json = JSON.parse(json);

    saveCategories(json.categories);
    saveAllTransactions(json.transactions);
}

export function removeCategory(cat) {
    cat = asID(cat);
    const all = getCategories().filter(c => asID(c[0]) != cat);
    saveCategories(all);

    const transactions = getTransactions();
    delete transactions[cat];
    saveAllTransactions(transactions);

    return all;
}

const d = {
    steam: [
        [[-5.16, 'USD']],
        [[5.16, 'USD'], 'Refund'],
        [[-10, 'AUD'], 'Food'],
    ],

    donations: [

    ],

    other: [

    ],
};

export function getTransactions(cat) {
    const all = JSON.parse(localStorage.getItem('business_spreadsheet_transactions') ?? '[]');

    if (cat)
        return all[asID(cat)] ?? [];

    return all;
}

export function saveAllTransactions(transactions) {
    localStorage.setItem('business_spreadsheet_transactions', JSON.stringify(transactions));
}

export function saveTransactions(cat, transactions) {
    localStorage.setItem('business_spreadsheet_transactions', JSON.stringify({
        ...getTransactions(),
        [asID(cat)]: transactions,
    }));
}

export function addTransaction(cat, money, desc) {
    const transactions = getTransactions(cat);
    transactions.push(desc ? [money, desc] : [money]);
    saveTransactions(cat, transactions);

    return transactions;
}

export function renameTransactions(from, to) {
    from = asID(from);
    to = asID(to);

    const transactions = getTransactions();
    transactions[to] = transactions[from];
    delete transactions[from];

    saveAllTransactions(transactions);
}

export async function sumTotal(cat) {
    let transactions = getTransactions(cat);

    if (!Array.isArray(transactions))
        transactions = Object.values(transactions).flat();

    let sum = 0;

    for (let i = 0; i < transactions.length; ++i) {
        let [value, currency] = transactions[i][0];

        if (currency != 'AUD')
            value = await toAUD([value, currency]);

        sum += value;
    }

    return sum;
}
