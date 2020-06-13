import React, {Component} from "react"
import styles from "./verifiernav.module.css"

class VerifierNav extends Component{
    constructor(props){
        super(props)
        
        this.state ={
            familyName1: this.props.familyName,
            givenName1 :this.props.givenName,
            clientId:this.props.clientId,
            backcolor:"",
            height: "",
            students: [],
            
        }  
    } 
componentDidMount=()=>
    {
        fetch("/api")
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            
            this.setState({
                students:data
            })
        
        }).catch(()=>{
            this.setState({
                students:[]
            })
        })

        // fetch("/api",{
        //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
        //     mode: 'cors', // no-cors, *cors, same-origin
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     //credentials: 'same-origin', // include, *same-origin, omit
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin':'http://127.0.0.1'
        //   // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // n
        // })
        // .then((result)=>{
        //     console.log(result.json())
        // })
        // .then((data)=>{
        //     console.log(data)
        // })
        // .catch((err)=>{
        //     console.log("Erro:",err)
        // })
        
        //    this.state.position ={top:"100px"}
    
        setInterval(()=>{
            if(this.state.backcolor===""){
                this.setState({
                    backcolor:"red",
                    
                })
            }
            else{
                this.setState({
                    backcolor:""
                })
            }
        },1000)
    }
    render(){
        let clientIdNumber =this.state.students.filter((x)=>{
            return x.id === Number(this.props.clientId)
        })
        
        if(Boolean(clientIdNumber[0])){
        
            return (
            <div onScroll={this.onresize}  className={styles.searchDivContainer} key={clientIdNumber[0].id} style={{position:"sticky",top:"0px",height:"fit-content"}}>
                <div style={{backgroundColor:this.state.backcolor,borderRadius:"15px"}}>
                        <img className={styles.searchimg} width="100px" height="100px" src={require(`/${clientIdNumber[0].img}`)} alt="none Found"/>
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
                    {this.state.students.map((value,index)=>{
                        if(Boolean(value.givenName.toUpperCase().includes(this.props.givenName.toUpperCase())) && 
                            Boolean(value.familyName.toUpperCase().includes(this.props.familyName.toUpperCase())))
                            {
                        return( 
                            
                                <div className={styles.searchDivContainer} key={value.studentid} style={{position:"sticky",top:"0px"} } >
                                    <img className={styles.searchimg} width="100px" height="100px" src={require(`/${value.img}`)} alt="none Found"/>
                                    <div style={{backgroundColor:"white"}}>
                                        <div >{value.familyName}</div>
                                        <div>{value.givenName}</div>
                                        <div>{window.innerHeight}</div>
                                        <div>{window.innerWidth}</div>
                                    </div>
                                    
                                </div>
                            ) 
                        }
                        else{
                            return ("")
                        }
                    })}
                
                     
             </div>
        )
    }
}
}

export default React.memo(VerifierNav)