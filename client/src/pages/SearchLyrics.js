import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_POPULAR, QUERY_SEARCH } from '../utils/queries';
import PopularList from '../components/PopularLyrics';
import { searchLyrics } from '../utils/API';

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { SAVE_LYRIC } from '../utils/mutations';

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedLyrics, setSearchedLyrics] = useState([]);
  const { loading, data } = useQuery(QUERY_POPULAR);
  const popular = data?.popularLyrics || [];
  const [savedLyricIds, setSavedLyricIds] = useState([]);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {   
      const response = await searchLyrics(searchInput)

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      console.log(response)

      const items = await response.json();
      console.log(items)

      const lyricData = items.results.map((lyric) => ({
        lyricId: lyric.id,
        title: lyric.title,
        overview: lyric.overview,
        posterPath: lyric.poster_path,
        release_date: lyric.release_date,
        vote_average: lyric.vote_average
      }));

      setSearchedLyrics(lyricData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  }

  const handleSaveLyric = async (lyricId) => {
    const lyricToSave = searchedLyrics.find((lyric) => lyric.id === lyricId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await handleSaveLyric(lyricToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      
      setSavedLyricIds([...savedLyricIds, lyricToSave.lyricId]);
    } catch (err) {
      console.error(err);
    }
  };

  const imgRoute = 'https://image.tmdb.org/t/p/w500';

  return (
    <div>
    <link href="https://fonts.googleapis.com/css2?family=Otomanopee+One&display=swap" rel="stylesheet"></link>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet"></link>
    
      <Jumbotron fluid className='jumbo'>
        <Container>
          <h1 className="title">SEARCH FOR LYRICS!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a lyric'
                  className="search"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg' className="search">
                  Submit Lyric
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedLyrics.length
            ? `Viewing ${searchedLyrics.length} results:`
            : <PopularList popular={popular} />}
        </h2>
        <CardColumns>
          {searchedLyrics.map((lyric) => {
            return (
              <Card key={lyric.id} border='dark'>
                {lyric.posterPath ? (
                  <Card.Img src={imgRoute + lyric.posterPath} alt={`The cover for ${lyric.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{lyric.title}</Card.Title>
                  <Card.Text>{lyric.overview}</Card.Text>
                  <p>Release Date: {lyric.release_date}</p>
                  <p>IMDB score: {lyric.vote_average}</p>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedLyricIds?.some((savedLyricId) => savedLyricId === lyric.id)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveLyric(lyric.id)}>
                      {savedLyricIds?.some((savedLyricId) => savedLyricId === lyric.id)
                        ? 'This lyric has already been saved!'
                        : 'Save this lyric!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </div>
  );
};

export default SearchBooks;
