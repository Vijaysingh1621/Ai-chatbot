import React, { useState } from 'react'
import "./homepage.css"
import axios from 'axios'

function Homepage() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    async function generateAnswer() {
        setLoading(true);
        setAnswer("loading...");
        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA2qUJ3gyxvHndb_tSk2uiVOoaaTInqutI",
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
        setHistory(history.filter((_, i) => i !== index));
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(answer).then(() => {
            alert("Answer copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    }

    return (
        <div className="container_box">
            <div className="sidebar">
                <h2>History</h2>
                <ul>
                    {history.map((entry, index) => (
                        <li key={index}>
                            <p><strong>Q:</strong> {entry.question}</p>
                            <p><strong>A:</strong> {entry.answer}</p>
                            <button onClick={() => editEntry(index)}>Edit</button>
                            <button onClick={() => deleteEntry(index)}>Delete</button>
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
                    placeholder='Ask anything'
                />
                <button className="button-41" role="button" onClick={generateAnswer}>Generate</button>
                {loading && <div className="lds-facebook"><div></div><div></div><div></div></div>}
                <div className='result'>
                    <p><strong>{answer}</strong></p>
                    {answer && <button onClick={copyToClipboard}>Copy</button>}
                </div>
            </div>
        </div>
    );
}

export default Homepage;
