import { useState } from "react";

export default function ContactList({ data, reload }) {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const confirmDelete = (id) => setDeleteId(id);

  const del = async () => {
    try {
      await fetch(`https://contact-management-app-2-l2tc.onrender.com/api/contacts/${deleteId}`, { method: "DELETE" });
      setDeleteSuccess(true);
      setDeleteId(null);
      reload();
    } catch {
      alert("Error deleting contact");
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded">
      <h2 className="text-lg font-bold mb-3">Saved Contacts</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c) => (
            <tr key={c._id} className="border-b">
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.message}</td>
              <td>
                <button className="text-red-500" onClick={() => confirmDelete(c._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Popup */}
      {deleteId && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to delete?</p>
            <button onClick={del} className="btn w-full mt-2">
              Yes, Delete
            </button>
            <button onClick={() => setDeleteId(null)} className="btn w-full mt-2 bg-gray-400">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Success Popup */}
      {deleteSuccess && (
        <div className="popup">
          <div className="popup-content">
            <p>Contact deleted successfully!</p>
            <button onClick={() => setDeleteSuccess(false)} className="btn w-full mt-2">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Popup Styles */}
      <style jsx>{`
        .popup {
          position: fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          background:rgba(0,0,0,0.5);
          display:flex;
          justify-content:center;
          align-items:center;
        }
        .popup-content {
          background:white;
          padding:20px;
          border-radius:8px;
          min-width:250px;
          text-align:center;
        }
      `}</style>
    </div>
  );
}
