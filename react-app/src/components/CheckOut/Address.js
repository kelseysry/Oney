

const Address = ({userAddress}) => {

  console.log("userAddress",userAddress)

  return (
    <>
    <div>Shipping Address...make ternary if no shipping address yet</div> <span>Edit</span>
    <div>{userAddress.street_address}</div>

    </>
  )

}

export default Address
