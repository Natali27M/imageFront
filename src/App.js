import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { axiosService } from './services/axios.service';
import { urls } from './configs/urls';
import NFT from './components/NFT';
import { useGlobalState, truncate } from '../src/store/index';
import { connectWallet } from './Blockchain.Services'

function App() {
    const [connectedAccount] = useGlobalState('connectedAccount')
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
            {connectedAccount ? (
                <button
                    className="shadow-xl shadow-black text-white
        bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-2
          rounded-full cursor-pointer"
                >
                    {truncate(connectedAccount, 4, 4, 11)}
                </button>
            ) : (
                <button
                    className="shadow-xl shadow-black text-white
        bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-2
          rounded-full cursor-pointer"
                    onClick={connectWallet}
                >
                    Connect Wallet
                </button>
            )}
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
            <button onClick={getText}>Send</button>
            {/*{imageUrl && <img src={imageUrl} alt=""/>}*/}
            <NFT image={imageUrl}/>
        </div>
    );
}

export default App;







