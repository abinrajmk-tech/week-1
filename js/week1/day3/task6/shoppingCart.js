// Task 6 (50 min) - Shopping Cart - Immutable + Observer​
// ​382.​
// ​Build Cart with addItem, removeItem, updateQuantity, applyCoupon, getTotal - every method​
// ​returns a NEW Cart, never mutates current one​
// ​383.​ ​Implement observer: addObserver(fn) registers a listener, notifyObservers() calls all after each​
// ​change​
// ​384.​ ​Render cart to the DOM. Subscribe a render function - it re-renders on every state change.​
// ​385.​
// ​Persist to localStorage. Restore on page load. Add undo() with a history stack.

class Cart {
    constructor(stack, ...items) {
        this.items = items.flat(1);
        stack.push(this.items);
        this.stack = stack;
        listener.notifyObserver(this.items);
    }
    addItem(item) {
        let newCart = structuredClone(this.items);
        newCart.push(item);
        console.log("newCart", item);
        return new Cart(this.stack, newCart);
    }
    removeItem(itemId) {
        let newCart = structuredClone(this.items);
        return new Cart(
            this.stack,
            newCart.filter((item) => item.id != itemId)
        );
    }
    updateQuantity(itemId, quantity) {
        let newCart = structuredClone(this.items);
        for (let item of newCart) {
            if (item.id === itemId) {
                item.quantity = quantity;
                break;
            }
        }
        return new Cart(this.stack, newCart);
    }
    getTotal() {
        let total = 0;
        for (let item of this.items) {
            total += item.price * item.quantity;
        }
        return total;
    }
    applyCoupon(coupon) {
        let total = this.getTotal();
        let discountPrice = total - (total * coupon) / 100;
        return discountPrice;
    }
    undo() {
        let copy = this.stack["stack"];
        copy.pop();
        let previousState = copy.pop();
        return new Cart(this.stack);
    }
}
class Subject {
    constructor() {
        this.observers = [];
    }
    addObserver(fn) {
        this.observers.push(fn);
    }
    notifyObserver(data) {
        this.observers.forEach((observer) => {
            observer(data);
        });
    }
}
class Stack {
    stack = [];
    push(element) {
        this.stack.push(element);
    }
    display() {
        for (let element of this.stack) {
            console.log(element);
        }
    }
}
function render(items) {
    const cartItems = document.querySelectorAll(".cart div");
    console.log(cartItems);
    for (let item of cartItems) {
        item.remove();
    }
    console.log(items);
    if (!items[0]) return;
    for (let item of items) {
        const cartItem = document.createElement("div");
        cartItem.textContent = `id: ${item["id"]} quantity: ${item.quantity} price:${item.price}`;
        shoppingCart.appendChild(cartItem);
        localStorage.setItem("cart", JSON.stringify(items));
    }
}

const item = {
    id: 1,
    quantity: 4,
    price: 300,
};
const shoppingCart = document.querySelector(".cart");
const listener = new Subject();
listener.addObserver(render);
const stack = new Stack();
let cart;
if (localStorage.getItem("cart") !== null) {
    cart = new Cart(stack, JSON.parse(localStorage.getItem("cart")));
} else {
    cart = new Cart(stack);
    cart.addItem(item);
}
