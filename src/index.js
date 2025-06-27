import '@fontsource/cal-sans';
import 'material-icons/iconfont/material-icons.css';

import ReactDOM from 'react-dom/client';
import * as data from './util/data';
import Category from './comp/Category';
import Button from './comp/Button';
import { getRandColour } from './util/colourUtil';
import { useState } from 'react';
import styled from 'styled-components';
import Money from './comp/Money';

const Flex = styled.div`
    display: flex;
`;

function App() {
    const addCat = () => {
        const name = prompt('Enter a category name:');
        const cats = data.getCategories();

        if (!name || cats.find(cat => cat[0] == name))
            return;

        cats.push([name, getRandColour()]);
        data.saveCategories(cats);
        setCats(cats);
    }

    const deleteCat = p => {
        if (!confirm(`Are you sure you want to delete "${p.name}"?`))
            return;

        const cats = data.removeCategory(p.name);
        setCats(cats);
    }

    const moveCatUp = p => {
        const cats = data.getCategories();
        const i = cats.findIndex(cat => cat[0] == p.name);

        if (i == 0)
            return;

        const bot = cats[i];
        cats[i] = cats[i - 1];
        cats[i - 1] = bot;

        data.saveCategories(cats);
        setCats(cats);
    }

    const moveCatDown = p => {
        const cats = data.getCategories();
        const i = cats.findIndex(cat => cat[0] == p.name);

        if (i == cats.length - 1)
            return;

        const top = cats[i];
        cats[i] = cats[i + 1];
        cats[i + 1] = top;

        data.saveCategories(cats);
        setCats(cats);
    }

    const renameCat = p => {
        const name = prompt('Enter a new name for this category:').trim();
        const cats = data.getCategories();

        if (!name || cats.find(cat => cat[0] == name))
            return;

        cats[cats.findIndex(cat => cat[0] == p.name)][0] = name;

        data.renameTransactions(p.name, name);
        data.saveCategories(cats);
        setCats(cats);
    }

    const resetColour = p => {
        const cats = data.getCategories();
        cats[cats.findIndex(cat => cat[0] == p.name)][1] = getRandColour();
        data.saveCategories(cats);
        setCats(cats);
    }

    const importPrompt = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = importData;
        input.click();
    }

    const importData = e => {
        const file = e.target.files[0];

        if (!file)
            return;

        const reader = new FileReader();
        reader.readAsText(file, 'utf-8');

        reader.onload = e => {
            data.importFromJSON(e.target.result);
            setCats(data.getCategories());
        }

        reader.onerror = e => alert('Error reading file');
    }

    const exportData = () => {
        const fileContent = data.exportToJSON();
        const blob = new Blob([fileContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Download as a file
        const a = document.createElement('a');
        a.href = url;
        a.download = `business_spreadsheet.json`;
        a.click();

        // Release object URL
        URL.revokeObjectURL(url);
    }

    const [cats, setCats] = useState(data.getCategories());
    const [total, setTotal] = useState();

    data.sumTotal().then(setTotal);

    // const cats = [
    //     ['Steam', getRandColour()],
    //     ['Donations', getRandColour()],
    //     ['Other', getRandColour()],
    // ];

    return <>
        <Button colour="#eeeeee">Total: <Money value={total} /></Button>
        {/* <TotalCategory key={i} name={cat[0]} colour={cat[1]} /> */}

        {cats.map((cat, i) =>
            <Category
                key={cat[0]}
                name={cat[0]}
                colour={cat[1]}
                onDelete={deleteCat}
                onMoveUp={moveCatUp}
                onMoveDown={moveCatDown}
                onRename={renameCat}
                onRefresh={resetColour}
            />
        )}

        <Button colour="#eeeeee" onClick={addCat}>New Category</Button>

        <Flex>
            <Button colour="#a9d4ff" onClick={importPrompt}>Import Data</Button>
            <Button colour="#00ff78" onClick={exportData}>Export Data</Button>
        </Flex>
    </>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
