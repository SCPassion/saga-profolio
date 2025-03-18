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

    fetchPool(tokenList[0].ercAddress)
    return (<h1>Saga DEGEN Manager</h1>)
}