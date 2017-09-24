import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';
import * as API from './../utils/Api'


class App extends Component {
  
  componentDidMount() {
    API.getCategories().then((categories) => {
      console.log(categories)
    })
  }

  render() {  
    return (
      <div className='container'>
        <div className='calendar'>
          <p>Contenedor de Categorias</p>
        </div>
      </div>
    )
  }
}

export default App;
