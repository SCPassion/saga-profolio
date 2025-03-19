import { tokenList } from "./saga.js"
import React from 'react'
import { APIresponseExample } from "./apiResponse.js"

export default function () {

    const [APIresponse, setAPIresponse] = React.useState([])

    async function fetchPool(tokenAddress) {
        try {
            const response = await fetch('https://omni.icarus.tools/saga/cush/searchPoolsByAddress', {
                method: 'POST',
                heeaders: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    params: [
                        tokenAddress,
                        {
                            result_size: 2,
                            sort_by: "t0_change_usd",
                            sort_order: true
                        }
                    ]
                })
            })

            const data = await response.json()
            console.log(data)
            setAPIresponse(data.result.pools)
        } catch (err) {
            window.alert("Error fetching data, please try again later!")
        }

    }

    function handleTokenSubmit(formData) {
        fetchPool(formData.get("tokenList"))
    }

    const tokenSymbolElements = tokenList.map(token => (
        <option
            key={token.ercAddress}
            value={token.ercAddress}
        >
            {token.symbol}
        </option>
    ))

    const poolElements = APIresponse.map((pool, index) => {
        const {
            t0_symbol, t0_price_usd, t0_tvl, t0_tvl_usd,
            t1_symbol, t1_price_usd, t1_tvl, t1_tvl_usd,
            total_fees_usd, total_volume_7d_usd, tvl_usd
        } = pool

        return (
            <div className="matrix-container"
                key={index}>
                <div className="tvl-info">
                    <h2>{t0_symbol}/{t1_symbol} POOL</h2>
                    <p>Total value locked: ${tvl_usd.toFixed(2)}</p>
                    <p>Total fees: ${total_fees_usd.toFixed(2)}</p>
                    <p>Total volume in the last 7 days: ${total_volume_7d_usd.toFixed(2)}</p>
                </div>
                <div>
                    <p>{t0_symbol} Liquidity: {t0_tvl.toFixed(2)}</p>
                    <p>USD: ${t0_tvl_usd.toFixed(2)}</p>
                </div>
                <div>
                    <p>{t1_symbol} Liquidity: {t1_tvl.toFixed(2)}</p>
                    <p>USD: ${t1_tvl_usd.toFixed(2)}</p>
                </div>
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
                            Pick your degen token here:
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

        </>)
}