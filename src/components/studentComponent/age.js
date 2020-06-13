import React, {Component} from "react"
import {Userconsumer} from "./Context"


    
    export default React.memo(
        class Age extends Component{
    
    
        render(){ 
            return (
                <Userconsumer>
                    {(dobo)=>{
                        let dob = dobo.split(/\D/)
                        dob = new Date(...dob)
                        let diff_ms = Date.now() - dob.getTime()
                        let age_date = new Date(diff_ms)
                        let age =  age_date.getUTCFullYear() - 1970 >0?age_date.getUTCFullYear() - 1969:0
                        return (
                            <React.Fragment>
                                <div>Age:</div>
                                <div style={this.props.color}>{age}</div>
                            </React.Fragment>
                        )
                    }}
                </Userconsumer> 
            
            
        )}
            }
    )