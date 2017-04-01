// This component handles the App template used on every page.
import React, { PropTypes } from 'react';
import Header from './common/Header';
import FlashMessagesList from './flash/FlashMessagesList';
/**
 *
 */
class App extends React.Component {
  componentDidMount() {
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'right', // Choose the horizontal origin
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
    $('.modal').modal();
    $('select').material_select();
    $('.tooltipped').tooltip({ delay: 50 });
    $('.dropdown-button').dropdown();
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'public');
  }
  /**
   * @return {object} html
   */
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

/**
 * [mapStateToProps description]
 * @param  {[type]} state    [description]
 * @param  {[type]} ownProps [description]
 * @return {[type]}          [description]
 */
// function mapStateToProps(state, ownProps) { } export default
// connect(mapStateToProps)(App);
export default App;
