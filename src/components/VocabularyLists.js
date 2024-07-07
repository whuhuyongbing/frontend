import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function VocabularyLists() {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/lists')
            .then(response => {
                setLists(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Vocabulary Lists</h1>
            {lists.map(list => (
                <div key={list.id} className="vocabulary-list">
                    <h2>List {list.id}</h2>
                    <Link to={`/learn/${list.id}`}>
                        <button className="btn btn-primary learn-button">Learn</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default VocabularyLists;
