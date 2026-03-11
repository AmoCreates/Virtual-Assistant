import React, { useContext, useEffect, useCallback, useRef, useState } from 'react'
import { UserDataContext } from '../Context/UserContext.jsx'
import elli from '../assets/elli.avif'
import { Link, useNavigate } from 'react-router-dom'
import aiVoice from '../assets/aiVoice.gif'
import userVoice from '../assets/userVoice.gif'
import { BsMenuButtonWideFill } from "react-icons/bs";
import api from '../api/axios.js'

const Home = () => {
  const {userData, setUserData, assistantResponse} = useContext(UserDataContext);
  const navigate = useNavigate();
  // recognition instance and state refs
  const recognizingRef = useRef(null); // will hold SpeechRecognition object
  const isRecognizingRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const [isListening, setIsListening] = useState(false);
  const [aiSpeech, setAiSpeech] = useState("");
  const [userSpeech, setuserSpeech] = useState("");
  const [chatHistoryOpen, setChatHistoryOpen] = useState(false);
  const selectedVoiceRef = useRef(null);
  const sidebarRef = useRef(null);

  // Helper function to get the right voice based on preference
  const getVoiceByPreference = useCallback((preference) => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    
    // Log available voices for debugging
    const englishVoices = voices.filter(v => v.lang && v.lang.startsWith('en'));
    console.log('Available English voices:', englishVoices.map(v => ({ name: v.name, lang: v.lang })));
    
    let selected;
    
    if (preference === 'girl') {
      // Look for female voices - broader search
      selected = voices.find(v => 
        /female|woman|girl|zira|clara|cortana|moira|victoria|samantha/i.test(v.name)
      );
      // Fallback to Google voices
      if (!selected) {
        selected = voices.find(v => 
          (v.name.includes('Google') && v.name.includes('US')) ||
          v.name.includes('Google UK English Female')
        );
      }
    } else if (preference === 'boy') {
      // Look for male voices - broader search
      selected = voices.find(v => 
        /male|man|boy|david|mark|george|microsoft.*male|alex/i.test(v.name)
      );
      // Fallback to find a non-female voice
      if (!selected) {
        selected = voices.find(v => 
          !/female|woman|girl|zira|clara|cortana|moira|victoria|samantha/i.test(v.name) &&
          v.lang && v.lang.startsWith('en')
        );
      }
    }
    
    // Final fallback to first English voice
    if (!selected) {
      selected = voices.find(v => v.lang && v.lang.startsWith('en'));
    }
    
    console.log(`Selected voice for "${preference}":`, selected?.name, selected?.lang);
    return selected || null;
  }, []);

  const handleLogout = async () => {
    try {
      const response = await api.get('/api/v1/auth/logout', {
        credentials: 'include'
      });
      if (response.status === 200) {
        navigate('/signin');
        setUserData(null);
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  const speak = useCallback((text) => {
    setuserSpeech("");
    setAiSpeech(text);
    const utterance = new SpeechSynthesisUtterance(text);
    // Always get fresh voice based on current user preference
    const voice = getVoiceByPreference(userData?.voicePreference || 'girl');
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
      selectedVoiceRef.current = voice; // Update ref for future use
    }
    // flag while speaking to prevent recognition from restarting
    isSpeakingRef.current = true;
    utterance.onend = () => {
      isSpeakingRef.current = false;
      // Restart recognition after speaking ends
      if (recognizingRef.current && !isRecognizingRef.current) {
        try {
          recognizingRef.current.start();
          isRecognizingRef.current = true;
        } catch (error) {
          if (error.name !== 'InvalidStateError') {
            console.error('Speech recognition restart error:', error);
          }
        }
      }
    }
    speechSynthesis.speak(utterance);
  }, [getVoiceByPreference, userData]);
    

  // Refresh voice whenever preference changes
  useEffect(() => {
    if (!userData) return;
    
    const preference = userData?.voicePreference || 'girl'; // Default to girl voice
    const selected = getVoiceByPreference(preference);
    if (selected) {
      selectedVoiceRef.current = selected;
      console.log('Voice preference updated to:', selected.name, 'for preference:', preference);
    }
  }, [userData?.voicePreference, userData, getVoiceByPreference]);

  const handleCommand = useCallback((data) => {
    const { type, userInput, response, aiResponse } = data;
    speak(response);
          switch (type) {
            case 'web_search': {
              const query = encodeURIComponent(userInput);
              window.open(  `https://www.google.com/search?q=${query}`,  '_blank');
              break;
            }
            case 'youtube_search' : {
              const query = userInput;
              window.open(  `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,  '_blank'
              );
              break;
            }
            case 'wikipedia_search': {
              const query = userInput;
              window.open(  `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`, '_blank' );
              break;
            }
            case 'news_search': {
              const query = userInput;
              window.open(  `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=nws`, '_blank' );
              break;
            }
            case 'weather_forecast': {
              const query = userInput;
              window.open(  `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`, '_blank' );
              break;
            }
            
            case 'youtube_open':
              try { window.open('https://www.youtube.com', '_blank'); } catch (e) { console.warn('Unable to open YouTube', e); }
              break;
            case 'facebook_open':
              try { window.open('https://www.facebook.com', '_blank'); } catch (e) { console.warn('Unable to open Facebook', e); }
              break;
            case 'twitter_open':
              try { window.open('https://www.twitter.com', '_blank'); } catch (e) { console.warn('Unable to open Twitter', e); }
              break;
            case 'instagram_open':
              try { window.open('https://www.instagram.com', '_blank'); } catch (e) { console.warn('Unable to open Instagram', e); }
              break;
            case 'play_music':
              try {
                if (aiResponse && aiResponse.url) {
                  window.open(aiResponse.url, '_blank');
                } else {
                  window.open('https://www.youtube.com/results?search_query=play+music', '_blank');
                }
              } catch (e) {
                console.warn('Unable to play music', e);
              }
              break;
            
            case 'time': {
              const currentTime = new Date().toLocaleTimeString();
              speak(`The current time is ${currentTime}`);
              break;
            }
            case 'date': {
              const currentDate = new Date().toLocaleDateString();
              speak(`Today's date is ${currentDate}`);
              break;
            }
          
            case 'open_app': {
              // opening local executables or custom protocols is not allowed in a browser;
              // the calls below will usually throw or be blocked, which is what you've seen.
              // if this is an Electron/desktop context you can handle differently, otherwise
              // just warn instead of calling window.open directly.
              const text = userInput.toLowerCase();
              const tryOpen = (url) => {
                try {
                  window.open(url);
                } catch (e) {
                  console.warn('cannot open', url, e);
                }
              };
              if (text.includes('calculator')) {
                tryOpen('calc.exe');
                break;
              }
              if (text.includes('notepad')) {
                tryOpen('notepad.exe');
                break;
              }
              if (text.includes('spotify')) {
                tryOpen('spotify:');
                break;
              }
              if (text.includes('play music')) {
                tryOpen('mediaplayer.exe');
                break;
              }
              if (text.includes('whatsapp')) {
                tryOpen('whatsapp:');
                break;
              }
              if (text.includes('vscode') || text.includes('code')) {
                tryOpen('vscode:');
                break;
              }
            }
            
          }
  }, [speak]);

  // Handle clicking outside sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Check if clicking on the chat history button
        if (!event.target.closest('button')?.textContent.includes('Chat')) {
          setChatHistoryOpen(false);
        }
      }
    };

    if (chatHistoryOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [chatHistoryOpen]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported');
      return;
    }
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognizingRef.current = recognition;

    const safeStartRecognition = () => {
      if (!isRecognizingRef.current && !isSpeakingRef.current) {
        try {
          recognition.start();
          isRecognizingRef.current = true;
        } catch (error) {
          if (error.name !== 'InvalidStateError') {
            console.error('Speech recognition start error:', error);
          }
        }
      }
    };

    recognition.onstart = () => {
      console.log('Speech recognition started');
      isRecognizingRef.current = true; // double check to prevent multiple starts
      setIsListening(true);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      isRecognizingRef.current = false;
      setIsListening(false);

      if (isSpeakingRef.current) {
        setTimeout(() => {
          safeStartRecognition();
        }, 500); // Restart recognition after a short delay to allow speech synthesis to finish
      }
    };

    recognition.onresult = async (event) => {
      const command = event.results[event.results.length - 1][0].transcript.trim();
      setAiSpeech("");
      setuserSpeech(command);

      if (command.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        const response = await assistantResponse(command);
        console.log('Assistant response:', response);
        if (response) {
          handleCommand(response);
        }
      }
    };

    const intervalId = setInterval(() => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        safeStartRecognition();
      }
    }, 1000);

    try {
      recognition.start();
    } catch (err) {
      if (err.name !== 'InvalidStateError') console.error('recognition.start error', err);
    }

    window.speechSynthesis.onvoiceschanged = () => {
      console.log('Voices loaded, ready to speak');
    };

    // Speak greeting with selected voice
    const speakGreeting = () => {
      const greeting = new SpeechSynthesisUtterance(`hello ${userData.username}, what can i help you with?`);
      
      // If voice ref is not set yet, get it based on preference
      if (!selectedVoiceRef.current) {
        const preference = userData?.voicePreference || 'girl';
        const voice = getVoiceByPreference(preference);
        if (voice) {
          selectedVoiceRef.current = voice;
          greeting.voice = voice;
          greeting.lang = voice.lang;
        }
      } else {
        greeting.voice = selectedVoiceRef.current;
        greeting.lang = selectedVoiceRef.current.lang;
      }
      
      greeting.onend = () => {
        startTimeout();
      };
      window.speechSynthesis.speak(greeting);
      console.log('Greeting spoken with voice:', selectedVoiceRef.current?.name, 'for preference:', userData?.voicePreference || 'girl (default)');
    };

    // Delay to ensure voices are loaded
    setTimeout(speakGreeting, 500);

    return () => {
      recognition.stop();
      setIsListening(false);
      clearInterval(intervalId);
    };
  }, [assistantResponse, handleCommand, userData, getVoiceByPreference]);

  
  
  return (
    <div className='h-screen w-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-black via-[#030250] to-[#0a0a2e] relative'>
      {/* Top Navigation Bar */}
      <div className='absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-transparent backdrop-blur-sm z-50 flex items-center justify-between px-8 border-b border-[rgba(96,165,250,0.1)]'>
        <button className='select homebtn flex items-center gap-2 bg-white/10 hover:bg-white/20 py-2 px-4 rounded-full font-semibold cursor-pointer text-white border border-white/30 transition-all'
        onClick={() => setChatHistoryOpen(!chatHistoryOpen)}><span className='text-xl'><BsMenuButtonWideFill /></span><span className='hidden sm:inline'>Chat History</span></button>
        
        <div className='flex items-center gap-3'>
          <Link to={'/customize'} className='select homebtn bg-white/10 hover:bg-white/20 py-2 px-4 rounded-full font-semibold cursor-pointer text-white border border-white/30 transition-all'>Customize</Link>
          <button className='select homebtn bg-red-500/20 hover:bg-red-500/40 py-2 px-4 rounded-full font-semibold cursor-pointer text-white border border-red-500/30 transition-all'
          onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Chat History Sidebar */}
      <div ref={sidebarRef} className={`menu absolute flex flex-col top-0 left-0 z-40 h-full w-[35vw] max-w-sm shadow-2xl transition-transform duration-300 ${chatHistoryOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='bg-gradient-to-r from-[#030250] to-[#1e3a8a] py-6 px-6 border-b border-[rgba(96,165,250,0.2)] flex items-center justify-between'>
          <h1 className='text-white text-2xl font-bold'>Chat History</h1>
          <button 
            onClick={() => setChatHistoryOpen(false)}
            className='text-white hover:bg-white/20 p-2 rounded-lg transition-all text-xl'
          >
            ✕
          </button>
        </div>
        <div className='chats flex flex-col gap-0 text-white overflow-y-auto flex-1 py-2'>
          {userData.chatHistory && userData.chatHistory.length > 0 ? (
            userData.chatHistory.map((chat, idx) => (
              <div key={idx} className='chat py-3 px-6 hover:bg-[rgba(96,165,250,0.1)] border-b border-[rgba(96,165,250,0.1)] transition-all hover:border-[rgba(96,165,250,0.3)] cursor-pointer text-sm text-gray-300 hover:text-white'>
                <p className='truncate'>{chat}</p>
              </div>
            ))
          ) : (
            <div className='flex items-center justify-center h-full text-gray-500'>
              <p>No chat history yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {chatHistoryOpen && (
        <div 
          className='absolute inset-0 bg-black/30 z-30'
          onClick={() => setChatHistoryOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className='flex flex-col gap-6 items-center justify-center'>
        <div className='mainAssistant h-[50vh] sm:h-[40vh] w-[35vh] sm:w-[30vh] max-w-sm overflow-hidden rounded-3xl shadow-2xl'>
          <img className='object-cover h-full w-full' src={(userData?.assistantImg) ? userData?.assistantImg : elli} alt="assistant avatar" />
        </div>
        
        <div className='text-center'>
          <h1 className='assistantName text-4xl sm:text-5xl mb-4'>Hi, I am {userData?.assistantName || "Elli"}</h1>
          
          {/* Voice Indicator */}
          <div className='flex flex-col items-center gap-3 mt-6'>
            <div className='relative h-20 w-20 flex items-center justify-center'>
              {isListening && (
                <div className='absolute inset-0 rounded-full border-2 border-[#60a5fa] animate-pulse'></div>
              )}
              {!aiSpeech && isListening ? (
                <img className='voice h-16 w-16 rounded-full' src={aiVoice} alt="Listening" />
              ) : aiSpeech ? (
                <img className='voice h-16 w-16 rounded-full' src={userVoice} alt="Speaking" />
              ) : (
                <div className='h-16 w-16 rounded-full bg-linear-to-r from-[#60a5fa] to-[#3b82f6] flex items-center justify-center text-white text-2xl'>
                  🎤
                </div>
              )}
            </div>
            
            {/* Status Text */}
            <p className='text-white/70 text-sm font-medium h-6'>
              {isListening ? 'Listening...' : aiSpeech ? 'Speaking...' : 'Say "' + userData?.assistantName + '\" to start'}
            </p>
            
            {/* Current Speech Display */}
            {userSpeech && (
              <div className='bg-blue-500/20 border border-blue-500/50 rounded-lg px-4 py-2 max-w-sm'>
                <p className='text-white/90 text-sm'>You: {userSpeech}</p>
              </div>
            )}
            
            {aiSpeech && (
              <div className='bg-green-500/20 border border-green-500/50 rounded-lg px-4 py-2 max-w-sm'>
                <p className='text-white/90 text-sm italic'>{userData?.assistantName}: {aiSpeech}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home