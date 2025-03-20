import { okuPoolUrl } from "../src/saga.js"

export default function (props) {
    const poolElements = props.APIresponse.map((pool, index) => {

        const {
            t0_symbol, t0_price_usd, t0_tvl, t0_tvl_usd,
            t1_symbol, t1_price_usd, t1_tvl, t1_tvl_usd,
            total_fees_usd, total_volume_7d_usd, tvl_usd,
            address
        } = pool

        const token0 = props.tokenList.filter(token => token.symbol === t0_symbol)
        const token1 = props.tokenList.filter(token => token.symbol === t1_symbol)

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
        <section className="pool-results">
            {poolElements}
        </section>
    )
}