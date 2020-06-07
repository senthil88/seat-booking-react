import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap'
import Seat from 'components/seat/Seat';
const axios = require('axios');
import times from 'lodash/times' //  2.08kB! :)
import Modal from 'react-bootstrap/Modal'

const Movie = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [layout, setLayout] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sortedAvailableSeats, setSortedAvailableSeats] = useState({});
  const [dynamicJson, setDynamicJson] = useState({
    "venue": { "layout": { "rows": 10, "columns": 50 } },
    "seats": {
      "a1": { "id": "a1", "row": "a", "column": 1, "status": "AVAILABLE" },
      "b5": { "id": "b5", "row": "b", "column": 5, "status": "AVAILABLE" },
      "h7": {
        "id": "h7", "row": "h", "column": 7, "status": "AVAILABLE"
      }
    }
  })

  useEffect(() => {
    loadMovieSet('set1');
  }, [])

  const loadMovieSet = (set) => {
    axios.get('api/v1/' + set).then(function (response) {
      let pivot = response.data.venue.layout.columns / 2;
      processLayout(response.data);
      sortAvailableSeat(response.data.seats, pivot);
    }).catch(function (error) {
    })
  }

  const sortAvailableSeat = (seats, pivot) => {
    let sortSeats = {};

    // 1st Priority: Closest to the front
    for (var key in seats) {
      if (!sortSeats[seats[key].row]) {
        sortSeats[seats[key].row] = []
      }
      sortSeats[seats[key].row].push(seats[key].column)
    }

    // 2nd Priority: Middle Seat
    for (var seat in sortSeats) {
      sortSeats[seat].sort((a, b) => Math.abs(a - pivot) - Math.abs(b - pivot) || b - a);
    }

    setSortedAvailableSeats(sortSeats)
  }

  const processLayout = (data) => {
    let availableSeats = Object.keys(data.seats)
    let layout = []

    // PREPARE: ROWS
    times(data.venue.layout.rows, (currentRow) => {
      let alphapet = String.fromCharCode(currentRow + 97)
      let singleRow = {
        displayText: alphapet,
        columns: []
      }

      // PREPARE: COLUMNS
      times(data.venue.layout.columns, (currentColumn) => {
        singleRow.columns.push({
          isAvailable: availableSeats.includes(alphapet + (currentColumn + 1)),
          displayText: currentColumn
        })
      })

      layout.push(singleRow);
    })

    setLoaded(true);
    setLayout(layout);
  }

  const bestSeat = () => {
    let firstKey = Object.keys(sortedAvailableSeats)[0];
    alert(firstKey + sortedAvailableSeats[firstKey][0])
  }

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const loadDynamicJson = () => {
    let json = JSON.parse(document.getElementById('dynamic-json').value)
    let pivot = json.venue.layout.columns / 2;
    processLayout(json);
    sortAvailableSeat(json.seats, pivot)
    hideModal();
  }

  if (isLoaded) {
    return (
      <>
        <button onClick={bestSeat}> Give Me the Best Seat</button>
        <button onClick={showModal}> Load Dynamic JSON</button>
        <Seat layout={layout} />
        <Modal show={isOpen} onHide={hideModal}>
          <Modal.Header>
            <Modal.Title>Load Dynamic JSON</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea rows="20" cols="50" id='dynamic-json'>
              {JSON.stringify(dynamicJson, null, 2)}
            </textarea>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={hideModal}>Cancel</button>
            <button onClick={loadDynamicJson}>Load</button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <h1> Loading.....</h1>
      </>
    );
  }

}


export default Movie;


