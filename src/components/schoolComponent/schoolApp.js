import React,{useState,useEffect,useRef,useImperativeHandle} from "react"
import gql from "graphql-tag"
import {useMutation} from "react-apollo"

// import Autosuggest, { ItemAdapter } from 'react-bootstrap-autosuggest'

import styles from "./schoolInput.module.css"
import Country from "./country"
import Region from "./region"
import Division from "./division"
import Subdivision from "./subdivision"
import Town from "./town"
import Address from "./address"

import Department from "./departmentInput"
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import FormGroup from "react-bootstrap/FormGroup"
// import MultipleSelect from "react-bootstrap/MultipleSelect"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool,faWindowClose,faHouseUser, faFlag, faChartArea, faBullseye, faIcicles, faCircle, faDotCircle, faUser } from '@fortawesome/free-solid-svg-icons'

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
let schoolInformation = gql`
    mutation(
        $schoolName:String!,
        $schoolSection:[sectionType],
        $country:String!,
        $region:String!,
        $division:String!,
        $subdivision:String!,
        $city:String!,
        $address:String!){
            schoolInformation(
                schoolName:$schoolName,
                schoolSection:$schoolSection,
                country:$country,
                region:$region,
                division:$division,
                subdivision:$subdivision,
                city:$city,
                address:$address,
            ){
                schoolName,
                schoolSection{
                    key,
                    name,
                    value,
                  },
                country,
                region,
                division,
                subdivision,
                city,
                address,
            }
        }
`
let SchoolApp = React.forwardRef((props,ref)=>{
    let [schoolInformationMutation,{data,error,loading}] = useMutation(schoolInformation)
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
                            value="SCHOOL REGISTRATION FORM"
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
                    
                    <form   onSubmit={(e)=>{
                        e.preventDefault()
                        let schoolSubmittedInformation = stateInput.inputSection.filter((currentValue)=>{
                            return document.getElementById(String(currentValue.key)).value !=  ""
                        }).map(i=>{
                            return {
                                        key:i.key,
                                        name:i.name,
                                        value: document.getElementById(String(i.key)).value,                                    }
                        })
                        let schoolName = stateInput.schoolName
                        let schoolSection = schoolSubmittedInformation
                        let country = countryRef.current.value
                        let region =regionRef.current.value
                        let division = divisionRef.current.value
                        let subdivision = subDivisionRef.current.value
                        let city = cityRef.current.value
                        let address = addressRef.current.value
                            
                            schoolInformationMutation({
                                variables:{
                                    schoolName,
                                    schoolSection,
                                    country,
                                    region,
                                    division,
                                    subdivision,
                                    city,
                                    address,
                                },update: (cache, data) => {
                                    console.log("cache in memory::",cache.config.dataIdFromObject)
                                },
                                onCompleted:(data)=>{
                                    console.log("print on Completed mutation::",data)
                                },
                                
                            }
                            ).then((result)=>{
                                console.log("results::",result.data)
                            })
                            console.log("<<<<<<<SAVING TO THE DATABASE>>>>>>>>")
                            
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
                                                        placeholder="Enter School Section"
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
                        <div >
                            <InputGroup className="mb-4">
                                <Country ref={countryRef}
                                    FontAwesomeIcon={FontAwesomeIcon}
                                    faFlag = {faFlag}
                                    InputGroup={InputGroup}
                                    FormControl={FormControl}/>
                                <Region ref={regionRef}
                                    FontAwesomeIcon={FontAwesomeIcon}
                                    faChartArea = {faChartArea}
                                    InputGroup={InputGroup}
                                    FormControl={FormControl}
                                    country={""}/>
                            </InputGroup>
                            <InputGroup className="mb-4">
                                <Division ref={divisionRef}
                                    FontAwesomeIcon={FontAwesomeIcon}
                                    faBullseye = {faBullseye}
                                    InputGroup={InputGroup}
                                    FormControl={FormControl}
                                    region={""} />
                                <Subdivision ref={subDivisionRef}
                                    FontAwesomeIcon={FontAwesomeIcon}
                                    faIcicles = {faDotCircle}
                                    InputGroup={InputGroup}
                                    FormControl={FormControl}
                                    division={""}/>
                            </InputGroup>
                            <InputGroup className="mb-4">
                                <Town ref={cityRef}
                                    FontAwesomeIcon={FontAwesomeIcon}
                                    faIcicles = {faCircle}
                                    InputGroup={InputGroup}
                                    FormControl={FormControl}
                                    subdivision={""}/>
                                    
                                <Address ref={addressRef}
                                    FontAwesomeIcon={FontAwesomeIcon}
                                    faIcicles = {faCircle}
                                    InputGroup={InputGroup}
                                    FormControl={FormControl}
                                    Town={""}/>
                            
                            </InputGroup>
                        </div>
                    
                    
                    <Button size="lg" type="submit" /*onClick={onsubmit}*/ variant="outline-success" >
                            Submit
                    </Button>  
                </form>       
                {/* </div> */}
                
            </div>
        </div>
    )
}
)
export default SchoolApp