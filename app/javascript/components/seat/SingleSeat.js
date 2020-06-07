import React from "react"
import PropTypes from "prop-types"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class SingleSeat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      row: props.row,
      column: props.column
    };
  }

  render() {
    return (
      <>
        <p className={"dot " + (this.props.column.isAvailable ? "show" : "booked")} key={this.props.row.displayText + this.props.column.toString()}>
          {this.props.row.displayText + (this.props.column.displayText + 1)}
        </p>
      </>
    )
  }
}

export default SingleSeat;