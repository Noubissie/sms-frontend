import React , {Component} from "react"
import styles from "./validation.module.css"
import Age from "./age"

let display = {
    color:"blue"
}
export default React.memo(
    class Validation extends Component{ 
    constructor(props){
        super(props)
        this.state = { 
                display: display,
                containerHeight:window.innerHeight
        }
        this.buttonWaitRef = React.createRef()
        
    }

    focusButton = ()=>{
        console.log("read this first")
        this.buttonWaitRef.current.focus()
    }
    
   componentDidMount=()=>{
        
       setInterval(()=>{
            this.setState({
                containerHeight:window.innerHeight
            })
       },10)
   }
 
    render(){
        return(
            <div className={styles.validationContainer}>
                <div className={styles.header}>
                    <div>
                        FORM VALIDATION
                    </div>
                </div>
                {/* <div style={{position:"fixed",overflowY:"scroll",margin:"0px",padding:"0px",height:"98%"}}> */}
                   
                        
                        <div className={styles.divLable}>student id:</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.clientId}</div>
                        <div className={styles.divLable}>Family Name:</div>
                            <div className={styles.divItem} style={this.state.display}>{this.props.familyName}</div>
                        <div className={styles.divLable}>Given Name     :</div>
                        <div  className={styles.divItem}style={this.state.display}>{this.props.givenName}</div>
                        <div className={styles.divLable}>Preffered Name     :</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.prefferedName}</div>
                        
                        <div className={styles.divLable}>Date of birth :</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.Dob}</div>
                        <div className={styles.divLable}>Place of birth :</div>
                        <div  className={styles.divItem} style={this.state.display}>{this.props.pob}</div>
                        <Age color={this.state.display}/>
                        <div className={styles.divLable}>Gender         :</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.gender}</div>
                        
                        <div className={styles.divLable}>Email         :</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.studentEmail}</div>

                        <div className={styles.divLable}>Contact         :</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.contact}</div>

                        {/* <Date/> */}


                        {/* <div>FORM VALIDATION</div> */}
                        <div className={styles.divLable} >Guidant Family Name:</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.GfamilyName}</div>
                        <div className={styles.divLable}>Guidant Given Name:</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.GgivenName}</div>
                        <div className={styles.divLable}>occupation     :</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.Goccupation}</div>
                        <div className={styles.divLable}>Date of birth :</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.GDob}</div>
                        <div className={styles.divLable}>Email :</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.GEmail}</div>
                        <div className={styles.divLable}>Gender         :</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.Ggender}</div>

                        <div className={styles.divLable}>Guidant Email :</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.GuidantEmail}</div>

                        <div className={styles.divLable}>Guidant contact :</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.Gcontact}</div>
                        {/* <div className={styles.divLable}>Place of birth :</div>
                        <div className={styles.divItem} style={this.state.display}>{this.props.Gpob}</div> */}
                        <div className={styles.divLable}>student image</div>
                        <div className={styles.divItem}>{this.props.imageFileName}</div>
                        <div className={styles.divLable}>Guidant image</div>
                        <div className={styles.divItem}>{this.props.GimageFileName}</div>
                <div className={styles.footer}>
                    
                        <button onClick={this.props.onsave} className={styles.buttons} style={{animation:"none",display:this.props.saveDisplay}}>save</button>
                    
                        <button onClick={this.props.onwait} className={styles.buttons} ref={this.buttonWaitRef} 
                        style={{animation:"none",display:this.props.waitDisplay}}>wait..| {this.props.countDown} </button>
                    
                        <button onClick={this.props.oncancel} className={styles.buttons} style={{animation:"none",display:this.props.cancelDisplay}}>cancel</button>
                    
                </div>
                        {/* <div >Age           :<h1 style={this.state.display}>{this.props.age}</h1></div> */}
                   
                {/* </div> */}
                
                
            </div>
        )
    }
} 
)