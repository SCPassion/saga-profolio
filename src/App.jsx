import { tokenList } from "./saga.js"

export default function() {
    
    async function fetchPool(tokenAddress) {
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
    }

    function handleTokenSubmit(formData) {
        console.log(formData.get("tokenList"))    
    }

    const tokenSymbolElements = tokenList.map(token=>(
        <option 
            key={token.ercAddress}
            value={token.ercAddress}
        >
            {token.symbol}
        </option>
    ))

    fetchPool(tokenList[0].ercAddress)
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
        </main>
    </>)
}