import React from 'react';

class RestaurantApp extends React.Component {
    constructor(props){
    super(props);
    this.state = {
      cami : 0,
      dba : null,
      borough : null, 
      street : null,
      zipcode : 0,
      inspect_date: null,
      violate_code : null,
      violate_desc : null,
      grade: null,
      historical_data: null
    }
  }

  onCamiChange(event){
    this.setState({cami: event.target.value})
  }

  onDbaChange(event){
    this.setState({dba: event.target.value})
  }

  onBoroughChange(event){
    this.setState({borough: event.target.value})
  }

  onStreetChange(event){
    this.setState({street: event.target.value})
  }

  onZipcodeChange(event){
    this.setState({zipcode: event.target.value})
  }

  onInspectionDateChange(event){
    this.setState({inspect_date: event.target.value})
  }

  onViolationCodeChange(event){
    this.setState({violate_code: event.target.value})
  }

  onViolationDescChange(event){
    this.setState({violate_desc: event.target.value})
  }

  onGradeChange(event){
    this.setState({grade: event.target.value})
  }

  insertRestaurant(event, restaurant){
    event.preventDefault();

    fetch('http://34.66.13.114:8080/api/insert_info', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(restaurant)}
     ).then((response) => {
       if(response.status === 200){
         response.json().then(
            data => console.log(data['Response'])
         )
       } else{
          response.json().then(
            data => console.log(data['Response'])
         )
       }
     }).catch((error) => {
       console.log('Error in inserting restaurant info', error)
     })
  }

  onRestaurantValues(event){
    event.preventDefault();
    let info = {cami: this.state.cami, dba: this.state.dba, borough: this.state.borough, street: this.state.street, zipcode: this.state.zipcode, inspect_date: this.state.inspect_date, violate_code: this.state.violate_code, violate_desc: this.state.violate_desc, grade: this.state.grade, response: null}

    if(isNaN(parseInt(info.cami)) || isNaN(parse(info.dba)) || isNaN(parse(info.borough)) || isNaN(parse(info.street)) || isNaN(parseInt(info.zipcode)) || isNaN(parse(info.inspect_date)) || isNaN(parse(info.violate_code)) || isNaN(parse(info.violate_desc)) || isNaN(parse(info.grade))){
      this.setState({response: "Must enter valid information"})
    } else {
      this.setState({response: response})

      info.response = response

      this.insertRestaurant(event, info)
    }
  }

  showHistory(event){
    event.preventDefault()

    this.setState({historical_data: "loading data"})
    
    this.getHistory(event)
  }

  closeHistory(event){
    event.preventDefault()

    this.setState({historical_data: null})
  }

  getHistory(event){

    event.preventDefault()

    fetch('http://34.66.13.114:8080/api/data', {
        method: 'GET',
        mode: 'cors'}
    ).then(response => {
      if(response.status === 200){
        (response.json()).then((data) => {
          this.setState({historical_data: data['restaurants']})
        })
      } else{
        (response.json()).then((data) => {
          this.setState({answer: data['error']})
          return null
        })
      }
    }).catch((error) => {
        console.log("Error in fetching restaurants history.", error)
    })
  }

  render() {
    return(
      <form method='GET'>
        <div>
          <Cami onCamiChange = {(event) => this.onCamiChange(event)}/>
        </div>
        <div>
          <DBA onDbaChange = {(event) => this.onDbaChange(event)}/>
        </div>
        <div>
          <Borough onBoroughChange = {(event) => this.onBoroughChange(event)}/>
        </div>
        <div>
          <Street onStreetChange = {(event) => this.onStreetChange(event)}/>
        </div>
        <div>
          <Zipcode onZipcodeChange = {(event) => this.onZipcodeChange(event)}/>
        </div>
        <div>
          <InspectDate onInspectionDateChange = {(event) => this.onInspectionDateChange(event)}/>
        </div>
        <div>
          <ViolateCode onViolationCodeChange = {(event) => this.onViolationCodeChange(event)}/>
        </div>
        <div>
          <ViolateDesc onViolationDescChange = {(event) => this.onViolationDescChange(event)}/>
        </div>
        <div>
          <Grade onGradeChange = {(event) => this.onGradeChange(event)}/>
        </div>

        <div>
          <ShowHistory
          data={this.state.historical_data}
          closeHistory={(event)=> this.closeHistory(event)}
          showHistory={(event) => this.showHistory(event)}
          getHistory = {(event) => this.getHistory(event)}/>
        </div>
        <div>
          <History data={this.state.historical_data}/>
        </div>
      </form>
    )
  }
}

function Cami(props){
  return(
    <input placeholder='0' onChange={props.onCamiChange}></input>
  )
}

function DBA(props){
    return(
      <input placeholder='0' onChange={props.onDbaChange}></input>
    )
  }

function Borough(props){
    return(
      <input placeholder='0' onChange={props.onBoroughChange}></input>
    )
}

function Street(props){
    return(
      <input placeholder='0' onChange={props.onStreetChange}></input>
    )
}

function Zipcode(props){
  return(
    <input placeholder='0' onChange={props.onZipcodeChange}></input>
  )
}

function InspectDate(props){
    return(
      <input placeholder='0' onChange={props.onInspectionDateChange}></input>
    )
  }

function ViolateCode(props){
    return(
      <input placeholder='0' onChange={props.onViolationCodeChange}></input>
    )
}

function ViolateDesc(props){
    return(
      <input placeholder='0' onChange={props.onViolationDescChange}></input>
    )
}

function Grade(props){
    return(
      <input placeholder='0' onChange={props.onGradeChange}></input>
    )
}

function ShowHistory(props){
  if(props.data !== null){
    return(
      <button onClick={props.closeHistory}>Close history</button>
    )
  } else{
    return(
      <button onClick={props.showHistory}>Show history</button>
    )
  }
}

function History(props){
  if(props.data !== null && props.data !== "loading data"){
    return props.data.map((index) => {
        let infor = index[0].toString() + index[1].toString() + index[2].toString() + index[3].toString() + index[4].toString() + index[5].toString() + index[6].toString() + index[7].toString() + index[8].toString()
        return(
            <div>{infor}</div>
        )
    })
  } else if(props.data === "loading data"){
    return(
      <div>loading history...</div>
    )
  }else{
    return(
      <div>History of restaurants</div>
    )
  }
}

export default RestaurantApp;