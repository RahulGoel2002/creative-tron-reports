import React, { useEffect, useState } from 'react';
import styles from "../css/app.module.css"
import Block from './Block';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const App = () => {

    const [baseSales, setBaseSales] = useState(null)
    const [newInput, setNewInput] = useState(false)
    const [finalProfit, setFinalProfit] = useState(0)
    const [blocks, setBlocks] = useState([])

    useEffect(() => {
        console.log(newInput, baseSales)
        setFinalProfit(prevProfit => {
            let x = 0;
            blocks.map(blk => {
                if (blk.isBaseSales) x += blk.amount
                else x -= blk.amount
                return blk
            })
            return x
        })
    }, [newInput, baseSales])

    return (
        <div className={styles.app}>
            <header>
                CreativTron <span className={styles.reports}> Reports</span> 
            </header>
            <div className={styles.scrollable}>

            
            <div className={styles.blocks}>
                {
                    blocks.map((blk, index) => {
                        return <Block key={index} id={index} setBaseSales={setBaseSales} setBlocks={setBlocks} details={blk} />
                    })
                }
                {newInput ? <Block input baseSales={baseSales} setBlocks={setBlocks} setNewInput={setNewInput} setBaseSales={setBaseSales} />: null}
                <Block createNew setNewInput={setNewInput} />
            </div>
            </div>
            <footer>
                <div>Net Profit</div>
                <div className={styles.priceAmt}><CurrencyRupeeIcon />{finalProfit}</div>
            </footer>
        </div>
    );
}

export default App;
