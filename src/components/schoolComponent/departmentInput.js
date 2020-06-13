import React,{useState,useEffect,useRef,useImperativeHandle} from "react"

// import Autosuggest, { ItemAdapter } from 'react-bootstrap-autosuggest'

import styles from "./schoolInput.module.css"



import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool,faWindowClose,faHouseUser } from '@fortawesome/free-solid-svg-icons'

let key0 = 0
let initialState = {
    inputSection:[
        {
            key:key0,
            name: "Section"+" "+ key0,
            value:null,
        }
    ],
    schoolName:"",
}
let Department = React.forwardRef((props,ref)=>{

    let [stateInput, setStateInput] = useState(initialState)
    let schoolNameRef= useRef()
    let countryRef = useRef()
    let regionRef = useRef()
    let divisionRef = useRef()
    let subDivisionRef = useRef()
    let cityRef = useRef()
    let addressRef = useRef()

    let onchangeSection=(e)=>{
        console.log("id::",e.target.id)
        let b = parseInt(e.target.id)
        console.log("document.getElementById(0).style::",document.getElementById("0").style)
        
        // let lengthofSection = stateInput.inputSection.length
            
            if((stateInput.inputSection.filter((current)=>{
                return current.key === b+1
            })).length === 0){
                stateInput.inputSection.push({
                    key:stateInput.inputSection[b].key + 1,
                    name:"Section"+" "+(stateInput.inputSection[b].key + 1),
                    value:null,
                })
                setStateInput((previousState)=>({
                    ...previousState,
                    inputSection:previousState.inputSection,
                }))
            }
        console.log("this stateInput::",stateInput)
    }
    useImperativeHandle(
        ref,
        () => ({
            change:(e)=>{
                return "e.target.value::"
            }
        }),
        []
    )
    

    let onclick = (e) =>{
        
         
        // console.log("hello world")
        let b = parseInt(e.target.id)
        switch(b){
            case 0:
                // console.log(">>>>>>>>", e.target.style)
                e.target.style.color="red"
                // console.log("e.target.color::",e.target.style.color ) 
                break
            case stateInput.inputSection.length -1:
                setStateInput((previousState)=>({
                    ...previousState,
                    inputSection:previousState.inputSection.filter((currentValue)=>{
                        return currentValue.key !== b
                    }),
                    
                }))
                break
            
            default:
                e.target.style.color="orange"
        }
       
    
    }
    let onchange = (e)=>{
        setStateInput((previouState)=>({
            ...previouState,
            schoolName:schoolNameRef.current.value,
        }))
        
    }
    
    // let onsubmit = ()=>{
        
    // }
    
    useEffect(()=>{
        
        document.body.style.backgroundImage = "none"
    })
    return( 
        <div className={styles.SchoolApp}>
            <div className={styles.SchoolAppBox}>
                <InputGroup className="mt-4 mb-4">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon color="blue" icon={faSchool} />
                            </InputGroup.Text>
                            
                        </InputGroup.Prepend>
                        <FormControl
                            readOnly
                            as="textarea"
                            value="DEPARTMENTS REGISTRATION FORM"
                            style={{textAlign:"center",backgroundColor:"blue",color:"white",fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"}}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>
                                <FontAwesomeIcon
                                    // ref={section1Ref} 
                                    size="lg"
                                    color="blue" icon={faSchool}/>
                            </InputGroup.Text>
                        </InputGroup.Append>
                </InputGroup>
                {/* <div className={styles.schoolName}> */}
                    
                    <form   onSubmit={()=>{
                        let schoolSubmittedInformation = stateInput.inputSection.filter((currentValue)=>{
                            return document.getElementById(String(currentValue.key)).value !=  ""
                        })
                        for(let i of schoolSubmittedInformation){
                            i.value = document.getElementById(String(i.key)).value
                        }
                        let schoolName = stateInput.schoolName
                        let schoolSection = schoolSubmittedInformation
                        let country = countryRef.current.value
                        let region =regionRef.current.value
                        let division = divisionRef.current.value
                        let subdivision = subDivisionRef.current.value
                        let city = cityRef.current.value
                        let address = addressRef.current.value
                            
                            
                    }
                    }>
                        <InputGroup className="mt-4 mb-4">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon color="blue" icon={faSchool} />
                                </InputGroup.Text>
                                
                            </InputGroup.Prepend>
                            <FormControl
                                    required 
                                    ref={schoolNameRef}
                                    onChange={onchange}
                                    placeholder="Enter Name of school"
                                    id="schoolName"
                                    value={stateInput.schoolName}
                                />
                        </InputGroup>
                        {   
                            stateInput.inputSection.map((currentValue)=>{
                                // console.log("currentValue::",currentValue)
                                return <div  key={currentValue.key}>
                                            <InputGroup className="mt-4 mb-4">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>
                                                        <FontAwesomeIcon color="blue" icon={faHouseUser} />
                                                    </InputGroup.Text>
                                                    
                                                </InputGroup.Prepend>
                                                <FormControl
                                                        placeholder="Enter Departments"
                                                        className={styles.inputStyle}
                                                        onChange={onchangeSection}
                                                        id={String(currentValue.key)} 
                                                        // value={currentValue.value}
                                                        // key={currentValue.key} 
                                                        name={currentValue.name} 
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text>
                                                        <FontAwesomeIcon
                                                            // ref={section1Ref} 
                                                            size="lg"
                                                            onClick={onclick}
                                                            id={String(currentValue.key)}
                                                            color="blue" icon={faWindowClose}/>
                                                    </InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                    </div>
                            })
                        } 
                </form>       
                {/* </div> */}
                
            </div>
        </div>
    )
}
)
export default Department