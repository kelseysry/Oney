import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCredit } from "../../store/credit";
import { Modal } from '../../context/Modal';
import './Credit.css'
import EditCreditForm from './EditCredit';
import CreditForm from './NewCreditForm';

const Credit = ({user_id}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const getUserCredit = useSelector(((state) => state.credit.credit))

  let userCredit;
  if(getUserCredit) {
    userCredit = getUserCredit[0]
  }

  useEffect(() => {
    dispatch(getCredit(user_id))
  },[dispatch])

  return (
    <>
    {/* <div>Payment method...make ternary if no credit yet</div> */}
    <section className="credit-container">
      <header className="credit-header">
        Credit Card
      </header>

      {
      userCredit?
      <main>
        <ul>
          <li>{userCredit?.full_name}</li>
          <li>{userCredit?.card_number}</li>
          <li>{userCredit?.expiration_date_month}, {userCredit?.expiration_date_year} {userCredit?.security_code}</li>
        </ul>
      </main>
        : null
      }

      <div>

      {userCredit?
        <button className="edit-credit-btn"
          onClick={() => setShowModal(true)}
          >Edit
        </button>
        :
        <button className="edit-credit-btn"
          onClick={() => setShowModal2(true)}
          >Add
        </button>
      }

      {showModal2 && (
        <Modal onClose={() => setShowModal2(false)}>
          <CreditForm user_id={user_id} setShowModal={setShowModal} showModal={showModal}/>
        </Modal>
        )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCreditForm userCredit={userCredit} user_id={user_id} setShowModal={setShowModal} showModal={showModal} />
        </Modal>
      )}

      </div>
    </section>
    </>
  )

}

export default Credit
