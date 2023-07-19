import React, { useState } from 'react';
import styles from '../css/block.module.css'
import CloseIcon from '@mui/icons-material/Close';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Block = ({ input, setBlocks, setBaseSales, baseSales, createNew, details, id, setNewInput }) => {

    const [cutInput, setCutInput] = useState("")

    const handleClick = e => {
        if (createNew) {
            setNewInput(true)
        }
    }

    const handleButtonsClick = e => {
        if (e.target.name === "bs") {

            setNewInput(prev => {
                setBaseSales(prev => {
                    return prev ? Number(prev) + Number(cutInput) : Number(cutInput)
                })
                setBlocks(prev => {
                    return [...prev,
                    {
                        name: "",
                        cut: Number(cutInput),
                        cutType: "",
                        isBaseSales: true,
                        date: (new Date().toDateString()),
                        amount: Number(cutInput)
                    }]
                })
                return false
            })
        }
        else if (e.target.name === "rs")
        {
            setNewInput(prev => {
                setBlocks(prev => {
                    return [...prev,
                    {
                        name: "",
                        cut: Number(cutInput),
                        cutType: "",
                        isBaseSales: false,
                        date: (new Date().toDateString()),
                        amount: Number(cutInput)
                    }]
                })
                return false
            })
        }
        else if (e.target.name === "pc") {
            setNewInput(prev => {
                setBlocks(prev => {
                    return [...prev,
                    {
                        name: "",
                        cut: Number(cutInput),
                        cutType: "%",
                        isBaseSales: false,
                        date: (new Date().toDateString()),
                        amount: baseSales * Number(cutInput) / 100
                    }]
                })
                return false
            })
        }
        else {
            console.log(e.target.name)
        }
    }

    const handleCloseButton = e => {
        setBlocks(prev => {
            return prev.filter((blk, index)=> {
                if (index === id)
                {
                    if (blk.isBaseSales) setBaseSales(prev => prev - blk.amount)
                }
                return index !== id
            })
        })
    }

    if (input)
        return (
            <div className={styles.block}>
                <div className={`${styles.row} ${styles.flexCenterCol}`}>
                    <input type="text" className={styles.nameInput} />
                    <p className={styles.date}>{new Date().toDateString()}</p>
                </div>
                <div className={`${styles.row} ${styles.cutWithOptions} ${styles.flexCenter}`}>
                    <input autoFocus type="text" value={cutInput} onChange={e => setCutInput(e.target.value)} className={`${styles.cutInput}`} />
                    <div className={styles.cutOptions}>
                        <button name="bs" onClick={handleButtonsClick}>Base</button>
                        <button name="rs" onClick={handleButtonsClick} className={styles.rsbtn}>{`₹`}</button>
                        <button name="pc" onClick={handleButtonsClick}>%</button>
                    </div>
                </div>
                <div className={`${styles.row} ${styles.price} ${styles.flexCenter}`}>{null}</div>
                <div className={styles.cross}><CloseIcon /></div>
            </div>
        )
    else
        return (
            <div className={`${styles.block} ${createNew ? styles.createNew : null}`} onClick={handleClick}>
                {
                    createNew ? <>
                        <div className={styles.centeredgrey}>Add Entry</div>
                    </> :
                        <>
                            <div className={`${styles.row} ${styles.flexCenterCol}`}>
                                <input type="text" className={styles.nameInput} defaultValue={details.name} />
                                <p className={styles.date}>{details.date}</p>
                            </div>
                            <div className={`${styles.row} ${styles.cut} ${styles.flexCenter}`}>{details.cutType === "%" ? null : <CurrencyRupeeIcon />}{details.cut}{details.cutType === "%" ? "%" : null}</div>
                            <div className={`${styles.row} ${styles.price} ${details.isBaseSales ? styles.green : styles.yellow} ${styles.flexCenter}`}><CurrencyRupeeIcon />{details.amount}</div>
                            <div className={styles.cross} onClick={handleCloseButton}><CloseIcon /></div>
                        </>
                }

            </div>
        );
}

export default Block;
