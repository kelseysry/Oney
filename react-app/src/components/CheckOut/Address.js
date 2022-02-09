import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAddress, getAddress } from '../../store/address';
import './Address.css'
import EditAddressForm from './EditAddressForm';
import { Modal } from '../../context/Modal';
import NewAddressForm from './NewAddressForm';

const Address = ({user_id}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

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

      {
      userAddress?
      <main className="shipping-address-details">
        <ul>
          <li>{userAddress?.full_name}</li>
          <li>{userAddress?.street_address}{userAddress?.apt_suite_other}</li>
          <li>{userAddress?.city}, {userAddress?.state} {userAddress?.zip_code}</li>
          <li>{userAddress?.country}</li>
        </ul>
      </main>
        : null
      }

      <div>

      {userAddress?
        <button className="edit-address-btn"
          onClick={() => setShowModal(true)}
          >Edit
        </button>
        :
        <button className="edit-address-btn"
          onClick={() => setShowModal2(true)}
          >Add
        </button>
      }

      {showModal2 && (
        <Modal onClose={() => setShowModal2(false)}>
          <NewAddressForm user_id={user_id} setShowModal2={setShowModal2} showModal2={showModal2} />
        </Modal>
        )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          Hello
          <EditAddressForm userAddress={userAddress} user_id={user_id} setShowModal={setShowModal} showModal={showModal} />
        </Modal>
      )}

      </div>
    </section>
    </>
  )

}

export default Address
