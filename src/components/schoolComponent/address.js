import React , {useState} from "react"

let initialState = {
    address:"",
}
let Address=React.forwardRef((props,ref)=>{

    let {FontAwesomeIcon, faIcicles, InputGroup,FormControl} = props

    let [state,setState]= useState(initialState)

    let onchange = (e)=>{
        setState((previouState)=>({
            address: e.target.value,
        }))
    }

    return(
        <>
            <InputGroup.Prepend>
                <InputGroup.Text>
                    <FontAwesomeIcon color="blue" icon={faIcicles} />
                </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                onChange={onchange}
                required
                ref={ref}
                value ={state.address}
                as="select"
                >
                    <option defaultChecked hidden>Address</option>
                    <option>akokoki</option>
                    <option>obili</option>
                    <option>mayana</option>
                </FormControl>
        </>
    )
})
export default React.memo(Address)