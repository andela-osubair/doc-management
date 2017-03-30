import React from 'react';

class DocumentPaginagion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 1 };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  prev() {
    this.setState({ current: this.state.current - 1 });
  }

  next() {
    this.setState({ current: this.state.current + 1 });
  }

  render() {
    const items = this.props
    .myDocuments.reduce((arr, i, idx) => {
      if ((idx + 1) === this.state.current) {
        arr.push(
            <span key={`item_${idx}`}>{i.title}</span>
        );
      }

      return arr;
    }, []);

    return (
        <div>

            {items}

            <br />

            <span onClick={this.prev}>prev</span>

            <span>1</span>
            <span>2</span>
            <span>3</span>

            <span onClick={this.next}>next</span>

            <br /><span>current: {this.state.current}</span>
        </div>
    );
  }

}

export default DocumentPaginagion;
