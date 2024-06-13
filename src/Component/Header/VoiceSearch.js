// import React, { useState, useEffect, useRef } from 'react';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// const VoiceSearch = ({ onSearch }) => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState('');
//   const inactivityTimerRef = useRef(null);

//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

//   recognition.continuous = true;
//   recognition.interimResults = true;

//   recognition.onstart = () => {
//     setIsListening(true);
//     resetInactivityTimer();
//   };

//   recognition.onresult = (event) => {
//     resetInactivityTimer();
//     let interimTranscript = '';
//     for (let i = event.resultIndex; i < event.results.length; i++) {
//       const transcriptSegment = event.results[i][0].transcript;
//       if (event.results[i].isFinal) {
//         setTranscript(transcriptSegment);
//         onSearch(transcriptSegment); // Trigger the search with the recognized text
//       } else {
//         interimTranscript += transcriptSegment;
//       }
//     }
//     setTranscript(interimTranscript);
//   };

//   recognition.onerror = (event) => {
//     console.error('Speech recognition error', event.error);
//   };

//   recognition.onend = () => {
//     setIsListening(false);
//     clearInactivityTimer();
//   };

//   const handleListen = () => {
//     if (isListening) {
//       recognition.stop();
//     } else {
//       recognition.start();
//     }
//   };

//   const resetInactivityTimer = () => {
//     clearInactivityTimer();
//     inactivityTimerRef.current = setTimeout(() => {
//       recognition.stop();
//     }, 5000); 
//   };

//   const clearInactivityTimer = () => {
//     if (inactivityTimerRef.current) {
//       clearTimeout(inactivityTimerRef.current);
//       inactivityTimerRef.current = null;
//     }
//   };

//   useEffect(() => {
//     return () => {
//       clearInactivityTimer();
//       recognition.stop();
//     };
//   }, []);

//   return (
//     <div>
//       <button onClick={handleListen}>
//         {isListening ? <MicOffIcon/>  : <MicIcon/>}
//       </button>
//       <p>{transcript}</p>
//     </div>
//   );
// };

// export default VoiceSearch;


import React, { useState, useEffect, useRef } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import styles from './VoiceSearch.module.css';

const VoiceSearch = ({ onSearch }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const inactivityTimerRef = useRef(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = () => {
    setIsListening(true);
    resetInactivityTimer();
  };

  recognition.onresult = (event) => {
    resetInactivityTimer();
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcriptSegment = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        setTranscript(transcriptSegment);
        onSearch(transcriptSegment); 
      } else {
        interimTranscript += transcriptSegment;
      }
    }
    setTranscript(interimTranscript);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
  };

  recognition.onend = () => {
    setIsListening(false);
    clearInactivityTimer();
  };

  const handleListen = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  const resetInactivityTimer = () => {
    clearInactivityTimer();
    inactivityTimerRef.current = setTimeout(() => {
      recognition.stop();
    }, 3000); 
  };

  const clearInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearInactivityTimer();
      recognition.stop();
    };
  }, []);

  return (
    <div className={styles.container}>
      <button onClick={handleListen}>
        {isListening ? <MicOffIcon style={{ color: 'red' }} /> : <MicIcon style={{ color: 'rgb(14, 179, 234)' }} />}
      </button>
    </div>
  );
};

export default VoiceSearch;

