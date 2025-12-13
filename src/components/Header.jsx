import { useContext } from 'react';
import logoImg from '../assets/logo.jpg'
import Button from '../UI/Button';
import CartContext from '../store/CartContex';
import userProgressContext from '../store/UserProgressContext';
export default function Header(){
const cartCtx=useContext(CartContext);
const userProgressCtx= useContext(userProgressContext);
const totalCartItems = cartCtx.items.reduce((totalNumber, item) => {
    return totalNumber + parseInt(item.quantity);
}, 0);

function handleShowCart(){
userProgressCtx.showCart();

}

return(
<header id="main-header">
<div id="title">
    <img src={logoImg}/>
    <h1>React food </h1>
</div>
<nav>
<Button textOnly={true} onClick={handleShowCart} >Cart({totalCartItems})</Button>
</nav>


</header>
);

}