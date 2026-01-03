import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { useEffect, useState } from "react";

export default function App(){
  const [contacts,setContacts] = useState([]);

  const loadContacts = async () => {
    const res = await fetch("https://contact-management-app-2-l2tc.onrender.com/api/contacts/");
    setContacts(await res.json());
  };

  useEffect(()=>{ loadContacts(); },[]);

  return (
    <>
      <Navbar/>
      <div className="container">
        <ContactForm reload={loadContacts}/>
        <ContactList data={contacts} reload={loadContacts}/>
      </div>
      <Footer/>
    </>
  );
}