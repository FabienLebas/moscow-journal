import React, { Component } from 'react';

export default class UploadFiles extends Component {
  constructor(props){
  super(props);
    this.state = {
      file : null,
      loading: null
    }
  }

  handleSubmitFile = (file) => {
    this.setState({file : file});
  }

  sendFile = () => {
    this.setState({
      loading: true
    })
    const formData = new FormData();
    formData.append('file', this.state.file[0]);

    fetch(`${process.env.REACT_APP_baseURL_api}/api/uploadFile`, {
      method: 'POST',
      body: formData
    })
    .then(result => result.json)
    .then(result => {
      this.setState({
        loading: false
      })
      this.displayLoadedOK();
    })
    .catch(error => {
      console.warn(`Error in sendFile : ${error}`);
    })
  }

  displayLoadedOK = () => {
    if(this.state.loading === false){
      return(
        <div className="alert alert-success alert-dismissible fade show" role="alert">Le fichier est bien chargé
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )
    }
  }

  render(){
    return(
      <div className="container-fluid">
        Gestion des fichiers
        {this.displayLoadedOK()}
        <div className="input-group">
          <input type="file" accept="file" onChange={e => this.handleSubmitFile(e.target.files)} className="input-group-text" encType="multipart/form-data"/>
          <button onClick={() => this.sendFile()}
            className="btn btn-success"
            disabled = {this.state.loading}
            >
            Envoyer
          </button>
        </div>
      </div>
    )
  }
}
