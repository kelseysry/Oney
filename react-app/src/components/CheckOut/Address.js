import './Address.css'

const Address = ({userAddress}) => {

  console.log("userAddress",userAddress)

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
