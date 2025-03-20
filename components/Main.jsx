import Form from "./Form.jsx"
import Pool from "./Pool.jsx"

export default function (props) {
    return (
        <main>
            <Form
                handleTokenSubmit={props.handleTokenSubmit}
                tokenList={props.tokenList}
            />

            <Pool
                APIresponse={props.APIresponse}
                tokenList={props.tokenList}
            />
        </main>
    )
}