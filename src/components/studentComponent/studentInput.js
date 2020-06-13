import React , {Component} from "react"
import styles from "./studentInput.module.css"
import VerifierNav from "./verifiernav"
// import ScreenFill from "./screenfill"
import Dater from "./date"
import Validation from "./validation"
import {Userprovider} from "./Context"
// let backgroundimg = "image/t3.jpg"
let image = "image/t3.jpg"
let backgroundimg = "image/PHOTO.jpg" 
// let bimg = require(`/${backgroundimg}`)


let initialState = {
    testImage:"",
    height:"",
    familyName : "",
    givenName : "",
    imageFileName:"",
    gender:"",
    contact:"",
    pob:"",
    Dob:"",
    clientId:"",
    GfamilyName : "",
    GgivenName : "",
    Goccupation:"",
    GimageFileName:"",
    Ggender:"",
    Gcontact:"",
    Gpob:"",
    GDob:"",
    date: `${new Date().getFullYear()}-12-31`,
    password:"",
    confirmPassword:"",
    display:"none",
    countdown:3,
    saveDisplay:"none",
    cancelDisplay:"none",
    waitDisplay:"inline",
}
class StudentName extends Component{
    
    constructor(props){
        super(props)
        this.state = initialState
        // this.initialState = this.state

        this.familyNameRef = React.createRef()
        this.givenNameRef = React.createRef()
        this.imageRef = React.createRef()
        this.genderRef = React.createRef()
        this.pobRef = React.createRef()
        this.DobRef = React.createRef()
        this.clientIdRef = React.createRef()
        this.contactRef = React.createRef()

        this.GfamilyNameRef = React.createRef()
        this.GgivenNameRef = React.createRef()
        this.GoccupationRef = React.createRef()
        this.GgenderRef = React.createRef()
        this.GpobRef = React.createRef()
        this.GDobRef = React.createRef()
        this.GcontactRef = React.createRef()
        this.GImageFileRef = React.createRef() 

        this.passwordRef = React.createRef()
        this.confirmPasswordRef = React.createRef()

        this.createComponentRef = React.createRef()
    }
    macFullStopControl=(reference)=>{
            let newstate = reference.current.value.trim().split(" ")
            .map((x)=>{
                return x.trim().replace(/\.$/gi,"")
            })
            .join(" ") 
            return newstate 
    }
    onblur = ()=>{
        if(Boolean(navigator.platform.match(/MAC/gi))){
            this.setState(
                {   
                    familyName: this.macFullStopControl(this.familyNameRef),
                    givenName: this.macFullStopControl(this.givenNameRef)
                }
            )
        }
        else{
        this.setState(
            {
                familyName: this.familyNameRef.current.value.trim().endsWith(".")
                ? this.familyNameRef.current.value.trim().replace(/\.$/gi,""):this.familyNameRef.current.value.trim(),
                givenName: this.givenNameRef.current.value.trim().endsWith(".")
                ? this.givenNameRef.current.value.trim().replace(/\.$/gi,""):this.givenNameRef.current.value.trim()
                
            }
        )
        }
    }
 
    
    onchange= () =>{
        this.setState({
            familyName : this.familyNameRef.current.value,
            givenName : this.givenNameRef.current.value,
            imageFileName:this.imageRef.current.value,
            contact:this.contactRef.current.value,
            gender:this.genderRef.current.value,
            pob:this.pobRef.current.value,
            Dob:this.DobRef.current.value,
            clientId:this.clientIdRef.current.value,

            GfamilyName : this.GfamilyNameRef.current.value,
            GgivenName : this.GgivenNameRef.current.value,
            Goccupation:this.GoccupationRef.current.value,
            GimageFileName:this.GImageFileRef.current.value,
            Ggender:this.GgenderRef.current.value,
            Gcontact:this.GcontactRef.current.value,
            Gpob:this.GpobRef.current.value,
            GDob:this.GDobRef.current.value,

            password:this.passwordRef.current.value,
            confirmPassword:this.confirmPasswordRef.current.value,
    }
        )}

    countDown
    timeout
    
    onwait = (e)=>{
            e.target.style.backgroundColor = "none"
            e.target.style.animation = "none"
            clearTimeout(this.timeout)
            clearInterval(this.countDown)
            this.setState({
                countdown:3,
                waitDisplay:"none",
                saveDisplay:"inline",   //Display verification save button
                cancelDisplay:"inline"  //Display verifiacation cancel button
            })
            
            e.preventDefault()
        }
    
    oncancel = (e)=>{
        this.setState({
            countdown:3,
            display:"none",
            saveDisplay:"none",
            cancelDisplay:"none",
            waitDisplay:"inline",
        })
        e.preventDefault()
    }
    onsave = (e)=>{
       
            console.log("..............saving to database")

            this.setState(initialState)

            e.preventDefault()
        
    }
    
    onsubmit = (e)=>{
        
        this.createComponentRef.current.focusButton()
        if(this.state.display === "none"){
            this.setState({
            display:"inline",
            
        })
        this.countDown = setInterval(()=>{
            this.setState({
                countdown: this.state.countdown-1,
            })
        }       
        ,1000)
        
        this.timeout =  setTimeout(()=>{
            clearInterval(this.countDown) 
            this.setState({
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

    componentDidMount=()=>{
        this.clientIdRef.current.focus()
        // document.body.style.backgroundImage = `url(${bimg})`
        // document.body.style.color = "Green"
         
    }
     
    
    render(){
        
        return (
            
            
            <div className={styles.studentInformationContainer} style={{display:this.props.display}}>
                
                <VerifierNav familyName={this.state.familyName} givenName={this.state.givenName} clientId={this.state.clientId}/>
                    {/* {styles.body.backgroundImage = require("./t3.jpg")} */}

                <form onSubmit={this.onsubmit}>
                    <div className={styles.div1}> 
                        <div className={styles.studentNameContainer}>
                                <h2 className={styles.heading}>STUDENT PERSONAL INFORMATION
                                </h2>
                            <div className={styles.studentPersonalInformation}>
                                <input onChange={this.onchange} ref={this.imageRef} name={this.props.name} type="file"/>

                                
                                <input type="number" value={this.state.clientId} ref={this.clientIdRef} title="remove e" onChange={this.onchange} placeholder="Enter student ID*" name={this.props.clientId} pattern="[^e]"/>

                                
                                <input onBlur={this.onblur} value={this.state.familyName} ref={this.familyNameRef} onChange={this.onchange} placeholder="Enter First name*" name={this.props.Firstname}/>
                                                
                                
                                <input onBlur={this.onblur} ref={this.givenNameRef} value={this.state.givenName} onChange={this.onchange} placeholder="Enter Given name*" name={this.props.Givenname}/>

                                
                                    
                                <input  ref={this.DobRef} placeholder="Date of birth*" type="text" onFocus={(e)=>{e.target.type="Date"}} name={this.props.DOB} onChange={this.onchange} max={this.state.date}/>
                                    
                                <input onChange={this.onchange} ref={this.pobRef} value={this.state.pob} name={this.props.POB}  placeholder="Enter place of birth*"/>   
                                
                                <select required ref={this.genderRef} value={this.state.gender} className={styles.gender} name={this.props.Gender} onChange={this.onchange}>
                                        <option defaultValue hidden style={{color:"grey"}}  > Gender* </option>
                                        <option>M</option>
                                        <option>F</option>
                                </select>
                                <input onChange={this.onchange} type="text" ref={this.contactRef} placeholder="Contact*" value={this.state.contact} name={this.props.POB} />
                                <Dater/>

                            </div> 
                            <div  >
                                <img className={styles.imgIcon} src={require(`/${backgroundimg}`)}   alt=""/>
                            </div>      
                        </div>


                        <div className={styles.studentGuidantContainer}>
                            <h2 className={styles.heading}>
                                    GUIDANT INFORMATION
                            </h2>
                            <div className={styles.studentPersonalInformation}>
                                <input value={this.state.GimageFileName} onChange={this.onchange} ref={this.GImageFileRef} name={this.props.name} type="file"/>
                                <input onChange={this.onchange} ref={this.GfamilyNameRef} value={this.state.GfamilyName} placeholder ="Enter family name*" name={this.props.Firstname}/>

                                <input onChange={this.onchange}  ref={this.GgivenNameRef} value={this.state.GgivenName} placeholder ="Enter given name*" name={this.props.Givenname}/>

                                <input onChange={this.onchange} ref={this.GoccupationRef} value={this.state.Goccupation} placeholder ="Enter occupation" name={this.props.occupation}/>
                                    
                                <input onChange={this.onchange} ref={this.GDobRef} value={this.state.GDob} placeholder ="Enter date of birth" type="text" onFocus={(e)=>{e.target.type="Date"}} name={this.props.DOB}/>
                                
                                <select required onChange={this.onchange} ref={this.GgenderRef} value={this.state.Ggender} name={this.props.Gender}>
                                        <option defaultValue hidden>Gender</option>
                                        <option>M</option>
                                        <option>F</option>
                                </select>

                                <input title="input you number" onChange={this.onchange} value={this.state.Gcontact} ref={this.GcontactRef} placeholder="Enter contact Number*"  type="tel" name={this.props.Contact}/>

                                <input onChange={this.onchange} ref={this.GpobRef} value={this.state.Gpob} placeholder="Enter Place of birth" type="text" name={this.props.POB}/>
                                
                            </div>
                            <div className={styles.studentimage}>
                                
                                {/* {console.log(this.props.img)} */}
                                {/* <div id={styles.studentimage} style={{backgroundImage:`url(${t3})`}}></div>
                                */}
                                <img className={styles.imgIcon}  src={require(`./${image}`)}  alt="NOT FOUND"/>
                                
                                
                            </div>

                        </div>
                        <div className={styles.screenfill}>
                            <label htmlFor="student_password">
                                Password
                            </label>
                            <input onChange={this.onchange} ref={this.passwordRef} type="password" value={this.state.password} pattern="[\x00-\x7f]{6,}" />
                            <label  htmlFor="Confirm_student_password">
                                Confirm Password
                            </label>
                            <input onChange={this.onchange} ref={this.confirmPasswordRef} value={this.state.password} type="text" />
                            
                        </div> 
                        <div className={styles.submitContainer}>
                            <button  className={styles.submitButton} type="submit">Submit</button>
                        </div>

                    
                    </div>
                </form>
                <div className={styles.divContainer} style={{display:this.state.display}}>
                
                    <Userprovider value={this.state.Dob}>
                        <Validation ref={this.createComponentRef} clientId={this.state.clientId} familyName={this.state.familyName} givenName={this.state.givenName} 
                            gender={this.state.gender} Dob={this.state.Dob} pob={this.state.pob} className={styles.thirdDIV} contact={this.state.contact}
                            GfamilyName={this.state.GfamilyName} GgivenName={this.state.GgivenName} Goccupation={this.state.Goccupation}
                            GimageFileName={this.state.GimageFileName} Ggender={this.state.Ggender} Gcontact={this.state.Gcontact}
                            Gpob={this.state.Gpob} GDob={this.state.GDob} imageFileName={this.state.imageFileName}  onwait={this.onwait} 
                            saveDisplay={this.state.saveDisplay} cancelDisplay={this.state.cancelDisplay} waitDisplay={this.state.waitDisplay} 
                            countDown={this.state.countdown} oncancel={this.oncancel} onsave = {this.onsave}/>
                    </Userprovider>
                </div>
                    
            </div>

            
        )
    }
}
export default React.memo(StudentName)