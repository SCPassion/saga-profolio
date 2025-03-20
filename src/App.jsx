import { tokenList } from "./saga.js"
import React from 'react'
import Main from '../components/Main.jsx'

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
                }),
                mode: 'cors'
            })

            const data = await response.json()
            console.log(data.result.pools)
            setAPIresponse(data.result.pools)
        } catch (err) {
            window.alert("Error fetching data, please try again later!")
        }

    }

    function handleTokenSubmit(formData) {
        fetchPool(formData.get("tokenList"))
    }

    return (
        <>
            <header>
                <h1>The Degen Saganauts</h1>
            </header>

            <Main
                handleTokenSubmit={handleTokenSubmit}
                APIresponse={APIresponse}
                tokenList={tokenList}
            />

            <footer>
                <p><span>Created by SCP, Frontend Developer</span></p>
                <p>Saga ambassador & NodeStake contributor</p>
            </footer>
        </>)
}