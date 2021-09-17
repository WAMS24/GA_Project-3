import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { getCart } from "../../services/users";
import CartJam from "../../components/CartJam/CartJam";
import Button from "react-bootstrap/Button";
import "./Cart.css"
import { clearCart } from "../../services/users";
import { useHistory } from "react-router";

export default function Cart(props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [cart, setCart] = useState([])
  const [toggleFetch, setToggleFetch] = useState(false)

  const history = useHistory()

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart(props.user.id)
      setCart(cart)
      setIsLoaded(true)
    }
    if (props.user) {
      fetchCart()
    }
  }, [props.user, toggleFetch])

  if(!isLoaded) {
    return(
      <Layout>
        <h1>issue</h1>
      </Layout>
    )
  }

  const handleClear = async () => {
    const clear = await clearCart(props.user.id);
    if (clear) {
      alert("cart cleared")
      history.push("/")
    }
  }

  return(
    <Layout user={props.user}>
      <div className="clear-btn-container">
        <Button variant="outline-danger" id="clear-btn" className="clear-cart" onClick={handleClear}>
          Clear Cart
        </Button>
      </div>
      <div className="cart-jams">
        {cart.length === 0 ? <h1>Cart is empty!</h1> : null}
        <div className="jams-container">
          {cart.map((cartItem, index) => <>
            <CartJam jam={cartItem.jamId} quantity={cartItem.quantity} key={index} user={props.user} setToggleFetch={setToggleFetch}/>
          </>
          )}
        </div>
      </div>
    </Layout>
  )
}