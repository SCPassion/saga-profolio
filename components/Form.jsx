export default function (props) {

    const tokenSymbolElements = props.tokenList.map(token => {
        return (
            <option
                key={token.ercAddress}
                value={token.symbol}
            >
                {token.symbol}
            </option>
        )
    })
    return (
        <form action={props.handleTokenSubmit}>
            <section className="element-submission">
                <label htmlFor="tokenList">
                    Pick your degen token pool here:
                </label>
                <select id="tokenList" name="tokenList">
                    {tokenSymbolElements}
                </select>
            </section>
            <button disabled className="btn-submit">Submit!</button>
        </form>
    )
}