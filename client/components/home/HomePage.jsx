import React from 'react';
import LoginForm from './LoginForm.jsx';
import homeBGPic from './images/docman.jpg';

/**
 * HomePage Component
 */
export default class HomePage extends React.Component {

  /**
 * React Render
 * @return {object} html
 */
  render() {
    return (
      <div className="row">
        <div className="col s12  card-panel">
          <div className="row">
            <div className="col s7">
              <h4>Document Management System</h4>
              <img src={homeBGPic} className="responsive-img"/>
            </div>
            <div className="col s5">
              <LoginForm/>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
