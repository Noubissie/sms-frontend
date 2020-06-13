import React, {useEffect} from "react"
import {useQuery,useMutation} from "react-apollo"
import gql from 'graphql-tag';

let studentInformation = gql`
mutation(
        $studentId: ID,
        $familyName: String,
        $givenName: String,
        $studentGender: String,
        $studentContact: String,
        $GuidantFamilyName: String,
        $GuidantGivenName: String,
        $GuidantOccupation: String,
        $guidantDateOfBirth: String,
        $guidantGender:String,
        $guidantContactNumber: String,
        $studentPassword: ID
){
    studentRegistration(
    studentId:$studentId,
    familyName:$familyName,
    givenName:$givenName,
    studentGender:$studentGender,
    studentContact:$studentContact,
    GuidantFamilyName:$GuidantFamilyName,
    GuidantGivenName:$GuidantGivenName,
    GuidantOccupation:$GuidantOccupation,
    guidantDateOfBirth:$guidantDateOfBirth,
    guidantGender:$guidantGender,
    guidantContactNumber:$guidantContactNumber,
    studentPassword:$studentPassword

  ){
    studentId,
    familyName,
    givenName,
    studentGender,
    studentContact,
    GuidantFamilyName,
    GuidantGivenName,
    GuidantOccupation, 
    guidantDateOfBirth,
    guidantGender,
    guidantContactNumber,
    studentPassword,
  }
}
`
let onclick = ()=>{
    
}

let Apollo = (props)=>{
    let [domutation,{data,loading,error,called, client}] = useMutation(studentInformation)
    useEffect(()=>{
        // console.log(document.cookie)
    })
   
   return (
       <button onClick={()=>{
        domutation(
            {
                variables:{  
                    studentId: 1,
                    familyName: "Noubissie",
                    givenName: "landry",
                    studentGender: "Male",
                    studentContact: "678201252",
                    GuidantFamilyName: "Noubissie",
                    GuidantGivenName: "John",
                    GuidantOccupation: "Teacher",
                    guidantDateOfBirth: "24-10-2005",
                    guidantGender: "Male",
                    guidantContactNumber: "677911606",
                    studentPassword: 1234565
            },
            // ignoreResults:true,
            update: (cache, data) => {
                console.log("cache in memory::",cache.config.dataIdFromObject)
              },
            onCompleted:(data)=>{
                console.log("print on Completed mutation::",data)
            },
            
        }
        ).then((result)=>{
            console.log("results::",result.data)
        })
        
        
        console.log("loading::", loading)
        console.log("error::", error)
        console.log("called::", called)
        console.log("client::", client)
        console.log("data::", data)
        
       }}>{document.cookie} ::aaaa</button>
   )
}
export default Apollo