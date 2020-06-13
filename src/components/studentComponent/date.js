import React , {useState,useEffect} from "react"


    let Dater=(props)=>{
        let {InputGroup, FormControl, FontAwesomeIcon,faClock,faCalender}=props
        let interval =""
        let [state,setState] = useState({
            time: ()=>{
                let date = new Date()
                return date
            }
        } )
    
    
    useEffect(()=>{
        interval = setInterval(
            ()=>{
                setState(
                    {
                        time: ()=>{
                            let newdate = new Date()
                            return newdate
                        }
                    }
                )
            },
        1000)
    },[interval])
    
    // componentWillUnmount(){
    //     clearInterval(this.interval)
    // }
    // render(){
        return (
            <React.Fragment>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faClock} size="xs" color="blue"/>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        value={state.time().toLocaleTimeString().replace(/[a-z]/gi,"")}
                        readOnly
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faCalender} size="xs" color="blue"/>
                        </InputGroup.Text>
                    </InputGroup.Append>
                    <FormControl
                        value={state.time().toLocaleDateString()}
                        readOnly
                    />
                </InputGroup>
            </React.Fragment>
            
        )
    
}

export default React.memo(Dater)