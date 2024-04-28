/* eslint-disable react/prop-types */
// import { useUser } from "./UserContext";
import "./Card.css";
import { useState } from "react";

function CardPop({ onSave, user }) {
  //   const { updateUser } = useUser();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    title: user.title,
    status: user.status,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);

    console.log(formData);
    // eslint-disable-next-line react/prop-types
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          />
        </label>
        <div className="button-container">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default CardPop;
