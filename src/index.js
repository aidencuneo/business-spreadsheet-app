import '@fontsource/cal-sans';
import 'material-icons/iconfont/material-icons.css';

import ReactDOM from 'react-dom/client';
import * as data from './util/data';
import Category from './comp/Category';
import Button from './comp/Button';
import { getRandColour } from './util/colourUtil';
import { useState } from 'react';

function App() {
    function addCat() {
        const name = prompt('Enter a category name:');

        if (!name)
            return;

        const cats = data.getCategories();
        cats.push([name, getRandColour()]);
        data.saveCategories(cats);
        setCats(cats);
    }

    function deleteCat(p) {
        const cats = data.removeCategory(p.name);
        setCats(cats);
    }

    const [cats, setCats] = useState(data.getCategories());

    // const cats = [
    //     ['Steam', getRandColour()],
    //     ['Donations', getRandColour()],
    //     ['Other', getRandColour()],
    // ];

    return <>
        <Button colour="#eeeeee">Total: $5</Button>
        {/* <TotalCategory key={i} name={cat[0]} colour={cat[1]} /> */}

        {cats.map((cat, i) =>
            <Category key={i} name={cat[0]} colour={cat[1]} onDelete={deleteCat} />
        )}

        <Button colour="#eeeeee" onClick={addCat}>New Category</Button>
    </>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
