// This component handles the App template used on every page.
import React, { PropTypes } from 'react';
import Header from './common/Header.jsx';
import FlashMessagesList from './flash/FlashMessagesList.jsx';

class App extends React.Component {
  componentDidMount() {
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
    $('.modal').modal();
    $('select').material_select();
    $('.tooltipped').tooltip({ delay: 50 });
    $('.dropdown-button').dropdown();
    $('ul.tabs').tabs();
  }

  render() {
    return (
      <div>
        <Header/>
        <FlashMessagesList />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};


export default App;
