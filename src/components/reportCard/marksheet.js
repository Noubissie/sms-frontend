import React, {useState,useRef,useEffect} from "react"
import gql from "graphql-tag"
import { useQuery} from 'react-apollo'
import styles from "./marksheet.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Form from "react-bootstrap/Form"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers,faCircle, faUser, faMarker} from '@fortawesome/free-solid-svg-icons'

// let subjecta = ["Chemistry","Citizenship Education","Computer Studies","English Language","French",
// ,"Geography","Manual Labour","Mathematics","Physical Education"]

// let subjecta = ["Chemistry","Citizenship Education","Computer Studies",
// "Economics","English Language","French","Geography",
// "Manual Labour","Mathematics","Physical Education","Physics"]
let getstudent = gql`
query($student_class:String!,$sequence:String!){
    studentAndClass(student_class:$student_class){
        student_name,
        studentSubjectAndMark(sequence:$sequence){
          subject,
          staff_name,
          mark,
          coefficient
        } 
      },
      classAndSubjectTaught(classs:$student_class){
        subject_thought
      }
} 
`
let initialState = {
    studentClass:'',
    evaluation:'',
    Result:[],
    Subjects:[{
        classs:"",
        subject_thought:[]
    }],
}

let MarkSheet = (props)=>{
    let [MarkSheetState,setStateMark] = useState(initialState)
    let studentClassRef = useRef()
    let evaluationRef = useRef()
    
    let {loading,error,data} = useQuery(getstudent,{
        variables:{
            student_class:MarkSheetState.studentClass,
            sequence:MarkSheetState.evaluation}
    })
   let onchange = ()=>{
        setStateMark((previouState)=>({
            ...previouState,
            studentClass:studentClassRef.current.value,
            evaluation:evaluationRef.current.value
        }))
   }
    // console.log("loading::",loading)
    // console.log("error:",error)
   useEffect(()=>{
    //    console.log("data::",data.classAndSubjectTaught)
        setStateMark((previouState)=>({
            ...previouState,
            Result: data ? data.studentAndClass : [],
            Subjects:data ? data.classAndSubjectTaught :[{
                classs:"",
                subject_thought:[]
            }]
        }))
   },[data])
    
//    if(loading)return (<div>Loading....</div>)
   if(error)return(<div>{error}</div>)
    // console.log("data",data.teacher)
    console.log("MarkSheetState.Subjects1111::",MarkSheetState.Subjects)
    return(

        <div style={{paddingTop:"4%"}} className={styles.printed}>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        <FontAwesomeIcon color="blue" icon={faUsers}/>
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                    as="select"
                    ref={studentClassRef}
                    onChange={onchange}
                    >
                        <option defaultChecked hidden>Class</option>
                        <option>Form 1</option>
                        <option>Form 2</option>
                        <option>Form 3</option>
                        <option>Form 4 Arts</option>
                        <option>Form 4 Science</option>
                        <option>Form 5 Science</option>
                        <option>Form 5 Arts</option>
                        <option>CINQUIEME</option>
                        <option>SIXIEME</option>
                        <option>QUATRIEME ESPAGNOL</option>
                        <option>QUATRIEME ALLEMAND</option>
                        <option>TROISIEME ESPAGNOL</option>
                        <option>TROISIEME ALLEMAND</option>
                        <option>SECONDE ESPAGNOL</option>
                        <option>SECONDE C</option>
                        <option>SECONDE ALLEMAND</option>
                        <option>PREMIERE ESPAGNOL</option>
                        <option>PREMIERE D</option>
                        <option>PREMIERE ALLEMAND</option>
                        <option>TERMINALE ESPAGNOL</option>
                        <option>TERMINALE D</option>
                        <option>TERMINALE ALLEMAND</option>
                        
                </FormControl>
                <InputGroup.Append>
                    <InputGroup.Text>
                        <FontAwesomeIcon color="blue" icon={faCircle}/>
                    </InputGroup.Text>
                </InputGroup.Append>
                <FormControl 
                    as="select"
                    ref={evaluationRef}
                    onChange={onchange}
                    >
                        <option defaultChecked hidden>Evaluation</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>First term|Premiere tremestre</option>
                        <option>Second Term|Deuxieme tremestre</option>
                        <option>Third term|Troisieme tremestre</option>
                    </FormControl>

            </InputGroup>
            <div>
            <InputGroup >
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        <FontAwesomeIcon color="blue" icon={faUser}/>
                        *s
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl readOnly
                    
                    as="textarea"
                    style={{overflowWrap: "break-word", overflow: "hidden", width:"150px",fontSize:"80%"}}
                    value="student Name"
                />
                {
                    
                    MarkSheetState.Subjects.map((curValue,index)=>{
                        console.log("cureerntValue:::",curValue)
                        return curValue.subject_thought.map(x=>{
                            if( x != "SCIENCES DE LA VIE ET DE LA TERRE"){
                                return (<React.Fragment key={x}>
                                <FormControl readOnly
                                    style={{fontSize:"80%"}}
                                        as="textarea"
                                        value={x}
                                    />
                            </React.Fragment>
                            ) 
                            }
                        })
                            
                                   
                                }
                            
                            )[0] 
                    // subjecta.map((x)=>{
                    //     return <React.Fragment key={x}>
                    //                      <FormControl readOnly
                    //                         style={{fontSize:"80%"}}
                    //                             as="textarea"
                    //                             value={x}
                    //                         />
                    //                 </React.Fragment>}
                    //                 )
                    }

                        
                    
                     {/* <FormControl readOnly
                        style={{fontSize:"80%"}}
                        as="textarea"
                        value="Total"
                    />
                    <FormControl readOnly
                        style={{fontSize:"80%"}}
                        as="textarea"
                        value="Avg"
                    /> */}
                
                
                </InputGroup>
                {MarkSheetState.Result.map((currentValue,index)=>{
                       let total =0
                       let Avg = [0]
                       let coefficient = 0
                    
                    return (
                    
                        <InputGroup key={currentValue.student_name + currentValue.subject}>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon color="blue" icon={faUser}/>
                                    *{index+1}
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl readOnly
                                
                                as="textarea"
                                style={{overflowWrap: "break-word", overflow: "hidden", width:"150px",fontSize:"80%"}}
                                value={currentValue.student_name}
                            />
                            {/* <Form.Row className="mb-4 ov-bw" style={{overflowWrap: "break-word", overflow: "hidden",width:"15%"}}>
                                {currentValue.student_name}
                            </Form.Row> */}
                            {currentValue.studentSubjectAndMark.map((currentStudent)=>{
                                // total = total + currentStudent.mark * currentStudent.coefficient
                                total = total + currentStudent.mark * currentStudent.coefficient
                                coefficient = coefficient + currentStudent.coefficient
                                Avg = [total/coefficient]
                                if(currentStudent.mark >= 10){
                                    return (
                                        <>
                                            <FormControl readOnly
                                                as="textarea"
                                                style={{color:"blue",fontSize:"80%"}}
                                                // value={currentStudent.mark * currentStudent.coefficient}
                                                value={currentStudent.mark}
                                            />
                                        </>
                                        
                                    )
                                
                                }
                                else{
                                    return (
                                        <>
                                            <FormControl readOnly
                                                as="textarea"
                                                style={{color:"red",fontSize:"80%"}}
                                                // value={currentStudent.mark * currentStudent.coefficient}
                                                value={currentStudent.mark}
                                            />
                                        </>
                                        
                                    )
                                }
                                
                            })
                                
                            }
                          {/* {Avg.map((value)=>{
                              if(Number(value)<10){
                               return <>
                                        <FormControl readOnly
                                        as="textarea"
                                        
                                        style={{color:"red",fontSize:"80%"}}
                                        value={total}
                                    /> 
                                    <FormControl readOnly
                                        as="textarea"
                                        style={{color:"red",fontSize:"80%"}}
                                        value={(value).toFixed(2)}
                                    />
                                </>
                              }
                              else{
                                return <>
                                            <FormControl readOnly
                                            style={{color:"blue",fontSize:"80%"}}
                                            as="textarea"
                                            value={total}
                                        /> 
                                        <FormControl readOnly
                                            as="textarea"
                                            style={{color:"blue",fontSize:"80%"}}
                                            value={(value).toFixed(2)}
                                        />
                                    </>
                       
                              }
                          })}   */}
                             

                        </InputGroup>
                          
                    )
                })}
                
            </div>
        </div>
            
    )
}
// export default graphql(getstudent)( React.memo(MarkSheet)) 
export default React.memo(MarkSheet)