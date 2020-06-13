import React , {useState} from "react"

let initialState = {
    country:"",
}
let Country=React.forwardRef((props,ref)=>{

    let {FontAwesomeIcon, faFlag, InputGroup,FormControl} = props

    let [state,setState]= useState(initialState)

    let onchange = (e)=>{
        setState((previouState)=>({
            country: e.target.value,
        }))
    }
    return(
        <>
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        <FontAwesomeIcon color="blue" icon={faFlag} />
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    required
                    onChange={onchange}
                    ref={ref}
                    value ={state.country}
                    as="select"
                    >
                        <option defaultChecked hidden>Country</option>
                        <option>Cameroon</option>
                </FormControl>
        </>
    )
})
export default React.memo(Country)