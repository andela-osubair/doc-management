import React from 'react';
import classnames from 'classnames';

class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this
      .onClick
      .bind(this);
  }

  onClick() {
    this
      .props
      .deleteFlashMessage(this.props.message.id);
  }

  render() {
    const { type, text } = this.props.message;
    return (
      <div className="row">
        <div className="col s12 l12">
          <div
            id="card-alert"
            className={classnames('card', {
              green: type === 'success',
              red: type === 'error'
            })}>
            <div className="card-content white-text">
              <p>{text}</p>
            </div>
            <div className="fixed-action-btn horizontal edit">
              <a className="btn-floating white" onClick={this.onClick}>
                <i className="material-icons black">close</i>
              </a>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired
};

export default FlashMessage;
