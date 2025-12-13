import Modal from "../UI/Modal"
import CartContext from "../store/CartContex"
import { useContext } from "react"
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";
import userProgressContext from "../store/UserProgressContext";

export default function Cart(){
const cartCtx=useContext(CartContext);
const userProgressCtx=useContext(userProgressContext);
const cartTotal=cartCtx.items.reduce((totalPrice,item)=>totalPrice+item.quantity*item.price,0);

function closeModal(){
userProgressCtx.hideCart();

}


return <Modal className="cart" open={userProgressCtx.progress==='cart'}>

<h2> Your Cart</h2>
<ul>
{
    cartCtx.items.map((item)=>{
        return(
<li key={item.id}>
{item.name}-{item.quantity}

</li>
        );
    })
}
</ul>

<p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
<p className="modal-actions">
<Button textOnly={true} onClick={closeModal}> close</Button>
<Button textOnly={false}>Go to CheckOut</Button>
</p>

</Modal>
    
}