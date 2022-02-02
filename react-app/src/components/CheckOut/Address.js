import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAddress, getAddress } from '../../store/address';
import './Address.css'
import EditAddressForm from './EditAddressForm';
import { Modal } from '../../context/Modal';

const Address = ({user_id}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const getUserAddress = useSelector((state) => state.address.address);

  let userAddress;
  if(getUserAddress) {
    userAddress = getUserAddress[0]
  }

  console.log("userAddress",userAddress)

  useEffect(() => {
    dispatch(getAddress(user_id))
  },[dispatch])

  return (
    <>
    <section className="address-container">
      <header className="address-header">
        Shipping Address
      </header>

      <main>
        <ul>
          <li>{userAddress?.full_name}</li>
          <li>{userAddress?.street_address}{userAddress?.apt_suite_other}</li>
          <li>{userAddress?.city}, {userAddress?.state} {userAddress?.zip_code}</li>
          <li>{userAddress?.country}</li>
        </ul>
      </main>

      <div>

      {userAddress?
        <button className="edit-address-btn"
          onClick={() => setShowModal(true)}
          >Edit
        </button>
        : null
    }


        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditAddressForm userAddress={userAddress} user_id={user_id} setShowModal={setShowModal} showModal={showModal} />
          </Modal>
        )}

      </div>
    </section>
    </>
  )

}

export default Address
