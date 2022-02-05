import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createCredit, editCredit, getCredit } from '../../store/credit';

const CreditForm = ({user_id, setShowModal, showModal}) => {

  const dispatch = useDispatch();

  const [full_name, setFull_name] = useState('')
  const [card_number, setCardNumber] = useState('')
  const [expiration_date_month, setExpirationDateMonth] = useState('1')
  const [expiration_date_year, setExpirationDateYear] = useState('1')
  const [security_code, setSecurityCode] = useState('')
  const [validationErrors, setValidationErrors] = useState([]);
  const [errors, setErrors] = useState([]);

  function checkIfNumeric(number) {
    return number === +number && number === (number|0);
  }


  console.log("expiration_date_month", typeof(expiration_date_month))

  const validate = () => {

    const validationErrors = [];

    if(full_name.length < 4) {
      validationErrors.push("Full name must be at least 4 characters")
    } else if (full_name.length >= 20) {
      validationErrors.push("Full name must be less than 60 characters")
    }

    if(card_number.length !== 16) {
      validationErrors.push("Card number must be at least 16 numbers")
    } else if(!card_number.match(/^[0-9]+$/) ) {
      validationErrors.push("Card number must be integers")
    }

    if(security_code.length > 4) {
      validationErrors.push("Security code must be at least 4 numbers")
    } else if (security_code.length <3) {
      validationErrors.push("Security code be at least 3 numbers")
    } else if(!checkIfNumeric(parseInt(security_code))) {
      validationErrors.push("Card number must be integers")
    }
    return validationErrors
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const frontErrors = validate();

    // If we have validation frontErrors...
    if (frontErrors.length > 0) setValidationErrors(frontErrors);

    if (frontErrors.length === 0) {

      console.log("expiration_date_month",expiration_date_month)
      // expiration_date_month = String(expiration_date_month)
      // expiration_date_year = String(expiration_date_year)
      const newUserCredit = {full_name, card_number, expiration_date_month, expiration_date_year, security_code, user_id}

      const updated = await dispatch(createCredit(newUserCredit, user_id));
      if (updated) {
        dispatch(getCredit(user_id))
        setShowModal(false)
      }
    }
  };


  return (
    <form className="address-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        value={full_name}
        onChange={(e) => setFull_name(e.target.value)}
      >
      </input>
      <input
        type="text"
        placeholder="card_number"
        value={card_number}
        onChange={(e) => setCardNumber(e.target.value)}
      >
      </input>
      <label>Expiration Month</label>
      <select
        type="text"
        // placeholder="Expiration Date Month"
        value={expiration_date_month}
        onChange={(e) => setExpirationDateMonth(String(e.target.value))}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
      <label>Expiration Year</label>
      <select
        type="text"
        value={expiration_date_year}
        onChange={(e) => setExpirationDateYear(String(e.target.value))}
      >
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
        <option value="2029">2029</option>
        <option value="2030">2030</option>
      </select>

      <input
        type="text"
        placeholder="Security Code"
        value={security_code}
        onChange={(e) => setSecurityCode(e.target.value)}
      >
      </input>


      {validationErrors.length?
      <>
        <div className="errors-hr"></div>
        <ul className="error-signup">
            {validationErrors.map((error) => <li key={error}>{error}</li>)}
            {errors.map((error, idx) =>
            <li key={idx}>{(error.split(':'))[1]}</li>
            )}
        </ul>
      </>
      : null
      }

      <div className="center-signup-button">
        <button className="login-button" type='submit'>Submit</button>
      </div>


    </form>
  )

}

export default CreditForm
