import React, { useState, useEffect , useRef} from 'react'
import "./homepage.css"
import axios from 'axios'

function Homepage() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copy, setCopy] = useState("Copy");

    const answerRef = useRef(null);

    // Load history from localStorage on component mount
    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('chatHistory'));
        if (savedHistory) {
            setHistory(savedHistory);
        }
    }, []);

    // Save history to localStorage whenever it updates
    useEffect(() => {
        localStorage.setItem('chatHistory', JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        if (answerRef.current) {
            answerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [answer]);

    async function generateAnswer() {
        setLoading(true);
        setAnswer("loading... it might take up to 10 seconds");
        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCSadOLBV8AtwkeBQwXMsAfWv6vbeLpFzI`,
                method: "post",
                data: {
                    contents: [
                        {
                            parts: [{ text: question }]
                        },
                    ],
                },
            });

            let generatedAnswer = response.data.candidates[0].content.parts[0].text;
            generatedAnswer = generatedAnswer.replace(/\*\*/g, ''); // Remove double asterisk signs
            setAnswer(generatedAnswer);
            setHistory([{ question, answer: generatedAnswer }, ...history]);
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
    }

    function copyToClipboard() {
        if (copy === "Copy") {
            setCopy("Copied");
        } else {
            setCopy("Copy");
        }

        navigator.clipboard.writeText(answer).then(() => {
            console.log("Answer copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    }

    function clearHistory() {
        setHistory([]);
        localStorage.removeItem('chatHistory');
    }


    function clearInput() {
        setQuestion("");
        setAnswer("");
    }

    return (
        <div className="container_box">
            <div className="sidebar">
                <h2>History</h2>
                <button className="clear_button" onClick={clearHistory}>Clear History</button>
                <ul>
                    {history.map((entry, index) => (
                        <li key={index}>
                            <p><strong>Q:</strong> {entry.question}</p>
                            <p><strong>A:</strong> {entry.answer}<br/>
                            <button className='copy-btn' onClick={copyToClipboard}>{copy}</button>
                            </p>
                            <button className='edit_button' onClick={() => editEntry(index)}>Edit</button>
                            <button className="delete_button" onClick={() => deleteEntry(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="main_content">
                <h1 className="heading">AI Chatbot</h1>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className='inputBox'
                    placeholder='Ask me anything'
                />
                <button className="button-41" role="button" onClick={generateAnswer}>Generate</button>
                <button className="button-41 clear" role="button" onClick={clearInput}>Clear</button>
                {loading && <div className="bars"></div>}
                <div className='result' ref={answerRef}>
                    <p>{answer}</p>
                    {answer && <button onClick={copyToClipboard}>{copy}</button>}
                </div>
            </div>
        </div>
    );
}

export default Homepage;
