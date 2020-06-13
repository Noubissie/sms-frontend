import React, { useRef,useEffect } from 'react';
import './App.css';
import {ApolloProvider} from "react-apollo"
import StudentName from "./components/studentComponent/studentRegistration"
import Apollo from "./components/h"
// import createClient from "./apolloClient/apolloClientHeader"
import createClient from "./apolloClient/apolloClientHeaderNew"

import Navigation from "./components/navigationComponent/navigation"
import Toggle from "./components/toggleComponent/toggle"
import SchoolApp from "./components/schoolComponent/schoolApp"
import Department from "./components/schoolComponent/departmentInput"
import ClassRegistration from "./components/schoolComponent/classInput"
import Marksheet from "./components/reportCard/marksheet"
const client = createClient(document.cookie)



let App =()=>{
   let schoolRef = useRef()

   let change = ()=>{
     let a = schoolRef.current.change()
     console.log(a)
   }
   useEffect(() => {
     
     return () => {
       console.log("cleanup")
     }
   }, [])

  return (
    <ApolloProvider client={client}>
        <div className="orientation">
          {/* <Apollo/>  */}
            <Navigation />
            {/* <div className="App cover"> */}
              {/* <div>
              <Toggle/>
              </div>
              <div className="schoolInformation">
                <SchoolApp />
                <SchoolApp />
                <SchoolApp />
              </div> */}
              {/* <div> */}
                {/* <StudentName /> */}
                <Marksheet />
              {/* </div>
            </div>
        </div> */}
        {/* <div>
          <Navigation />
            <div className="App cover">
              <div>
              <Toggle/>
              </div>
              <div className="schoolInformation">
                <Department />
                <SchoolApp ref={schoolRef} />
                <ClassRegistration />
              </div> */}
              {/* <div> */}
                {/* <StudentName /> */}
                {/* <Marksheet /> */}
              {/* </div> */}
            {/* {/* </div> */}
        </div>
        {/* <button onClick={change} >
      submit schoolApp
    </button> */}
    </ApolloProvider>
    
  )
}

export default App
