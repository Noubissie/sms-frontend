import ApolloClient from "apollo-client";
import link from "./apollolink"
import cache from "./apolloCache"

let createClient = ()=>{
    return (
        new ApolloClient({
            link,
            cache,
            name:"web-sms",
            version:1.00,

        })
    )
}
export default createClient