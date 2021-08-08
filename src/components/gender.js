
import React, { Component } from 'react'
import axios from 'axios'

export default class Gender extends Component {

    state={
        name:"",
        email:"",
        male:false,
        girl:false
    }

  handleChange=async(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    }) 
  }
 
nameChange=(e)=>{
e.preventDefault()
 axios.get(`https://genderapi.io/api/?name=${this.state.name}&key=6106317a8056eb313024e762`).then((res)=>{
    console.log(res.data.name===this.state.name,"ddd")
    if(res.data.gender==="female"){
       this.setState({
          girl:!this.state.girl
       })
    }else{
        this.setState({
            male:!this.state.male
        })
    }
}).catch((err)=>{
    console.log(err)
})
}
girlradioChange=(e)=>{
    this.setState({
        girl:!this.state.girl,

    })
}
boyradioChange=(e)=>{
    this.setState({
        male:!this.state.male,

    })
}
    render() {
        return (
            <div>
                <form>
                    <label>name:</label>
                    <input type="text"  value={this.state.name} name="name" onBlur={this.nameChange}
                     onChange={this.handleChange}/><br/>
                    
                    <label>email:</label>
                    <input type="text"  value={this.state.email} name="email" onChange={this.handleChange}/><br/>
                    <label>gender:</label><br/>
                   male: <input type="radio" value={this.state.male} checked={this.state.male} 
                    onChange={this.boyradioChange}/>
                   female:<input type="radio" value={this.state.girl} checked={this.state.girl}
                    onChange={this.girlradioChange}/>
                </form>
            </div>
        )
    }
}

