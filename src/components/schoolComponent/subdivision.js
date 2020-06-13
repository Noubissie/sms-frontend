import React , {useState} from "react"

let initialState = {
    subdivision:"",
}
let Subdivision=React.forwardRef((props,ref)=>{

    let {FontAwesomeIcon, faIcicles, InputGroup,FormControl} = props
    let [state,setState]= useState(initialState)

    let onchange = (e)=>{
        setState((previouState)=>({
            subdivision: e.target.value,
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
                required
                onChange={onchange}
                ref={ref}
                value ={state.subdivision}
                as="select"
                >
                    <option defaultChecked hidden>Sub division</option>
                    <option>Dzeng</option>
                </FormControl>
        </>
    )
})
export default React.memo(Subdivision)