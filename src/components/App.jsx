import React, { useEffect, useState } from 'react';
import styles from "../css/app.module.css"
import Block from './Block';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const App = () => {

    const [baseSales, setBaseSales] = useState(null)
    const [newInput, setNewInput] = useState(false)
    const [profit, setProfit] = useState(0)
    const [finalProfit, setFinalProfit] = useState(0)
    const [blocks, setBlocks] = useState([])

    useEffect(() => {
        console.log(newInput, baseSales)
        setProfit(prevProfit => {
            let x = 0;
            blocks.map(blk => {
                if (blk.type === "sal") x += blk.amount
                else if (blk.type === "exp") x -= blk.amount
                return blk
            })
            console.log(profit)
            return x
        })

        setFinalProfit(prev => {
            let p = profit
            blocks.every(blk => {
                if (blk.type === "cut")
                    p -= blk.amount
                    return blk
            })
            return p
        })

    }, [newInput, baseSales, blocks])



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
                {newInput ? <Block input baseSales={baseSales} setBlocks={setBlocks} profit={profit} setNewInput={setNewInput} setBaseSales={setBaseSales} />: null}
                <Block createNew setNewInput={setNewInput} profit={profit} />
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
