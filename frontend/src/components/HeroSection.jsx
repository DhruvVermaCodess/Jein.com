import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const HeroSection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const {
        listening,
        transcript,
        browserSupportsSpeechRecognition,
        resetTranscript
    } = useSpeechRecognition();

    useEffect(() => {
        if (transcript) {
            setSearchQuery((prev) => prev + ' ' + transcript);
            resetTranscript(); // Reset the transcript after updating
        }
    }, [transcript, resetTranscript]);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="bg-gray-900 py-8 flex flex-col items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-white text-center mb-6">
                    Discover Amazing Products
                </h1>
                <div className="relative w-full max-w-2xl mx-auto mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search for products, brands, and more"
                        className="w-full py-2 pl-4 pr-16 rounded focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />
                    <button
                        className="absolute right-0 top-0 h-full text-gray-900 bg-yellow-400 hover:bg-yellow-500 px-4 rounded-r transition-colors"
                        onClick={handleSearch}
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </div>
                {browserSupportsSpeechRecognition ? (
                    <div className="text-center mt-4">
                        {listening ? (
                            <MicOff
                                onClick={SpeechRecognition.stopListening}
                                className="cursor-pointer w-8 h-8 text-red-500 inline-block"
                            />
                        ) : (
                            <Mic
                                onClick={SpeechRecognition.startListening}
                                className="cursor-pointer w-8 h-8 text-white inline-block"
                            />
                        )}
                    </div>
                ) : (
                    <p className="text-center mt-4 text-white">
                        Speech recognition is not supported in your browser.
                    </p>
                )}
            </div>
        </div>
    );
};

export default HeroSection;
