import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

let links=(authToken)=>{
    return (
        new HttpLink({
            uri:"http://localhost:5000/g",
            credentials:"include", //"same-origin"
            headers:{
                
                Authorization: `Bearer ${authToken}`
            }
        })
    )
}

let createClient = (auth)=>{
    return (
        new ApolloClient({
            link:links(auth),
            cache: new InMemoryCache()
        })
    )
}

// import ApolloClient from "apollo-boost"

// let createClient =(
//     uri="localhost:5000/g",
//     // fetchOptions=null,
//     // request=null,
//     // onError=null,
//     // clientState=null
//     // cacheRedirects=null
//     credentials="include",
//     headers={
//         Authorization:`Bearer ${authToken}`
//     }

//     )=>{
//     return (
//         new ApolloClient(
//             {
//                 uri,
//                 fetchOptions
//             }
//         )
//     )
// }

export default createClient;

// import ApolloClient from "apollo-client"
// import link from "./apolloLinkHttp"

// import apolloLinkError from "./apolloLinkError"
// import cache from "./apolloCache"

// let client = new ApolloClient({
//     link,
//     cache,
//     name:"School Management System",
//     version:1.0,
//     ssrMode:false,
//     ssrForceFetchDelay	:0,
//     connectToDevTools:false,
//     queryDeduplication:true,


// })