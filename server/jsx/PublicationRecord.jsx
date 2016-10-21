import React from 'react';
import Paper from 'material-ui/Paper';
import {getJSON, each} from "jquery";
import API from './API.jsx';


var entries = {};
let name;

class PublicationRecord extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
  }

  componentDidMount(){
  }

  render(){
    return(
      <div>
        <div className = "container">
        <h4> {this.props.data.person_name} </h4>
          <br></br>
          <table className="col s6">
            <tbody>
            <tr>
              <td>Department</td>
              <td>{this.props.data.dept}</td>
            </tr>
            <tr>
              <td>Staff ID</td>
              <td>{this.props.data.staffid}</td>
            </tr>
            <tr>
              <td>Level</td>
              <td>{this.props.data.level}</td>
            </tr>
            </tbody>
          </table>
          <table>
            <tbody>
            <tr>
              <td>WoS H-index (all)</td>
              <td style={{textAlign:"right"}}>{this.props.data.woshall}</td>
              <td>
              </td>
              <td>Scopus H-index (2011-15)</td>
              <td style={{textAlign:"right"}}>{this.props.data.scopush1115}</td>
            </tr>
            <tr>
              <td>WoS H-index (IRIS)</td>
              <td style={{textAlign:"right"}}>{this.props.data.woshiris}</td>
              <td>
              </td>
              <td>Google H-index</td>
              <td style={{textAlign:"right"}}>{this.props.data.googleh}</td>
            </tr>
            <tr>
              <td>WoS H-index (2011-15)</td>
              <td style={{textAlign:"right"}}>{this.props.data.wosh1115}</td>
              <td>
              </td>
              <td>Google citations</td>
              <td style={{textAlign:"right"}}>{this.props.data.googlecites}</td>
            </tr>
            <tr>
              <td>Altmetric Score</td>
              <td style={{textAlign:"right"}}>{this.props.data.altmetric}</td>
            </tr>
            </tbody>
          </table>
                  <div className="card orange lighten-1">
                    <div className="card-content brown-text">
                      Approved : {this.props.data.approved}
                    </div>
                  </div>
                  <div className="card orange darken-4">
                    <div className="card-content white-text">
                      Rejected : {this.props.data.rejected}
                    </div>
                  </div>
        <table>
          <tbody>
          <tr>
            <td>
              #A1 2011-15
            </td>
            <td style={{textAlign:"right"}}>{this.props.data.a1}</td>
          </tr>
          <tr>
            <td>
              #B1 2011-15
            </td>
            <td style={{textAlign:"right"}}>{this.props.data.b1}</td>
          </tr>
          <tr>
            <td>
              #C1 2011-15
            </td>
            <td style={{textAlign:"right"}}>{this.props.data.c1}</td>
          </tr>
          <tr>
            <td>
              #E1 2011-15
            </td>
            <td style={{textAlign:"right"}}>{this.props.data.e1}</td>
          </tr>
        </tbody>
        </table>
        </div>
      </div>
    );
  }
}

let call = function(data){
  console.log(data);
}


export default PublicationRecord;
