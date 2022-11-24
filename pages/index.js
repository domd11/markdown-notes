import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from './MarkdownEditor';
import Menu from './Menu'
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../Firebase';
function App() {
  const [toggleCreate, setToggleCreate] = useState(true); 
  const [notes, setNotes] = useState([]); 

  const [activeNote, setActiveNote] = useState([]);   


  const setCreate = () => {
    setToggleCreate(!toggleCreate); 
  }

  const getData = async () => {
    const notesRef = collection(db, "notes"); 
    await getDocs(notesRef).then((response) => {
      setNotes(response.docs.map((data) => {
        return {...data.data(), id: data.id}
      })); 
    });
  }

  const deleteNote = async (note) => {
    await deleteDoc(doc(db, "notes", note.title))

    getData();
  }

  const getActiveNote = async (note) => {
    const docsRef = doc(db, "notes", note.title)
    const docSnap = await getDoc(docsRef); 

    setActiveNote(docSnap.data()); 
    
    setToggleCreate(false)
  }

useEffect(() => {
    getData(); 
}, []);

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Markdown Editor</h1>

      <p><strong>Must press save after clicking each title.</strong></p>
      

      <ul>
        {notes ? (
          notes.map((note) => {
            return <div key={Math.random()} onClick={() => getActiveNote(note)}><li>{note.title}</li><button onClick={() => deleteNote(note)}>Delete</button></div>
          })
        ) : ""}
      </ul>


      <MarkdownEditor toggleCreate={toggleCreate} setToggleCreate={setToggleCreate}  activeNote={activeNote} setNotes={setNotes} />
    </div>
  ); 
}

export default App;
