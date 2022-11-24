import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../Firebase';
const Menu = () => {

    const [notes, setNotes] = useState([]); 

    const getData = async () => {
        const notesRef = collection(db, "notes"); 
        await getDocs(notesRef).then((response) => {
            setNotes(response.docs.map((data) => {
              return {...data.data(), id: data.id}
            })); 
          });
    }

    useEffect(() => {
        getData(); 
    }, []);
  return (
    <div>
        <ul>
            {notes ? (
                notes.map((note) => {
                    return <li key={Math.random()}>{note.title}</li>
                })
            ) : ""}
        </ul>
    </div>
  )
}



export default Menu