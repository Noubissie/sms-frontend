import {onError} from "apollo-link-error"

let Error = onError(({operation, response, graphqlErrors, networkError})=>{
    console.log("operation that cause an error::",operation)
    console.log("server responces to the error::",response)
    if(graphqlErrors){
        // sendtoLoginService(graphqlErrors)
        console.log("client error")
    }
    if(networkError){
        // logout()
        console.log("server error or authorization error")
    }
})
export default Error