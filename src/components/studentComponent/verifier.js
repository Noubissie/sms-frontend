import React, {useState,useEffect} from "react"
import styles from "./verifiernav.module.css"
import {useQuery} from "react-apollo"
import gql from "graphql-tag"


let verificationQuery = gql`
    query($clientID:ID!){
        verifierQuery(clientID:$clientID){
                clientID,
                client{
                    studentId,
                    givenName,
                    familyName,
                }
            }     
    }
`

let initialState ={
    backcolor:"",
    height: "",
    students: [],
    
} 
let VerifierNav = (props)=>{

    
    // console.log("clientID::",props.clientId)
    let {loading,error,data,networkStatus}=useQuery(
        verificationQuery,
        {
            variables:{
                clientID:props.clientId
            }
            
        })
    let [state,setState]=useState(initialState)
    
   
    
    

    
useEffect(()=>
    {
        if(!loading){
            setState((previouState)=>({
                students:data.verifierQuery[0].client,
            }))
            console.log("data::",data)
            console.log("data::",data.verifierQuery[0].client)
            console.log("loading::",loading)
        }
        
        },[loading])

        if(loading){
            return <p>Loading</p>
        }
    

    // })
    // console.log("state.students::",state.students)
    if(state.students.length !== 0){
        let clientIdNumber = state.students.filter((x)=>{
            return Number(x.studentId) === Number(props.clientId)
        })
        
        if(Boolean(clientIdNumber[0])){
        
            return (
            <div  className={styles.searchDivContainer} key={clientIdNumber[0].id} style={{position:"sticky",top:"0px",height:"fit-content"}}>
                <div style={{backgroundColor:state.backcolor,borderRadius:"15px"}}>
                        {/* <img className={styles.searchimg} width="100px" height="100px" src={require(`/${clientIdNumber[0].img}`)} alt="none Found"/> */}
                        <div style={{backgroundColor:"red"}}>
                            <div >{clientIdNumber[0].familyName}</div>
                            
                            <div>{clientIdNumber[0].givenName}</div>
                        </div>
                        
                </div>
                        
            </div>)
        }
        if(!Boolean(clientIdNumber[0])){
            return (
            
            <div className={styles.verifiernav} style={{position:"sticky",top:"0px"}}>
                <div className={styles.verifierHeading}>
                   VERIFICATION
                </div>
                    {state.students.map((value,index)=>{
                        if(Boolean(value.givenName.toUpperCase().includes(props.givenName.toUpperCase())) && 
                            Boolean(value.familyName.toUpperCase().includes(props.familyName.toUpperCase())))
                            {
                        return( 
                            
                                <div className={styles.searchDivContainer} key={value.studentId} style={{position:"sticky",top:"0px"} } >
                                    {/* <img className={styles.searchimg} width="100px" height="100px" src={require(`/${value.img}`)} alt="none Found"/> */}
                                    <div style={{backgroundColor:"skyblue"}}>
                                        <div >{value.familyName}</div>
                                        <div>{value.givenName}</div>
                                        <div>{window.innerHeight}</div>
                                        <div>{window.innerWidth}</div>
                                    </div>
                                    
                                </div>
                            ) 
                        }
                        else{
                            return undefined
                        }
                    })}  
             </div>
        )
    }
}
else{
    return (
        <p>loading</p>
    )
}
}


export default React.memo(VerifierNav)