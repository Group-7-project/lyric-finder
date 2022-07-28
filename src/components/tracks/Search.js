import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
  state = {
    trackTitle: ''
  };

  findTrack = (dispatch, e) => {
    e.preventDefault();

    axios
      .get(
        `http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
          this.state.trackTitle
        }&page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_KEY
        }`
      )
      .then(res => {
        console.log(res.data)
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        });

        this.setState({ trackTitle: '' });
      })
      .catch(err => console.log(err));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3 p-3 bg-info shadow p-3 mb-5 bg-body rounded">
              <h1 className="display-2 text-center"><strong>
              <i class="fa-thin fa-list-music"></i> Search For Any Movie
              </strong></h1>
              <p className="lead text-center">Get information about your favourite flick!</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Movie title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  className="btn btn-warning btn-lg btn-block mb-5"
                  type="submit"
                >
                  Go!
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;