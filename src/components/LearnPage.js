import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating'; // Import the StarRating component
import './LearnPage.css';

function LearnPage() {
    const { id } = useParams();
    const [list, setList] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        axios.get(`http://localhost:5001/api/list/${id}`)
            .then(response => {
                setList(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    useEffect(() => {
        if (list && list.words[currentIndex]) {
            playAudio(currentIndex);
        }
    }, [list, currentIndex]);

    const playAudio = (index) => {
        if (list && list.words[index]) {
            const text = list.words[index].sentence;
            console.log(`text = ${text}`)
            audioRef.current.src = `https://dict.youdao.com/dictvoice?type=2&audio=${encodeURIComponent(text)}`;
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(error => console.error('Error playing audio:', error));
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.onended = () => setIsPlaying(false);
    
        const handleKeyPress = (event) => {
            if (event.target.tagName.toLowerCase() !== 'input' && event.target.tagName.toLowerCase() !== 'textarea') {
                if (event.key === 'r' || event.key === 'R') {
                    event.preventDefault(); // Prevent the default action
                    playAudio(currentIndex); // Replay the current audio
                }
    
                if (event.key === 'ArrowLeft') {
                    handlePrevious();
                }
    
                if (event.key === 'ArrowRight') {
                    handleNext();
                }
            }
        };
    
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
            audio.onended = null;
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentIndex, list]);
    

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, list.words.length - 1));
    };

    const handleRatingChange = (newRating) => {

    const updatedList = { ...list };
    
    updatedList.words[currentIndex].rating = newRating;
    
    setList(updatedList);

    axios.post(`http://localhost:5001/api/rate`, {
            wordId: list.words[currentIndex].id,
            rating: newRating
        }).catch(error => console.error('Error saving rating:', error));
    };

    if (!list) {
        return <div>Loading...</div>;
    }

    return (
        <div className="learn-page">
            <div className="content-container">
                <button 
                    className="btn btn-arrow btn-prev" 
                    onClick={handlePrevious}
                    aria-label="Previous"
                >
                    &#8592;
                </button>
                <div className="sentence-container">
                    <p>{list.words[currentIndex].sentence}</p>
                </div>
                <div 
                        className={`speaker-icon ${isPlaying ? 'playing' : ''}`} 
                        onClick={() => playAudio(currentIndex)}
                        role="button"
                        aria-label="Play audio"
                    />
                <StarRating rating={list.words[currentIndex].rating} onRatingChange={handleRatingChange} /> {/* StarRating component */}
                <button 
                    className="btn btn-arrow btn-next" 
                    onClick={handleNext}
                    aria-label="Next"
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
}

export default LearnPage;
