import '@fontsource/cal-sans';
import 'material-icons/iconfont/material-icons.css';

import ReactDOM from 'react-dom/client';
import * as data from './util/data';
import Category from './comp/Category';
import { getRandHex } from './util/colourUtil';

function App() {
    // const cats = data.getCategories();
    const cats = [
        ['Steam', '#' + getRandHex(6)],
        ['Donations', '#' + getRandHex(6)],
        ['Other', '#' + getRandHex(6)],
    ];

    return (
        <>
            {cats.map((cat, i) =>
                <Category key={i} name={cat[0]} colour={cat[1]} />
            )}

            <Button colour="#eeeeee">New Category</Button>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
