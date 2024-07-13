import "regenerator-runtime/runtime";
import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './homepage.css';
import axios from 'axios';
import Markdown from 'react-markdown';

import { SignedIn, SignedOut, SignInButton, UserButton,useSignIn ,useUser} from "@clerk/clerk-react";
import { Button } from "antd";


function Homepage() {
    const { isLoaded} = useSignIn();
    const { isSignedIn, user } = useUser();
   
    const signIn = useSignIn();

  
    const handleSignIn = async () => {
        try {
          const { userId } = await signIn({
            // Your sign in options here
          });
          console.log(`Signed in as ${userId}`);
        } catch (error) {
          console.error(error);
        }
      };

  
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return alert("Browser doesn't support speech recognition.");
    }

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copy, setCopy] = useState("Copy");
    const [buttonText, setButtonText] = useState("Generate");

    const combinedQuestionRef = useRef("");

    const answerRef = useRef(null);

    useEffect(() => {
        // Update question state when transcript changes and listening stops
        if (!listening && transcript) {
            const updatedQuestion = (question + " " + transcript).trim();
            setQuestion(updatedQuestion);
            combinedQuestionRef.current = updatedQuestion;
            generateAnswer(updatedQuestion);
        }
    }, [transcript, listening]);

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('chatHistory'));
        if (savedHistory) {
            setHistory(savedHistory);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('chatHistory', JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        if (answerRef.current) {
            answerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [answer]);

    async function generateAnswer(questionToAsk) {
        setButtonText("Generate");
        setLoading(true);
        setAnswer("loading... it might take up to 10 seconds");
        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_API_KEY}`,
                method: "post",
                data: {
                    contents: [
                        {
                            parts: [{ text: questionToAsk }]
                        },
                    ],
                },
            });

            let generatedAnswer = response.data.candidates[0].content.parts[0].text;
            generatedAnswer = generatedAnswer.replace(/\*\*/g, ''); // Remove double asterisk signs
            setAnswer(generatedAnswer);
            setHistory([{ question: questionToAsk, answer: generatedAnswer, copy: "Copy" }, ...history]);
        } catch (error) {
            console.error("Error generating answer:", error);
            setAnswer("Error generating answer. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    function deleteEntry(index) {
        setHistory(history.filter((_, i) => i !== index));
    }

    function editEntry(index) {
        const entry = history[index];
        setQuestion(entry.question);
        setButtonText("Update");
    }

    function copyToClipboard(index) {
        const newHistory = [...history];
        newHistory[index].copy = "Copied";

        navigator.clipboard.writeText(newHistory[index].answer).then(() => {
            console.log("Answer copied to clipboard!");
            setHistory(newHistory);
            setTimeout(() => {
                newHistory[index].copy = "Copy";
                setHistory([...newHistory]);
            }, 2000);
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    }

    const handleListen = () => {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            SpeechRecognition.startListening({ continuous: false });
            resetTranscript();
            setQuestion("")
        }
    };

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            // Prevent form submission if the input is empty
            if (question.trim() === '') {
                return;
            } else {
                generateAnswer(question);
            }
        }
    }

    function clearHistory() {
        setHistory([]);
        localStorage.removeItem('chatHistory');
    }

    function clearInput() {
        setQuestion("");
        setAnswer("");
        resetTranscript();
    }

    return (<>
        <SignedIn>
        <div className="container_box">
            <div className="sidebar">
            <div className="user_icon" style={{ fontSize:"22px",fontWeight:"500", display:"flex", justifyContent:"start", alignItems:"center"}}> {isLoaded && user ? user.fullName : "Loading..."}<UserButton /></div>
                <h2>History</h2>
                
                <button className="clear_button" onClick={clearHistory}>Clear History</button>
                <div className="history_record">
                    <ul>
                        {history.map((entry, index) => (
                            <li key={index}>
                                <p><strong>
                                    <svg style={{ borderRadius: "50%", marginLeft: "-34px", marginBottom: "-15px", marginRight: "-24px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height="48px" width="80px"><path fill="#282828" d="M135.832 140.848h-70.9c-2.9 0-5.6-1.6-7.4-4.5-1.4-2.3-1.4-5.7 0-8.6l4-8.2c2.8-5.6 9.7-9.1 14.9-9.5 1.7-.1 5.1-.8 8.5-1.6 2.5-.6 3.9-1 4.7-1.3-.2-.7-.6-1.5-1.1-2.2-6-4.7-9.6-12.6-9.6-21.1 0-14 9.6-25.3 21.5-25.3s21.5 11.4 21.5 25.3c0 8.5-3.6 16.4-9.6 21.1-.5.7-.9 1.4-1.1 2.1.8.3 2.2.7 4.6 1.3 3 .7 6.6 1.3 8.4 1.5 5.3.5 12.1 3.8 14.9 9.4l3.9 7.9c1.5 3 1.5 6.8 0 9.1-1.6 2.9-4.4 4.6-7.2 4.6zm-35.4-78.2c-9.7 0-17.5 9.6-17.5 21.3 0 7.4 3.1 14.1 8.2 18.1.1.1.3.2.4.4 1.4 1.8 2.2 3.8 2.2 5.9 0 .6-.2 1.2-.7 1.6-.4.3-1.4 1.2-7.2 2.6-2.7.6-6.8 1.4-9.1 1.6-4.1.4-9.6 3.2-11.6 7.3l-3.9 8.2c-.8 1.7-.9 3.7-.2 4.8.8 1.3 2.3 2.6 4 2.6h70.9c1.7 0 3.2-1.3 4-2.6.6-1 .7-3.4-.2-5.2l-3.9-7.9c-2-4-7.5-6.8-11.6-7.2-2-.2-5.8-.8-9-1.6-5.8-1.4-6.8-2.3-7.2-2.5-.4-.4-.7-1-.7-1.6 0-2.1.8-4.1 2.2-5.9.1-.1.2-.3.4-.4 5.1-3.9 8.2-10.7 8.2-18-.2-11.9-8-21.5-17.7-21.5z" /></svg>
                                    User:</strong> {entry.question}</p>
                                <p><strong>Answer:</strong> <Markdown>{entry.answer}</Markdown>
                                    <button className='copy-btn' onClick={() => copyToClipboard(index)}>{entry.copy}</button>
                                </p>
                                <button className='edit_button' onClick={() => editEntry(index)}>Edit</button>
                                <button className="delete_button" onClick={() => deleteEntry(index)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="main_content">
                <h1 className="heading">AI Chatbot</h1>
                <form onSubmit={(event) => { event.preventDefault(); generateAnswer(question); }}>
                    <input
                        type="text"
                        required
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='inputBox'
                        placeholder='Ask me anything'
                    />
                    <div className="mic_icon" onClick={handleListen} style={{ backgroundColor: listening ? "red" : "#ECECEC" }}>
                        <svg style={{ marginLeft: "8px", marginRight: "10px", marginTop: "6px", marginBottom: "-7px" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill={listening ? "white" : "currentColor"} className="bi bi-mic" viewBox="0 0 16 16">
                            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
                        </svg>
                    </div>
                    <button className="button-41" role="button" type="Submit">{buttonText}</button>
                    <button className="button-41 clear" role="button" onClick={clearInput}>Clear</button>
                    {loading && <div className="loader"></div>}
                </form>
                <div className='result' ref={answerRef}>
                    {answer?( <div><p><Markdown>{answer}</Markdown></p> {answer && <button onClick={() => setCopy("Copied")}>{copy}</button>}</div> ):(<div className="text-gradient">Hii, {isLoaded && user ? user.fullName : "Loading..."}!<br/>How  can I help you Today?</div>)}
                    
                   
                   
                </div>
            </div>
            </div>
            </SignedIn>
            <SignedOut>
            <div className="containerBox">
            <div className="main_content">
            <SignInButton className="sign_in_button"/>
           {/* <div className="user_login" style={{display:"flex" ,justifyContent:"end", alignItems:"center",gap:"10px",fontSize:"20px",cursor:"pointer"}}   onClick={handleSignIn}>
               
               
                                                        <svg fill="gray" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                                        width="24px" height="24px" viewBox="0 0 43.028 43.028"
                                        xml:space="preserve">
                                 <g>
                                        <path d="M39.561,33.971l-0.145,0.174c-4.774,5.728-11.133,8.884-17.902,8.884c-6.77,0-13.128-3.155-17.903-8.884l-0.144-0.174
                                            l0.034-0.223c0.922-6.014,4.064-10.845,8.847-13.606l0.34-0.196l0.271,0.284c2.259,2.37,5.297,3.674,8.554,3.674
                                            s6.295-1.305,8.554-3.674l0.271-0.284l0.34,0.196c4.783,2.761,7.925,7.592,8.848,13.606L39.561,33.971z M21.514,21.489
                                            c5.924,0,10.744-4.82,10.744-10.744C32.258,4.821,27.438,0,21.514,0S10.77,4.821,10.77,10.744S15.59,21.489,21.514,21.489z"/>
                                    </g>
                                    </svg>Login
                                    
                                    <svg  width="30px" height="30px" viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 3.25C11.5858 3.25 11.25 3.58579 11.25 4C11.25 4.41421 11.5858 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C11.5858 19.25 11.25 19.5858 11.25 20C11.25 20.4142 11.5858 20.75 12 20.75C16.8325 20.75 20.75 16.8325 20.75 12C20.75 7.16751 16.8325 3.25 12 3.25Z" fill="gray"/>
                                        <path d="M10.4697 9.53033C10.1768 9.23744 10.1768 8.76256 10.4697 8.46967C10.7626 8.17678 11.2374 8.17678 11.5303 8.46967L14.5303 11.4697C14.8232 11.7626 14.8232 12.2374 14.5303 12.5303L11.5303 15.5303C11.2374 15.8232 10.7626 15.8232 10.4697 15.5303C10.1768 15.2374 10.1768 14.7626 10.4697 14.4697L12.1893 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H12.1893L10.4697 9.53033Z" fill="gray"/>
                                        </svg>
                                        
                                </div>*/}
                <h1 className="heading">AI Chatbot</h1>
                <form onSubmit={(event) => { event.preventDefault(); generateAnswer(question); }}>
                    <input
                        type="text"
                        required
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='inputBox'
                        placeholder='Ask me anything'
                    />
                    <div className="mic_icon" onClick={handleListen} style={{ backgroundColor: listening ? "red" : "#ECECEC" }}>
                        <svg style={{ marginLeft: "8px", marginRight: "10px", marginTop: "6px", marginBottom: "-7px" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill={listening ? "white" : "currentColor"} className="bi bi-mic" viewBox="0 0 16 16">
                            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
                        </svg>
                    </div>
                    <button className="button-41" role="button" type="Submit">{buttonText}</button>
                    <button className="button-41 clear" role="button" onClick={clearInput}>Clear</button>
                    {loading && <div className="loader"></div>}
                </form>
                <div className='result' ref={answerRef}>
                    {answer?( <div><p><Markdown>{answer}</Markdown></p> {answer && <button onClick={() => setCopy("Copied")}>{copy}</button>}</div> ):(<p className="text-gradient">Hii,<br/>How  can I help you Today?</p>)}
                   
                   
                </div>
            </div>
        </div>
    
            </SignedOut>
       
        </>
        
        
    );
}

export default Homepage;
