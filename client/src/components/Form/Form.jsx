import axios from "axios";
import { useState } from "react";
import styles from "./Form.module.css";

function Form({ setData }) {
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidNumber, setValidNumber] = useState(true);

  const handleNumberChange = (event) => {
    if (event.target.value.length > 8) return;
    const input = event.target.value.replace(/-/g, ""); // Удаляем все существующие дефисы
    let formattedInput = "";

    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 2 === 0) {
        formattedInput += "-";
      }
      formattedInput += input[i];
    }

    setNumber(formattedInput);
    setValidNumber(validateNumber(formattedInput));
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setValidEmail(validateEmail(inputEmail));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validateNumber = (number) => {
    const phoneNumberRegex = /^(\d{2}-\d{2}-\d{2})?$/;
    return phoneNumberRegex.test(number);
  };

  const handleSubmit = async () => {
    if (!isValidEmail) {
      alert("Email is not Valid");
      return;
    }
    if (!isValidNumber) {
      alert("Number is not valid");
      return;
    }
    alert("success");
    const newNumber = number.replace(/-/g, ""); // Удаляем все существующие дефисы
    try {
      if (!newNumber) {
        const res = await axios.get(`http://localhost:5000/api/email/${email}`);
        setData(res.data);
      } else {
        const res = await axios.get(
          `http://localhost:5000/api/find?email=${email}&number=${newNumber}`
        );
        setData(res.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert(error.response.data.error);
        setData([]);
      }
    }
  };
  return (
    <div className={styles.container}>
      <article>
        <div className={styles.inputSection}>
          <label htmlFor="email">Enter Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="number">Enter Number</label>

          <input
            value={number}
            type="tel"
            id="number"
            placeholder="Number"
            onChange={handleNumberChange}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </article>
    </div>
  );
}

export default Form;
