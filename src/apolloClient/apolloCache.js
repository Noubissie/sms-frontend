import {InMemoryCache, defaultDataIdFromObject} from "apollo-cache-inmemory"

let cache = ()=>{
    return (
        new InMemoryCache({
            addTypename:true,
            dataIdFromObject:(object)=>{
                switch(object.__typename){
                    case "studentRegistration":
                        return object.id
                    case "TeacherRegistration":
                        return object.id
                    case "verificationQuery":
                        return object.clientID
                    default:
                        return defaultDataIdFromObject(object)
                }
            }
        })
    )
}

export default cache()