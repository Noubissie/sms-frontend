import React , {useState} from "react"

let initialState = {
    town:"",
}
let Town=React.forwardRef((props,ref)=>{

    let {FontAwesomeIcon, faIcicles, InputGroup,FormControl} = props

    let [state,setState]= useState(initialState)

    let onchange = (e)=>{
        setState((previouState)=>({
            town: e.target.value,
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
                value ={state.town}
                as="select"
                >
                    <option defaultChecked hidden>Town</option>
                    <option>Dzeng</option>
                    <option>Tiko</option>
                    <option>Douala</option>
                </FormControl>
        </>
    )
})
export default React.memo(Town)