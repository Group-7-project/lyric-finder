import React, { useState } from 'react';
import { Card, Container, CardColumns, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';

const PopularList = ({ popular }) => {
    console.log(popular)
    const imgRoute = 'https://image.tmdb.org/t/p/w500';

    // create state for holding returned api data
    const [searchedLyrics, setSearchedLyrics] = useState([]);
    // create state to hold saved bookId values
    const [savedLyricIds, setSavedLyricIds] = useState([]);

     // create function to handle saving a book to our database
    const handleSaveLyric = async (lyricId) => {
        // find the book in `searchedBooks` state by the matching id
        const lyricToSave = searchedLyrics.find((lyric) => lyric.id === lyricId);

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
        return false;
        }

        try {
        const response = await handleSaveLyric(lyricToSave, token);

        if (!response.ok) {
            throw new Error('something went wrong!');
        }

        // if book successfully saves to user's account, save book id to state
        setSavedLyricIds([...savedLyricIds, lyricToSave.lyricId]);
        } catch (err) {
        console.error(err);
        }
    };


    return (
        <>  
            <link href="https://fonts.googleapis.com/css2?family=Otomanopee+One&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet"></link>
            <Container>
                <h2>Popular Lyrics</h2>
                <CardColumns>
                {popular.results && 
                    popular.results.map(lyric => (
                        <Card key={lyric.id} border='dark'>
                            {lyric.poster_path ? (
                            <Card.Img src={imgRoute + lyric.poster_path} alt={`The cover for ${lyric.title}`} variant='top' />
                            ) : null}
                            <Card.Body>
                                <Card.Title>{lyric.title}</Card.Title>
                                <Card.Text style={{ fontSize: 20 }}>{lyric.overview}</Card.Text>
                                <p style={{ fontSize: 20 }}>Release Date: {lyric.release_date}</p>
                                <p style={{ fontSize: 20 }}>IMDB score: {lyric.vote_average}</p>
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
                    ))}
                </CardColumns>
            </Container>
        </>
    )

};

export default PopularList;