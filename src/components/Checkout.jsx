import Modal from "../UI/Modal"
import { useContext } from "react"
import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/CartContex";
import Input from "../UI/input";
import Button from "../UI/Button";
import userProgressContext from "../store/UserProgressContext";
import { use } from "react";
export default function Checkout(){
const cartCtx=useContext(CartContext);
const cartTotal=cartCtx.items.reduce((totalPrice,item)=>totalPrice+item.quantity*item.price,0);

const userProgressCtx=useContext(userProgressContext);

function handleClose(){
    userProgressCtx.hideCheckout();
}

return <Modal open={userProgressCtx.progress==="checkout"} onClose={handleClose}>
<form >
<h2>Checkout</h2>
<p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
<Input label="Full Name" type="text" id="full-name"/>
<Input label="E-Mail Address" type="email" id="email"/>
<Input label="Street" type="text" id="Street"/>

<div className="control-row" >
<Input label="Postal Code" type="text" id="postal-code"/>
<Input label="City" type="text" id="city"/>
</div>

<p className="modal-actions">
    <Button textOnly={true}  type="button" onClick={handleClose}> Close</Button>
    <Button textOnly={false}> Submit Order</Button>
     </p>
</form>

</Modal>

}