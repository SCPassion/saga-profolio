import { tokenList, okuPoolUrl } from "./saga.js"
import React from 'react'

export default function () {

    const [APIresponse, setAPIresponse] = React.useState([])

    async function fetchPool(token) {
        try {
            const response = await fetch('https://omni.icarus.tools/saga/cush/searchPoolsByTokenNameOrSymbol', {
                method: 'POST',
                heeaders: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    params: [
                        token,
                        {
                            result_size: 10,
                            sort_by: "t0_change_usd",
                            sort_order: true
                        }
                    ]
                })
            })

            const data = await response.json()
            setAPIresponse(data.result.pools)
        } catch (err) {
            window.alert("Error fetching data, please try again later!")
        }

    }

    function handleTokenSubmit(formData) {
        fetchPool(formData.get("tokenList"))
    }

    const tokenSymbolElements = tokenList.map(token => {
        return (
            <option
                key={token.ercAddress}
                value={token.symbol}
            >
                {token.symbol}
            </option>
        )
    })

    const poolElements = APIresponse.map((pool, index) => {
        const {
            t0_symbol, t0_price_usd, t0_tvl, t0_tvl_usd,
            t1_symbol, t1_price_usd, t1_tvl, t1_tvl_usd,
            total_fees_usd, total_volume_7d_usd, tvl_usd,
            address
        } = pool

        const token0 = tokenList.filter(token => token.symbol === t0_symbol)
        const token1 = tokenList.filter(token => token.symbol === t1_symbol)

        if (token0.length === 0 || token1.length === 0) {
            return null
        }

        const icon0 = token0[0].icon
        const icon1 = token1[0].icon
        return (
            <div
                key={index}>
                <a href={`${okuPoolUrl}${address}`} target="_blank" className="matrix-container">
                    <div className="tvl-info">
                        <h2 className="token-pair">
                            <img src={icon0} width="30px" height="30px" />
                            <span> {t0_symbol} / {t1_symbol} </span>
                            <img src={icon1} width="25px" height="25px" />
                        </h2>
                        <div className="tvl-matrix">
                            <p><span>TVL (USD)</span>: ${tvl_usd.toFixed(2)}</p>
                            <p><span>Total fees</span>: ${total_fees_usd.toFixed(2)}</p>
                        </div>
                        <p><span>7-day Volume</span>: ${total_volume_7d_usd.toFixed(2)}</p>
                    </div>
                    <div>
                        <p><span>Total {t0_symbol}</span>: {t0_tvl.toFixed(2)}</p>
                        <p><span>In USD</span>: ${t0_tvl_usd.toFixed(2)}</p>
                    </div>
                    <div>
                        <p><span>Total {t1_symbol}</span>: {t1_tvl.toFixed(2)}</p>
                        <p><span>In USD</span>: ${t1_tvl_usd.toFixed(2)}</p>
                    </div>
                </a>
            </div>
        )
    })

    return (
        <>
            <header>
                <h1>The Degen Saganauts</h1>
            </header>

            <main>
                <form action={handleTokenSubmit}>
                    <section className="element-submission">
                        <label htmlFor="tokenList">
                            Pick your degen token pool here:
                        </label>
                        <select id="tokenList" name="tokenList">
                            {tokenSymbolElements}
                        </select>
                    </section>
                    <button className="btn-submit">Submit!</button>
                </form>

                <section className="pool-results">
                    {poolElements}
                </section>
            </main>

            <footer>
                <p><span>Created by SCP, Frontend Developer</span></p>
                <p>Saga ambassador & NodeStake contributor</p>
            </footer>
        </>)
}