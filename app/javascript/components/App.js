import React from "react";
import Header from './layout/Header';
import Movie from 'components/movie/Movie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Header />
        <Container>
          <Movie />
        </Container>
      </>
    );
  }
}

export default App;
