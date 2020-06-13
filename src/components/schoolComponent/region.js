import React , {useState} from "react"

let initialState = {
    region:"",
}

let Region=React.forwardRef((props,ref)=>{

    let {FontAwesomeIcon, faChartArea, InputGroup,FormControl} = props
    let [state,setState]= useState(initialState)

    let onchange = (e)=>{
        setState((previouState)=>({
            region: e.target.value,
        }))
    }
    
    return(
        <>
            <InputGroup.Prepend>
                <InputGroup.Text>
                    <FontAwesomeIcon color="blue" icon={faChartArea} />
                </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                required
                onChange={onchange}
                ref={ref}
                value ={state.region}
                as="select"
                >
                    <option defaultChecked hidden>Region</option>
                    <option>Center</option>
                    <option>south West</option>
                    <option>Littoral</option>
                </FormControl>
        </>
    )
})
export default React.memo(Region)