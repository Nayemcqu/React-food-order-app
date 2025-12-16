import Modal from "../UI/Modal"
import { useContext } from "react"
import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/CartContex";
import Input from "../UI/input";
import Button from "../UI/Button";
import userProgressContext from "../store/UserProgressContext";
import { use } from "react";
import UseHttp from "../hooks/useHttp";
import Error from "./Error";
const requestConfig={
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    }
    
}
export default function Checkout(){
const cartCtx=useContext(CartContext);
const cartTotal=cartCtx.items.reduce((totalPrice,item)=>totalPrice+item.quantity*item.price,0);
const userProgressCtx=useContext(userProgressContext);

const {data,isLoading:isSending,error,sendRequest,clearData}=UseHttp('http://localhost:3000/orders',requestConfig);

function handleClose(){
    userProgressCtx.hideCheckout();
}

function handleFinish(){
 userProgressCtx.hideCheckout();
 cartCtx.clearCart();
clearData();
}

function handleSubmit(e){
    e.preventDefault();
const fd=new FormData(e.target);
const CustomerData=Object.fromEntries(fd.entries());

sendRequest(JSON.stringify({
    order:{
        items:cartCtx.items,
        customer:CustomerData
    }
}));



}

let actions=(
<>
<Button textOnly={true}  type="button" onClick={handleClose}> Close</Button>
    <Button textOnly={false}> Submit Order</Button>
</>

);


if(isSending){
    actions=<span>Sending order data...</span>
}

if(data && !error){
return <Modal open={userProgressCtx.progress==='checkout'} onClose={handleFinish}>

<h2>Success!</h2>
<p> your order was submitted successfully</p>
<p>we will get back to you with more details via email withing the next few minutes.</p>
<p className="modal-actions">

    <Button onClick={handleFinish}> okay</Button>
</p>
</Modal>
    
}

return <Modal open={userProgressCtx.progress==="checkout"} onClose={handleClose}>
<form onSubmit={handleSubmit}>
<h2>Checkout</h2>
<p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
<Input label="Full Name" type="text" id="name"/>
<Input label="E-Mail Address" type="email" id="email"/>
<Input label="Street" type="text" id="street"/>

<div className="control-row" >
<Input label="Postal Code" type="text" id="postal-code"/>
<Input label="City" type="text" id="city"/>
</div>

{error && <Error title="Failed to submit order" message={error}> </Error>}


<p className="modal-actions">
   {actions}
     </p>
</form>

</Modal>

}