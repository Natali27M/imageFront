import React from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {axiosService} from './services/axios.service';
import {urls} from './configs/urls';


function App() {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    const getText = async() => {
        console.log(transcript);
        // async (data, {rejectWithValue}) => {
        //     try {
        //         return await exercisesProxyServices.checkExercises(data);
        //     } catch (e) {
        //         rejectWithValue(e);
        //     }
        // }

        await axiosService.post(urls.image,{transcript}).then(value => value.data).then(value => console.log(value.data,'11111111111'))
    }
    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
            <button onClick={getText}>Send</button>
        </div>
    );
}

export default App;
