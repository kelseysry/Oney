import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createAddress, editAddress, getAddress } from '../../store/address';

const NewAddressForm = ({user_id, setShowModal2, showModal2}) => {

  const dispatch = useDispatch();

  const [full_name, setFull_name] = useState('')
  const [country, setCountry] = useState('')
  const [street_address, setStreetAddress] = useState('')
  const [apt_suite_other, setAptSuiteOther] = useState('')
  const [zip_code, setZipCode] = useState('')
  const [city,setCity] = useState('')
  const [state, setState] = useState('')
  const [validationErrors, setValidationErrors] = useState([]);
  const [errors, setErrors] = useState([]);

  function checkIfNumeric(number) {
    return number === +number && number === (number|0);
  }

  function checkIfPositiveNumber(number) {
    if(number <= 0 ) {
      return true
    }
  }

  const validate = () => {

    const validationErrors = [];

    if(full_name.length < 4) {
      validationErrors.push("Full name must be at least 4 characters")
    } else if (full_name.length >= 20) {
      validationErrors.push("Full name must be less than 60 characters")
    }
    if(country.length < 4) {
      validationErrors.push("Country name must be at least 4 characters")
    } else if (country.length >= 61) {
      validationErrors.push("Country name must be less than 60 characters")
    }
    if(!street_address) {
      validationErrors.push("Please provide a street address")
    }
    if(!(zip_code)) {
      validationErrors.push("Zip_code is required")}
    else if (!checkIfNumeric(parseInt(zip_code))) {
      validationErrors.push("Please use integers for your zip code")
    } else if (checkIfPositiveNumber(zip_code)) {
      validationErrors.push("Please use positive integers for your zip code")
    }
    if(city.length < 4) {
      validationErrors.push("City name must be at least 4 characters")
    } else if (city.length >= 61) {
      validationErrors.push("City name must be less than 60 characters")
    }
    if(!state) {
      validationErrors.push("State is required")
    } else if (city.length >= 61) {
      validationErrors.push("State name must be less than 60 characters")
    }
    return validationErrors
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const frontErrors = validate();

    // If we have validation frontErrors...
    if (frontErrors.length > 0) setValidationErrors(frontErrors);

    if (frontErrors.length === 0) {

      const newUserAddress = {full_name, country, street_address, apt_suite_other, zip_code, city, state, user_id}

      const updated = await dispatch(createAddress(newUserAddress));
      if (updated) {
        dispatch(getAddress(user_id))
        setShowModal2(false)
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
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
      </input>
      <input
        type="text"
        placeholder="Street Address"
        value={street_address}
        onChange={(e) => setStreetAddress(e.target.value)}
      >
      </input>
      <input
        type="text"
        placeholder="Apt / Suite / Other"
        value={apt_suite_other}
        onChange={(e) => setAptSuiteOther(e.target.value)}
      >
      </input>
      <input
        type="text"
        placeholder="Zip Code"
        value={zip_code}
        onChange={(e) => setZipCode(e.target.value)}
      >
      </input>
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
      </input>
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
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

export default NewAddressForm
