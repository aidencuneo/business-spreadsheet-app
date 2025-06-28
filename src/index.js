import '@fontsource/cal-sans';
import 'material-icons/iconfont/material-icons.css';

import ReactDOM from 'react-dom/client';
import * as data from './util/data';
import Category from './comp/Category';
import Block from './comp/Block';
import { getRandColour } from './util/colourUtil';
import { useState } from 'react';
import styled from 'styled-components';
import Money from './comp/Money';
import DragLine from './comp/DragLine';

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

    const selectNearestCat = y => {
        let i;
        for (i = 0; i < catYLevels.length; ++i)
            if (y < catYLevels[i])
                break;

        // Select the closer of the two
        if (y - catYLevels[i - 1] < catYLevels[i] - y)
            --i;

        if (i == catYLevels.length)
            --i;

        if (i == draggingCatIndex || i == draggingCatIndex + 1)
            setDragLineY(-1);
        else
            setDragLineY(catYLevels[i]);

        return i;
    }

    const onDragStart = e => {
        catYLevels = [];
        const draggingCatElem = e.target.parentElement.parentElement;

        const catElems = [...draggingCatElem.parentElement.children].filter(
            elem => elem.classList.contains('category'));

        draggingCatIndex = catElems.indexOf(draggingCatElem);

        for (let i = 0; i < catElems.length; ++i)
            catYLevels.push(catElems[i].getBoundingClientRect().y);

        const lastCat = catElems[catElems.length - 1].getBoundingClientRect();
        catYLevels.push(lastCat.y + lastCat.height);

        console.log(catYLevels);
        // catYLevels = 
        console.log(e.clientY);
        selectNearestCat(e.clientY);
    }

    const onDrag = e => {
        if (draggingCatIndex === undefined)
            return;

        const i = selectNearestCat(e.clientY);
        console.log(dragLineY);
    }

    const onDragEnd = e => {
        if (draggingCatIndex === undefined)
            return;

        // Get final position and remove drag line
        const i = selectNearestCat(e.clientY);
        setDragLineY(-1);

        // Insert into final position
        const cats = data.getCategories();
        const draggingCat = cats[draggingCatIndex];
        cats.splice(draggingCatIndex, 1);
        cats.splice(i, 0, draggingCat);

        data.saveCategories(cats);
        setCats(cats);

        // Stop dragging
        draggingCatIndex = undefined;
    }

    const renameCat = p => {
        const name = (prompt('Enter a new name for this category:') ?? '').trim();
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
    const [dragLineY, setDragLineY] = useState(-1);

    let draggingCatIndex;
    let catYLevels = [];

    // Add whole document listeners
    document.body.addEventListener('mousemove', onDrag);
    document.body.addEventListener('mouseup', onDragEnd);

    // Calculate total
    data.sumTotal().then(setTotal);

    return <>
        <Block colour="#eeeeee">Total: <Money value={total} /></Block>
        {/* <TotalCategory key={i} name={cat[0]} colour={cat[1]} /> */}

        {cats.map((cat, i) =>
            <Category
                key={cat[0]}
                name={cat[0]}
                colour={cat[1]}
                onDelete={deleteCat}
                // onMoveUp={moveCatUp}
                // onMoveDown={moveCatDown}
                onDragStart={onDragStart}
                onRename={renameCat}
                onRefresh={resetColour}
                onUpdate={() => data.sumTotal().then(setTotal)}
            />
        )}

        <DragLine y={dragLineY} />

        <Block colour="#eeeeee" onClick={addCat}>New Category</Block>

        <Flex>
            <Block colour="#a9d4ff" onClick={importPrompt}>Import Data</Block>
            <Block colour="#00ff78" onClick={exportData}>Export Data</Block>
        </Flex>
    </>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
