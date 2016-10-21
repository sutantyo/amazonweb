import React from 'react';
import PublicationRecord from './PublicationRecord.jsx';
import {getJSON, each} from "jquery";

class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {id: 0, data: {}};
  }
  componentDidMount(){
  }

  componentDidUpdate(){
    console.log("Main updating");
    console.log(this.state.data);
  }

  searchID(event){
    event.preventDefault();
    let _this = this;
    getJSON("/u/"+_this.refs.input_mqid.value, function(data){
      _this.setState({data: data[0]});
      _this.refs.input_mqid.value='';
    });
  }

  render(){
    return(
      <div className="container">
        <div className="row">
          <form onSubmit={this.searchID.bind(this)} className = "col offset-s2 s8">
            <div className="row">
              <div className = "input-field col s12">
                <input id="mqid" type="text" ref="input_mqid" placeholder="Enter Macquarie ID" className="active"/>
                <button className="btn right">Find</button>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col offset-s1 s10 card blue-grey darken-1">
            <div className="card-content white-text">
              <PublicationRecord data={this.state.data}></PublicationRecord>
            </div>
          </div>
        </div>
    </div>
    );
  }
}

export default MainPage;
