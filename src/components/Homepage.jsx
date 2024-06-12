import React, { useState } from 'react'
import "./homepage.css"
import axios from 'axios'


function Homepage() {
    const [question, setQuestion]=useState("");
    const [answer, setAnswer]=useState("");
    const [loader, setLoader]=useState("false")


    async function generateAnswer(){
      setAnswer("loading...")
       const response= await axios({
        url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA2qUJ3gyxvHndb_tSk2uiVOoaaTInqutI",
        method:"post",
        data:{
            contents:[
                {
                    parts:[{text:question}]
                },
            ],
        },

        });
        setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text'])
    }
  return (
    <>
    <div className="container_box">
        <h1 className="heading">AI Chatbot</h1>
        <textarea ty value={question} onChange={(e)=>setQuestion(e.target.value)} rows="10" cols={40} className='textarea' placeholder='ask anything'>

        </textarea>
        
        <button class="button-41" role="button" onClick={generateAnswer}>generate</button>

        <div class="lds-facebook"><div></div><div></div><div></div></div>
        
        <p className='result'>{answer}</p>

    </div>
    </>
  )
}

export default Homepage