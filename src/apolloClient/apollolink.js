import {ApolloLink} from "apollo-link"
import Error from "./apolloLinkError"
import HTTPlink from "./apolloLinkHttp"

let link = ()=>{
    return(
        ApolloLink.from([
            Error,
            HTTPlink(document.cookie),
            
        ])
    )
}

export default link()
