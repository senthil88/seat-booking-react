import React from "react"
import { Row, Col } from 'react-bootstrap'
import SingleSeat from 'components/seat/SingleSeat';


const Seat = (props) => {

  return (
    <>
      <Row className='screen'>
        <Col className="text-center">
          <h4> SCREEN THIS WAY </h4>
        </Col>
      </Row>

      <Row className='cabin'>
        <Col className="text-center single-row">
          {props.layout.map((currentRow, index) => (
            <Row key={currentRow.displayText} className='nowrap'>
              {currentRow.columns.map(column => {
                return (
                  <SingleSeat row={currentRow} column={column} />
                )
              })}
            </Row>
          ))}
        </Col>
      </Row>

    </>

  );
}


export default Seat;
