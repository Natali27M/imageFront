import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { axiosService } from './services/axios.service';
import { urls } from './configs/urls';

function App() {
    const [imageUrl, setImageUrl] = useState('');
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const getText = async () => {
        try {
            const response = await axiosService.post(urls.image, { transcript });
            const imageUrl = response.data?.imageUrl?.[0];
            setImageUrl(imageUrl);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
            <button onClick={getText}>Send</button>
            {imageUrl && <img src={imageUrl} alt=""/>}
        </div>
    );
}

export default App;







