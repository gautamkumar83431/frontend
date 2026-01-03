import { useState } from "react";

export default function ContactForm({ reload }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Validate fields dynamically
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (form.phone && !/^\d{10}$/.test(form.phone)) errs.phone = "Phone must be 10 digits";
    if (!form.email.trim()) errs.email = "Email is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email format";
    return errs;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      const res = await fetch("https://contact-management-app-2-l2tc.onrender.com/api/contacts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
      setSuccess(true);
      reload();
    } catch {
      alert("Error submitting contact");
    }
  };

  return (
    <>
      <form onSubmit={submit} className="bg-white shadow p-4 rounded mb-6">
        <h2 className="text-lg font-bold mb-3">Add Contact</h2>

        <input
          placeholder="Name"
          className="input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          placeholder="Email"
          className="input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          placeholder="Phone"
          className="input"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <textarea
          placeholder="Message"
          className="input"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button type="submit" className="btn mt-2 w-full">
          Submit
        </button>
      </form>

      {success && (
        <div className="popup">
          <div className="popup-content">
            <p>Contact submitted successfully!</p>
            <button onClick={() => setSuccess(false)} className="btn mt-2 w-full">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Popup Styles */}
      <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          min-width: 250px;
          text-align: center;
        }
      `}</style>
    </>
  );
}
