import React,{useState,useEffect,useRef} from "react"
import styles from "./navigation.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi } from '@fortawesome/free-solid-svg-icons'

let logo = require("./image/logo.jpeg")
let batteryLevel
let batteryCharging
let newAlert =true
let battery = ()=>{
    try{
        navigator.getBattery()
    .then((data)=>{
        return data
    }).then((battery)=>{
        batteryLevel = battery.level*100
        batteryCharging=battery.charging
        
    }).catch((err)=>{
        console.log(err)
    })
    }
    catch(err){
        console.log(err)
    }
    
    
}
console.log(battery())
let rotationImage=()=>{

}
let batteryAlert = async (percentage)=>{
    if(newAlert){
        if(batteryLevel === percentage){
            alert("battery is low Connect to charger")
            newAlert = false
        }
        
    }
}

let Navigation = (props)=>{

        let [state,setState] = useState({
            wifi:navigator.onLine?"online":"",
            wifiColor:navigator.onLine ?  "green": "white",
            battery:battery(),
            })

        let wifiRef = useRef()

        batteryAlert(10)
        
        
        

        useEffect(()=>{
            
            let timer = setInterval(()=>{
                    fetch("/online")
                    .then((res)=>{
                        return res.json()
                    })
                    .then((data)=>{
                        setState({
                            wifi:"online",
                            wifiColor:"green",
                            battery: battery() ,
                        })
                    })
                    .catch((err)=>{
                        setState({
                            wifi:"offline",
                            wifiColor: "white",
                            battery:battery() ,
                        })
                        // console.log("err::",err)
                    })
                
                
            },100)
            
        },[])
        return(
            <nav  className={styles.navigationContainer} >
              
                <div className={styles.imagediv}>
                <div ref={wifiRef} style={{color:state.wifiColor}} className={styles.right}><FontAwesomeIcon  icon={faWifi}/>{state.wifi}</div>
                    <div onClick={rotationImage} className={styles.navimage}>
                        <img className={styles.navImg}  src={logo} alt="not here"/>   
                    </div>  
                    <span ><span className={styles.red}>Government Bilingual</span><br/><span className={styles.white} >High School Dzeng</span> </span>
                    {/* <progress  value={batteryLevel} max="100" className={styles.progressBar}></progress> */}
    
                </div>
          
            </nav>
        )
}
export default Navigation

