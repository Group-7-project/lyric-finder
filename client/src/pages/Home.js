import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_POPULAR } from '../utils/queries';
import PopularList from '../components/PopularLyrics';

const Home = () => {
    const { loading, data } = useQuery(QUERY_POPULAR);

    const popular = data?.popularLyrics || [];
    console.log(popular)

    return (
        <main>
            <div>
                <PopularList popular={popular} />
            </div>
        </main>
    )
}

export default Home;