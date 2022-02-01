import { useEffect } from 'react'
import './Address.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAddress } from '../../store/address';

const Address = ({user_id}) => {
  const dispatch = useDispatch();
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
          <li>{userAddress.full_name}</li>
          <li>{userAddress.street_address}{userAddress?.apt_suite_other}</li>
          <li>{userAddress.city}, {userAddress.state} {userAddress.zip_code}</li>
          <li>{userAddress.country}</li>
        </ul>
      </main>

      <div>
        <button className="edit-address-btn">Edit</button>
      </div>
    </section>
    </>
  )

}

export default Address
