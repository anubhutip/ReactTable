import React, { Component } from 'react';
import './App.css';
import './css/jquery.dataTables.css'
import ReactTable from "react-table";
import "react-table/react-table.css"

const $ = require('jquery')
$.DataTable = require('datatables.net')







class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      myData:[],
      selected: {},
      isLoading: false
    }

  }

  handleInputChange=(event)=>{
  this.setState({searchField:event.target.value})
}
    handleSelect = (e) => {
    const selected = this.state.selected;
    selected[e.target.name] = e.target.checked;
    this.setState({ selected });
  }

   


   async componentDidMount(nextProps, nextState) {
    const url = "http://localhost:5555/";
    fetch(url, {
      method: "GET"
    }).then(response => response.json()).then(myData =>{
      this.setState({myData:myData})
    })
  
  }

  



  render() {

    const columns = [
    {
        Header : "ID",
        accessor: "id",
        filterable :false,
        style:{
          textAlign:"center"
        }
    },
    {
        Header : "OFFICENAME",
        accessor: "officename",
        sortable :false,
        filterable : false,
        style:{
          textAlign:"center"
        }
    },
    {
        Header : "PINCODE",
        accessor: "pincode",
        sortable: false,
        Filter: ({filter, onChange}) => (
          <input
          onChange={event => onChange(event.target.value)}
            value={filter ? filter.value : ''}
            type="text" placeholder="Search.."
          />
        ),
          

        style:{
          textAlign:"center"
        }
    }

];

    
    return (
   
    
      <ReactTable
      columns = {columns}
      data ={this.state.myData}
      filterable 
      >

       
    </ReactTable>
    

    );
  }

}

export default App;
