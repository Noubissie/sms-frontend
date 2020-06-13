import React, {useState,useRef} from "react"
import styles from "./toggle.module.css"


let initialState = { schoolColor:"rgb(255, 166, 0)"}

let Toggle =  (props)=>{

    // let reducer = (action,currentState)=>{
    //     switch(action){
    //         case "displayStudent":
    //             return 
    //     }
 
    // }
    
    let schoolRef = useRef()

    let [state, setState] = useState(initialState)

    let onclick = ()=>{
        console.log("school")
        setState({
            schoolColor:schoolRef.current.style.color = "green"
        })
    }
    // let [state,dispatch] = useReducer(reducer,initialstate)

    return (
        // <div className={styles.container}>
        //     {/* <details>
        //         <summary>heading</summary>
        //         <div>School Edit</div>

        //     </details> */}
            <nav className={styles.navbarApp}>
                <button ref={schoolRef} onClick={onclick} style={{color:state.schoolColor}} className={styles.navItem}>School <span className={styles.rightarrow}>&gt;</span></button>
               <div>
                    <button   className={styles.dropdown}>Input School Title</button>
                    <button   className={styles.dropdown}>Input Departments</button>
                    <button   className={styles.dropdown}>Input classes</button>
                    <button   className={styles.dropdown}>Input Subject</button>
                    <button   className={styles.dropdown}>Assign Subject to class</button>
                    <button className={styles.dropdown}>Delete class</button>
                    <button className={styles.dropdown}>Delete subject</button>
               </div>
                
                <button className={styles.navItem}>Teacher  <span className={styles.rightarrow}>&gt;</span></button>
                    <div>
                        <button onClick={()=>{props.dispatch("displayTeacherRegistration")}} className={styles.dropdown}>Register Teacher</button>
                        <button className={styles.dropdown}>Assign HOD</button>
                        <button className={styles.dropdown}>Assign Teacher&rarr;class</button>
                        <button className={styles.dropdown}>Delete Teacher</button>
                        <button className={styles.dropdown}>Modifier Teacher's classes</button>
                        <button className={styles.dropdown}>Find Teacher</button>
                    </div>
                <button className={styles.navItem}>Student  <span className={styles.rightarrow}>&gt;</span></button> 
                    <div>
                        <button onClick={()=>props.dispatch("displayStudentRegistration")} className={styles.dropdown}>Register Student</button>
                        <button className={styles.dropdown}>Delete student</button>
                        <button className={styles.dropdown}>Modifier Students Info</button>{/* set the particular student subject or All selected*/}
                        <button className={styles.dropdown}>Find Student</button>
                    </div> 
                <button className={styles.navItem}>Time Table  <span className={styles.rightarrow}>&gt;</span></button> 
                    <div>
                        <button className={styles.dropdown}>Draw Time Table</button>
                        <button className={styles.dropdown}>Modifier Time Table</button>
                        <button className={styles.dropdown}>Print Time Table</button>{/* set the particular student subject or All selected*/}
                        
                    </div> 
                <button className={styles.navItem}>Report Card  <span className={styles.rightarrow}>&gt;</span></button> 
                    <div>
                        <button className={styles.dropdown} onClick={()=>props.dispatch("displayMarkSheet")}>MarkSheet</button>
                        <button className={styles.dropdown}>student Result</button>
                        <button className={styles.dropdown}>Class result</button>{/* set the particular student subject or All selected*/}
                        
                    </div>
                <button className={styles.navItem}>Performance  <span className={styles.rightarrow}>&gt;</span></button> 
                    <div>
                        <button className={styles.dropdown}>Teacher's Work Coverage</button>
                        <button className={styles.dropdown}>Student Statistics</button>
                        <button className={styles.dropdown}>Class statistics</button>{/* set the particular student subject or All selected*/}
                        <button className={styles.dropdown}>School statistics</button>
                    </div> 
               
                <button className={styles.navItem}>Private   <span className={styles.rightarrow}>&gt;</span></button> 
                    <div>
                        <button className={styles.dropdown}>Effective presence</button>
                        <button className={styles.dropdown}>Assumption of duty</button>
                        <button className={styles.dropdown}>Attestation of profession</button>{/* set the particular student subject or All selected*/}
                        
                    </div>
            </nav>
        // </div>
    )
}

export default React.memo(Toggle)