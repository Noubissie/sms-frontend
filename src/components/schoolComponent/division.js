import React , {useState} from "react"

let initialState = {
    division:"",
}
let Division=React.forwardRef((props,ref)=>{

    let {FontAwesomeIcon, faBullseye, InputGroup,FormControl} = props
    let [state,setState]= useState(initialState)

    let onchange = (e)=>{
        setState((previouState)=>({
            division: e.target.value,
        }))
    }
    return(
        <>
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        <FontAwesomeIcon color="blue" icon={faBullseye} />
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    required
                    onChange={onchange}
                    ref={ref}
                    value ={state.division}
                    as="select"
                    >
                        <option defaultChecked hidden>Division</option>
                        <option>nyo'o et Soo</option>
                    </FormControl>
            </>
    )
})
export default React.memo(Division)