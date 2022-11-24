import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { doc, setDoc, collection, getDocs, docs } from "firebase/firestore"
import { db } from '../Firebase'
const MarkdownEditor = ({ toggleCreate, activeNote, setToggleCreate, setNotes }) => {

    const [input, setInput] = useState(""); 
    const [title, setTitle] = useState(""); 

    const getData = async () => {
        const notesRef = collection(db, "notes"); 
        await getDocs(notesRef).then((response) => {
            setNotes(response.docs.map((data) => {
              return {...data.data(), id: data.id}
            })); 
          });
    }

    const saveNote = async () => {
        if (toggleCreate) {
            await setDoc(doc(db, "notes", title), {
                title:title, 
                content: input,
            }); 
            
        } 


        if (!toggleCreate) {
            await setDoc(doc(db, "notes", title), {
                title:title, 
                content: input,
            }); 
            
        }

        setInput("")

        setTitle("")

        getData(); 
        
        setToggleCreate(true)
    }

    

    useEffect(() => {
        if (!toggleCreate) {
            setInput(activeNote.content)
            setTitle(activeNote.title)
        }; 
    }, [toggleCreate])

    



  return (
    <div>
       {input || activeNote ? (
        <div>
       {!toggleCreate ? <h2>{activeNote.title}</h2> : <input placeholder='Title' className="input" value={title} onChange={(e) => {setTitle(e.target.value)}}/>}
        <br />
        <textarea className='textarea' value={input} onChange={(e) => {setInput(e.target.value)}} />
        <br />
        </div>
       ) : ""}
       <button className='full-width-btn' onClick={saveNote}>Save Note</button>
        <hr />
        <ReactMarkdown className="markdown">
        {input}
        </ReactMarkdown>
    </div>
  )
}

export default MarkdownEditor