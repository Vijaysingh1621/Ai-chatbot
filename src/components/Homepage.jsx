import "regenerator-runtime/runtime";
import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './homepage.css';
import axios from 'axios';
import Markdown from 'react-markdown';
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton,useSignIn ,useUser} from "@clerk/clerk-react";
import UserPage from "../userPage/UserPage";
import { Button } from "antd";
import Card from "./cards/Card";
import { FaBars } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import gemeni from "../assets/gemeni.png"



function Homepage() {
    const { isLoaded, } = useSignIn();
    const { isSignedIn, user } = useUser();

    
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
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

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
        setIsOpen(false)
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
        setButtonText("Generate")
        resetTranscript();
    }

    return (<>
        <SignedIn>
            
        <div className="container_box">
            
        <div className="sidebar-toggle-btn">
                <button style={{border:"none",}} onClick={toggleSidebar}>
                    {isOpen ? <CgClose size={24} color="black" /> : <FaBars size={24} color="black" />}
                </button>
                {isOpen?<div className="nav_background" >
                    <button style={{border:"none"}}  onClick={toggleSidebar}>
                    {isOpen ? <CgClose size={24} color="black" /> : null}
                </button>

                <h2 style={{marginTop:"20px"}}>History</h2>
                
                <button className="clear_button" onClick={clearHistory}>Clear History</button>
                </div>:null}
            </div>
            
            <div className="user_info">
            <div  style={{ fontSize:"22px",fontWeight:"500", display:"flex", justifyContent:"end", alignItems:"center",gap:"10px",paddingBottom:"15px",paddingRight:"30px"}}> {isLoaded && user ? user.fullName : "Loading..."}<UserButton/><SignOutButton><Button danger>Log Out</Button></SignOutButton></div>
            </div>
            <div className={`sidebar-container ${isOpen ? 'sidebar-visible' : 'sidebar-hidden'}`}>
            <div className="sidebar_for_mobile">
                
                <div className="history_record">
                    <ul>
                        {history.map((entry, index) => (
                            <li key={index}>
                                <p>
                                <img style={{borderRadius:"50%", height:"30px",width:"30px",marginTop:"20px" ,marginRight:"10px"}} src={isLoaded && user?user.imageUrl:null} alt="Profile" />{entry.question}</p>
                                <p><img src={gemeni} height="24px" width="24px"></img> <Markdown>{entry.answer}</Markdown>
                                    <button className='copy-btn' onClick={() => copyToClipboard(index)}>{entry.copy}</button>
                                </p>
                                <button className='edit_button' onClick={() => editEntry(index)}>Edit</button>
                                <button className="delete_button" onClick={() => deleteEntry(index)}>Delete</button>
                            </li>
                        ))}
                        </ul>
                    
                </div>
            </div>
            </div>
            <div className="sidebar">
            <div  style={{ fontSize:"22px",fontWeight:"500", display:"flex", justifyContent:"start", alignItems:"center"}}> {isLoaded && user ? user.fullName : "Loading..."}<UserButton/><SignOutButton><Button danger>Log Out</Button></SignOutButton></div>
                <h2>History</h2>
                
                <button className="clear_button" onClick={clearHistory}>Clear History</button>
                <div className="history_record">
                    <ul>
                        {history.map((entry, index) => (
                            <li key={index}>
                                <p>
                                <img style={{borderRadius:"50%", height:"30px",width:"30px",marginTop:"10px"}} src={isLoaded && user?user.imageUrl:null} alt="Profile" /> {entry.question}</p>
                                <p>
                                <img src={gemeni} height="24px" width="24px"></img>
                                     <Markdown>{entry.answer}</Markdown>
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
                    
                </form>
                <div className='result' ref={answerRef}>
                                        {answer?( <div> <img src={gemeni} height="24px" width="24px"></img>{loading && <div class="loader-container">
                                                        <div class="loading-bar"></div>
                                                        <div class="loading-bar"></div>
                                                        <div class="loading-bar"></div>
                                                </div>}
                                            
                                            <p>
                                            <Markdown>{answer}</Markdown></p> {answer && <button onClick={() => setCopy("Copied")}>{copy}</button>}</div> ):(<div className="text-gradient">Hii, {isLoaded && user ? user.firstName : "Loading..."}!<svg style={{margin:"10px",marginBottom:"-4px"}} version="1.1" viewBox="0 0 2048 2048" width="32px" height="32px" xmlns="http://www.w3.org/2000/svg">
                    <path transform="translate(929)" d="m0 0h12l23 3 17 4 15 5 16 8 13 8 10 8 10 9 8 8 12 16 10 18 7 18 5 22 1 11v877l2-1 6-24 15-51 56-196 33-115 42-147 29-101 25-87 17-58 8-23 8-16 10-14 11-13 12-11 14-10 18-10 15-6 19-5 11-2 12-1h14l17 2 21 5 15 6 19 10 14 10 13 12 9 10 10 15 8 14 8 21 5 21 2 26-2 20-3 15-8 31-19 71-26 97-12 44-10 38-23 86-25 93-20 75-19 71-13 48-20 75-13 48-7 26-1 16v159l2 21 4 11 7 12 8 9 14 9 12 5 8 2h21l14-4 11-6 12-11 12-13 12-14 11-13 9-10 9-11 9-10 9-11 8-9 7-8 24-28 10-11 9-11 9-10 9-11 8-9 7-8 12-14 12-13 7-7 11-9 13-11 19-13 19-12 22-12 25-11 36-12 25-6 28-5 11-1h47l16 3 16 6 17 9 14 11 10 10 9 12 9 16 6 18 4 17v29l-5 20-8 19-8 13-10 13-15 16-12 12-7 8-17 17-7 8-13 13-7 8-12 12-1 2h-2l-2 4-18 18-1 2h-2l-2 4-19 19-1 2h-2l-2 4-15 15-7 8-13 13-7 8-13 13-1 2h-2l-2 4-21 21-7 8-13 13-7 8-12 12-1 2h-2l-2 4-17 17-7 8-17 17-7 8-13 13-7 8-14 14-7 8-15 15-7 8-17 17-7 8-11 11-7 8-14 14-1 2h-2l-2 4-16 16-7 8-18 18-7 8-13 13-7 8-14 14-7 8-13 13-1 2h-2l-2 4-19 19-1 2h-2l-2 4-15 15-7 8-13 13-7 8-24 24-8 7-12 11-11 9-15 12-18 13-24 16-20 12-23 13-26 13-30 13-30 11-30 9-36 9-33 6-41 5-27 2h-158l-39-3-37-5-34-7-36-10-32-11-26-11-33-16-25-14-25-16-19-14-16-12-15-13-14-12-35-35-9-11-9-10-10-13-14-19-12-18-10-16-12-21-9-17-13-29-13-34-11-36-7-30-6-34-3-27-2-34-2-63-3-38-5-39-6-34-8-37-8-30-10-33-10-29-12-30-14-32-9-19-10-19-13-24-14-24-120-208-14-24-16-28-14-24-10-18-8-18-7-25v-38l7-24 7-17 9-15 13-17 7-7 13-10 13-8 15-7 20-6 19-2h18l18 2 18 5 14 6 15 9 16 13 9 9 13 18 16 28 14 24 15 26 28 48 15 26 14 24 15 26 28 48 15 26 14 24 15 26 12 21 30 52 14 24 12 21 6 10-2-9-10-36-26-97-20-74-24-89-25-93-20-74-12-44-11-42-15-56-17-65-14-57-5-26-1-7v-22l4-21 7-21 12-23 14-19 14-14 13-10 15-9 18-8 23-6 17-2h21l23 3 19 5 18 8 15 9 13 10 12 11 11 14 9 14 8 16 8 24 21 79 22 82 26 97 20 75 25 93 27 101 17 63 9 34 24 88v-813l1-40 2-16 5-18 7-17 10-17 13-17 6-7 8-7 13-10 13-8 14-7 20-7z" fill="#FCDDC4"/>   
                                            </svg><br/>How  can I help you Today?</div>)}
                                            </div>

                {answer?null:<Card generateAnswer={generateAnswer} setQuestion={setQuestion}/>}

            </div>
            </div>
            </SignedIn>
            <SignedOut>
                        <UserPage/>
                       
            </SignedOut>
       
        </>
        
        
    );
}

export default Homepage; 
