import "regenerator-runtime/runtime";
import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './homepage.css';
import axios from 'axios';
import Markdown from 'react-markdown';

function Homepage() {
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

    return (
        <div className="container_box">
            <div className="sidebar">
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
                    {loading && <div class="loader"></div>}
                </form>
                <div className='result' ref={answerRef}>
                    {answer?( <div><p><Markdown>{answer}</Markdown></p> {answer && <button onClick={() => setCopy("Copied")}>{copy}</button>}</div> ):(<p className="text-gradient">Hii,<br/>How  can I help you Today?</p>)}
                   
                   
                </div>
            </div>
        </div>
    );
}

export default Homepage;
