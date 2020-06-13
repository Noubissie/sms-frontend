import React , {useState, useRef, useCallback,useEffect, useMemo} from "react"
import styles from "./studentInput.module.css"
import VerifierNav from "./verifier"
// import {StudentRegistrationRef,Student} from "../useRefAll"
// import ScreenFill from "./screenfill"
import Dater from "./date"
import Validation from "./validation"
import {Userprovider} from "./Context"

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage,faIdCard, faUser, faUserGraduate, faCalendarAlt,  faPhoneAlt, faTransgender, faHouseUser, faVoicemail, faUserClock, faCalendarDay, faTasks, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl"
import FormFile from "react-bootstrap/FormFile"
// import Card from "react-bootstrap/Card"
// import Container from "react-bootstrap/Container"
// import Carousel from "react-bootstrap/Carousel"
// import Form from "react-bootstrap/Form"
// import Row from "react-bootstrap/Row"
// import Col from "react-bootstrap/Col"

let image = "image/t3.jpg"
let backgroundimg = "image/PHOTO.jpg" 



let countDown
let timeout

let initialState = {
    testImage:"",
    height:"",
    familyName : "",
    givenName : "",
    imageFileName:"",
    gender:"",
    contact1:"+237",
    contact2:"",
    contact3:"",
    pob:"",
    Dob:"",
    clientId:"",
    StudentEmailHead:"",
    StudentEmailTail:"",

    GfamilyName : "",
    GgivenName : "",
    Goccupation:"",
    GimageFileName:"",
    Ggender:"",
    Gcontact1:"+237",
    Gcontact2:"",
    Gcontact3:"",
    // Gpob:"",
    GDob:"",
    date: `${new Date().getFullYear()}-12-31`,
    GuidantEmailHead:"",
    GuidantEmailTail:"",

    password:"",
    confirmPassword:"",
    display:"none",
    countdown:3,
    saveDisplay:"none",
    cancelDisplay:"none",
    waitDisplay:"inline",
}
let StudentName = (props)=>{
    
        let [state,setState] = useState(initialState)
        
        let familyNameRef = useRef()
        let givenNameRef = useRef()
        let imageRef = useRef()
        let genderRef = useRef()
        let pobRef = useRef()
        let DobRef = useRef()
        let clientIdRef = useRef()

        let StudentEmailHeadRef=useRef()
        let StudentEmailTailRef=useRef()

        let contact1Ref = useRef()
        let contact2Ref = useRef()
        let contact3Ref = useRef()
       
        let GfamilyNameRef = useRef()
        let GgivenNameRef = useRef()
        let GoccupationRef = useRef()
        let GgenderRef = useRef()
        // let GpobRef = useRef()
        let GDobRef = useRef()
        let GcontactRef = useRef()
        let GImageFileRef = useRef() 
        let GuidantEmailHeadRef = useRef()
        let GuidantEmailTailRef = useRef()

        let Gcontact1Ref = useRef()
        let Gcontact2Ref = useRef()
        let Gcontact3Ref = useRef()

        let passwordRef = useRef()
        let confirmPasswordRef = useRef()
       
        let createComponentRef = useRef()

    let macFullStopControl=(reference)=>{
            let newstate = reference.current.value.trim().split(" ")
            .map((x)=>{
                return x.trim().replace(/\.$/gi,"")
            })
            .join(" ") 
            return newstate 
    }
    let onblur = ()=>{
        if(Boolean(navigator.platform.match(/MAC/gi))){
            setState((previousState)=>(
                {   ...previousState,

                    familyName: macFullStopControl(familyNameRef),
                    givenName: macFullStopControl(givenNameRef),

                    GfamilyName: macFullStopControl(GfamilyNameRef),
                    GgivenName: macFullStopControl(GgivenNameRef)
                })
            )
        }
        else{
        setState((previousState)=>(
            {
                ...previousState,
                familyName: familyNameRef.current.value.trim().endsWith(".")
                ? familyNameRef.current.value.trim().replace(/\.$/gi,""):familyNameRef.current.value.trim(),
                givenName: givenNameRef.current.value.trim().endsWith(".")
                ? givenNameRef.current.value.trim().replace(/\.$/gi,""):givenNameRef.current.value.trim()
                
            })
        )
        }
    }
 
    
    let onchange= () =>{
        setState((previousState)=>(
            {
                ...previousState,
                familyName : familyNameRef.current.value,
                givenName : givenNameRef.current.value,
                imageFileName:imageRef.current.value,
                contact1:contact1Ref.current.value,
                contact2:contact2Ref.current.value,
                contact3:contact3Ref.current.value,
                gender:genderRef.current.value,
                pob:pobRef.current.value,
                Dob:DobRef.current.value,
                StudentEmailHead:StudentEmailHeadRef.current.value,
                StudentEmailTail:StudentEmailTailRef.current.value,
                clientId:clientIdRef.current.value,

                GfamilyName : GfamilyNameRef.current.value,
                GgivenName : GgivenNameRef.current.value,
                Goccupation:GoccupationRef.current.value,
                GimageFileName:GImageFileRef.current.value,
                Ggender:GgenderRef.current.value,
                Gcontact1:Gcontact1Ref.current.value,
                Gcontact2:Gcontact2Ref.current.value,
                Gcontact3:Gcontact3Ref.current.value,
                // Gpob:GpobRef.current.value,
                GDob:GDobRef.current.value,
                GuidantEmailHead:GuidantEmailHeadRef.current.value,
                GuidantEmailTail:GuidantEmailTailRef.current.value,

                password:passwordRef.current.value,
                confirmPassword:confirmPasswordRef.current.value,
            })
        )}

    
    
    let onwait = (e)=>{
            e.target.style.backgroundColor = "none"
            e.target.style.animation = "none"
            clearTimeout(timeout)
            clearInterval(countDown)
            setState((previousState)=>(
                {
                    ...previousState,
                    countdown:3,
                    waitDisplay:"none",
                    saveDisplay:"inline",   //Display verification save button
                    cancelDisplay:"inline"  //Display verifiacation cancel button
                }
                ))
            
            e.preventDefault()
        }
    
    let oncancel = (e)=>{
        setState((previousState)=>({
            ...previousState,
            countdown:3,
            display:"none",
            saveDisplay:"none",
            cancelDisplay:"none",
            waitDisplay:"inline",
        }))
        e.preventDefault()
    }
    let onsave = (e)=>{
       
            console.log("..............saving to database")

            setState(initialState)

            e.preventDefault()
        
    }
    
    let onsubmit = (e)=>{
        
        createComponentRef.current.focusButton()
        if(state.display === "none"){
            setState((previousState)=>(
                {
                    ...previousState,
                    display:"inline",
                }
                ))
        countDown = setInterval(()=>{
            setState((previousState)=>(
                {
                    ...previousState,
                    countdown: previousState.countdown-1,
                })
            )
        }       
        ,1000)
        
        timeout =  setTimeout(()=>{
            clearInterval(countDown) 
            setState({
                ...initialState, 
            })
            for(let i=0;i<10;i++){
                console.log(".......saving to database",i)
            }
              
        },4000)
        
    }
    // else{
    //     alert("this was never supose to happon, located some where around row:175 .")
    // }
   

        
        e.preventDefault()
    }

 

    // componentDidCatch=()=>{
        
    // }

    useEffect(()=>{
        clientIdRef.current.focus()
        // document.body.style.backgroundImage = `url(${bimg})`
        // document.body.style.color = "Green"
         
    },[])
     
    
     
        
        return (
            
            
            <div className={styles.studentInformationContainer} style={{display:props.display}}>
                
                <VerifierNav familyName={state.familyName} givenName={state.givenName} clientId={state.clientId}/>
                    {/* {styles.body.backgroundImage = require("./t3.jpg")} */}

                <form onSubmit={onsubmit}>
                    <div className={styles.div1}> 
                        <div className={styles.studentNameContainer}>
                            
                                <h2 className={styles.heading}>
                                    <InputGroup  >
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUserGraduate} color="blue"/>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl 
                                        readOnly
                                        style={{textAlign:"center",color:"white",backgroundColor:"blue"}}
                                        value="STUDENT PERSONAL INFORMATION"/>
                                        
                                                
                                        <InputGroup.Append>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUserGraduate} color="blue"/>
                                            </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    
                                </h2>
                            <div className={styles.studentPersonalInformation}>
                            {/* <Carousel  controls={false} interval="1000" indicators={false}>
                                <Carousel.Item>
                                        <div>STUDENT PERSONAL INFORMATION</div>
                                    <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                <div>STUDENT PERSONAL INFORMATION</div>

                                    <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                <div>STUDENT PERSONAL INFORMATION</div>

                                    <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel> */}
                            <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">
                                            <FontAwesomeIcon icon={faImage} color="blue"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormFile 
                                    onChange={onchange}
                                    value={state.imageFileName}
                                    label={state.imageFileName}
                                    ref={imageRef}
                                    custom={true}
                                    data-browse="student picture"
                                />
                        
                                </InputGroup>
                                
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">
                                            <FontAwesomeIcon icon={faIdCard} color="blue"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                    onChange={onchange} ref={clientIdRef} name={props.name}
                                    value={state.clientId}
                                    placeholder="Enter student ID*"
                                    type="number"
                                    aria-label="Enter student ID*"
                                    aria-describedby="basic-addon1"
                                    pattern="[^e]"
                                    />
                                 
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUser} color="blue"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl 
                                        onChange={onchange}
                                        onBlur={onblur}
                                        placeholder="Family name*"
                                        ref={familyNameRef}
                                        value={state.familyName} 
                                        aria-label= "Enter Family name*"
                                        />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUserGraduate} color="blue"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        onBlur={onblur} 
                                        ref={givenNameRef}
                                        value={state.givenName}
                                        onChange={onchange}
                                        placeholder="Enter Given name*"
                                        name={props.Givenname}
                                        aria-label= "Enter Given name*"
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faCalendarAlt} color="blue"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        onBlur={onblur} 
                                        onFocus={(e)=>{e.target.type="Date"}}
                                        ref={DobRef}
                                        value={state.DOB}
                                        onChange={onchange}
                                        placeholder="Date of birth*"
                                        aria-label= "Date of birth*"
                                        max={state.date}
                                        name={props.DOB}
                                    />
                                </InputGroup>
                                    
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faHouseUser} size="xs" color="blue"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        onBlur={onblur} 
                                        ref={pobRef}
                                        value={state.pob}
                                        onChange={onchange}
                                        placeholder="Enter place of birth*"
                                        aria-label= "Enter place of birth*"
                                        name={props.POB}
                                    />
                                </InputGroup>
                                {/* <input onChange={onchange} ref={pobRef} value={state.pob} name={props.POB}  placeholder="Enter place of birth*"/>    */}
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faTransgender}  color="blue"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        as="select"
                                        required
                                        onBlur={onblur} 
                                        ref={genderRef}
                                        value={state.gender}
                                        onChange={onchange}
                                        name={props.Gender}
                                    >
                                        <option defaultValue hidden  > Gender* </option>
                                        <option>M</option>
                                        <option>F</option>
                                    </FormControl>
                                </InputGroup>
                                
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faVoicemail} size="xs" color="blue"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        onBlur={onblur} 
                                        ref={StudentEmailHeadRef}
                                        value={state.StudentEmailHead}
                                        onChange={onchange}
                                        placeholder="GBHS"
                                        aria-label= "Student Email*"
                                        name={props.StudentEmail}
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text style={{color:"blue"}}>@</InputGroup.Text>
                                    </InputGroup.Append>
                                    <FormControl
                                        onBlur={onblur} 
                                        ref={StudentEmailTailRef}
                                        value={state.StudentEmailTail}
                                        onChange={onchange}
                                        placeholder="gmail.com*"
                                        aria-label= "gmail.com"
                                        name={props.StudentEmail}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3 " >
                                    
                                    {/* <Container> */}
                                        {/* <Row>
                                            <Col > */}
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>
                                                        <FontAwesomeIcon icon={faPhoneAlt} color="blue"/>
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>
                                            {/* </Col>
                                            <Col> */}
                                                <FormControl
                                                    
                                                    onBlur={onblur} 
                                                    ref={contact1Ref}
                                                    value={state.contact1}
                                                    onChange={onchange}
                                                    placeholder="+237"
                                                    name={props.contact1}
                                                    aria-label= "+237*"
                                                />
                                            {/* </Col>
                                            <Col> */}
                                                <InputGroup.Append>
                                                    <InputGroup.Text style={{color:"blue"}}>-</InputGroup.Text>
                                                </InputGroup.Append>
                                            {/* </Col>
                                            <Col> */}
                                                <FormControl
                                                    onBlur={onblur} 
                                                    ref={contact2Ref}
                                                    value={state.contact2}
                                                    onChange={onchange}
                                                    placeholder="Phone Number"
                                                    name={props.contact2}
                                                    aria-label= "Phone Number"
                                                />
                                            {/* </Col>
                                            <Col> */}
                                            <InputGroup.Append>
                                                <InputGroup.Text style={{color:"blue"}}>-</InputGroup.Text>
                                            </InputGroup.Append>
                                            
                                            {/* </Col>
                                            <Col> */}
                                                <FormControl
                                                
                                                        onBlur={onblur} 
                                                        ref={contact3Ref}
                                                        value={state.contact3}
                                                        onChange={onchange}
                                                        placeholder="Contact*"
                                                        name={props.contact3}
                                                        aria-label= "Contact*"
                                                />
                                            {/* </Col>
                                        </Row> */}
                                    {/* </Container> */}
                                </InputGroup>
                                {/* <input onChange={onchange} type="text" ref={contactRef} placeholder="Contact*" value={state.contact} name={props.POB} /> */}
                                <Dater InputGroup={InputGroup} FormControl={FormControl} FontAwesomeIcon={FontAwesomeIcon} faClock={faUserClock} faCalender={faCalendarDay}/>

                            </div> 
                            <div  >
                                <img className={styles.imgIcon} src={require(`/${backgroundimg}`)}   alt=""/>
                            </div>      
                        </div>


                        <div className={styles.studentGuidantContainer}>
                            <h2 className={styles.heading}>
                                    <InputGroup  >
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUser} color="blue"/>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl 
                                        readOnly
                                        style={{textAlign:"center",color:"white",backgroundColor:"blue"}}
                                        value="GUIDANT INFORMATION"/>
                                        
                                                
                                        <InputGroup.Append>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUser} color="blue"/>
                                            </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    
                                </h2>
                            <div className={styles.studentPersonalInformation}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon color="blue" icon={faImage}/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormFile
                                        ref={GImageFileRef}
                                        value={state.GimageFileName}
                                        label={state.GimageFileName}
                                        onChange={onchange}
                                        data-browse="Guidant Picture"
                                        name={props.name}
                                        custom={true}
                                        
                                    />
                                </InputGroup>
                                {/* <input value={state.GimageFileName} onChange={onchange} ref={GImageFileRef} name={props.name} type="file"/> */}
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUser} color="blue"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl 
                                        onBlur={onblur}
                                        onChange={onchange} 
                                        ref={GfamilyNameRef} 
                                        value={state.GfamilyName} 
                                        placeholder ="Enter family name*" 
                                        name={props.Firstname} 
                                        aria-label= "Enter Family name*"
                                        />
                                        <FormControl
                                        onBlur={onblur} 
                                        onChange={onchange}  
                                        ref={GgivenNameRef} 
                                        value={state.GgivenName} 
                                        placeholder ="Enter given name*" 
                                        name={props.Givenname}
                                    />
                                </InputGroup>
                                
                                {/* <input onChange={onchange} ref={GfamilyNameRef} value={state.GfamilyName} placeholder ="Enter family name*" name={props.Firstname}/> */}

                                {/* <input onChange={onchange}  ref={GgivenNameRef} value={state.GgivenName} placeholder ="Enter given name*" name={props.Givenname}/> */}
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faTasks} color="blue"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                        <FormControl 
                                        onChange={onchange}  
                                        ref={GoccupationRef} 
                                        value={state.Goccupation} 
                                        placeholder ="Enter occupation" 
                                        name={props.occupation}
                                    />
                                </InputGroup>
                                {/* <input onChange={onchange} ref={GoccupationRef} value={state.Goccupation} placeholder ="Enter occupation" name={props.occupation}/> */}
                                
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faCalendarAlt} color="blue"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                        <FormControl
                                        onChange={onchange} 
                                        ref={GDobRef} 
                                        value={state.GDob} 
                                        placeholder ="Enter date of birth" 
                                        onFocus={(e)=>{e.target.type="Date"}} 
                                        name={props.DOB}
                                    />
                                     <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faTransgender} color="blue"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                        <FormControl
                                        as="select"
                                        onChange={onchange} 
                                        required 
                                        ref={GgenderRef} 
                                        value={state.Ggender} 
                                        name={props.Gender}
                                    >
                                        <option defaultValue hidden>Gender</option>
                                        <option>M</option>
                                        <option>F</option>
                                    </FormControl>
                                </InputGroup>
                                {/* <input onChange={onchange} ref={GDobRef} value={state.GDob} placeholder ="Enter date of birth" type="text" onFocus={(e)=>{e.target.type="Date"}} name={props.DOB}/> */}
                                
                                {/* <select required onChange={onchange} ref={GgenderRef} value={state.Ggender} name={props.Gender}>
                                        <option defaultValue hidden>Gender</option>
                                        <option>M</option>
                                        <option>F</option>
                                </select> */}
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faVoicemail} size="xs" color="blue"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        onBlur={onblur} 
                                        ref={GuidantEmailHeadRef}
                                        value={state.GuidantEmailHead}
                                        onChange={onchange}
                                        placeholder="GBHS"
                                        aria-label= "Guidant Email*"
                                        name={props.GuidantEmail}
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text style={{color:"blue"}}>@</InputGroup.Text>
                                    </InputGroup.Append>
                                    <FormControl
                                        onBlur={onblur} 
                                        ref={GuidantEmailTailRef}
                                        value={state.GuidantEmailTail}
                                        onChange={onchange}
                                        placeholder="gmail.com*"
                                        aria-label= "gmail.com"
                                        name={props.GuidantEmail}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3 " >
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faPhoneAlt} color="blue"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        
                                        onBlur={onblur} 
                                        ref={Gcontact1Ref}
                                        value={state.Gcontact1}
                                        onChange={onchange}
                                        placeholder="+237"
                                        aria-label= "+237*"
                                        name={props.contact1}
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text style={{color:"blue"}}>-</InputGroup.Text>
                                    </InputGroup.Append>
                                    <FormControl
                                        onBlur={onblur} 
                                        ref={Gcontact2Ref}
                                        value={state.Gcontact2}
                                        onChange={onchange}
                                        placeholder="Phone Number"
                                        aria-label= "Phone Number"
                                        name={props.contact2}
                                    />
                                <InputGroup.Append>
                                    <InputGroup.Text style={{color:"blue"}}>-</InputGroup.Text>
                                </InputGroup.Append>
                                    <FormControl
                                        onBlur={onblur} 
                                        ref={Gcontact3Ref}
                                        value={state.Gcontact3}
                                        onChange={onchange}
                                        placeholder="Contact*"
                                        aria-label= "Contact*"
                                        name={props.contact3}
                                            />
                                </InputGroup>
                                {/* <input title="input you number" onChange={onchange} value={state.Gcontact} ref={GcontactRef} placeholder="Enter contact Number*"  type="tel" name={props.Contact}/> */}

                                {/* <input onChange={onchange} ref={GpobRef} value={state.Gpob} placeholder="Enter Place of birth" type="text" name={props.POB}/> */}
                                
                            </div>
                            <div className={styles.studentimage}>
                                
                                {/* {console.log(props.img)} */}
                                {/* <div id={styles.studentimage} style={{backgroundImage:`url(${t3})`}}></div>
                                */}
                                <img className={styles.imgIcon}  src={require(`./${image}`)}  alt="NOT FOUND"/>
                                
                                
                            </div>

                        </div>
                        <div className={styles.screenfill}>
                            <InputGroup className="mb-3 mt-3">
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon color="blue" icon={faLock}/>
                                    </InputGroup.Text>
                                </InputGroup.Append>
                                    <FormControl
                                        onChange={onchange} 
                                        ref={passwordRef} 
                                        type="password" 
                                        value={state.password} 
                                        placeholder="Password"
                                        pattern="[\x00-\x7f]{6,}"
                                            />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon color="blue" icon={faLockOpen}/>
                                    </InputGroup.Text>
                                </InputGroup.Append>
                                    <FormControl
                                        onChange={onchange} 
                                        ref={confirmPasswordRef} 
                                        value={state.password} 
                                        type="text"
                                        pattern="[\x00-\x7f]{6,}"
                                            />
                            </InputGroup>
                        </div> 
                        {/* <div className={styles.submitContainer}>
                            <button  className={styles.submitButton} type="submit">Submit</button>
                        </div> */}

                    
                    </div>
                </form>
                <div className={styles.divContainer} style={{display:state.display}}>
                
                    <Userprovider value={state.Dob}>
                        <Validation ref={createComponentRef} clientId={state.clientId} familyName={state.familyName} givenName={state.givenName} 
                            gender={state.gender} Dob={state.Dob} pob={state.pob} className={styles.thirdDIV} 
                            studentEmail={state.StudentEmailHead+"@"+ state.StudentEmailTail} 
                            contact={state.contact1 + state.contact2 + state.contact3} 

                            GfamilyName={state.GfamilyName} GgivenName={state.GgivenName} Goccupation={state.Goccupation}
                            GimageFileName={state.GimageFileName} Ggender={state.Ggender} Gcontact={state.Gcontact1 + state.Gcontact2+state.Gcontact3}
                            GuidantEmail={state.GuidantEmailHead +"@"+state.GuidantEmailTail}
                            /*Gpob={state.Gpob} */ GDob={state.GDob} imageFileName={state.imageFileName}  onwait={onwait} 
                            saveDisplay={state.saveDisplay} cancelDisplay={state.cancelDisplay} waitDisplay={state.waitDisplay} 
                            countDown={state.countdown} oncancel={oncancel} onsave = {onsave}/>
                    </Userprovider>
                </div>
                    
            </div>

            
        )
}
export default React.memo(StudentName)