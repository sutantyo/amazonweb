import {get} from "jquery";

let API = {
  fetchRecord(){
    get("/u/20097759").done(resp => {
      return resp;
    })
  }
};
export default API;
