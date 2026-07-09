const CartModule = (function () {
    let items = [];
    return {
        addItem(item) {
            items.push(item);
        },
        removeItem(itemId) {
            for (item of items) {
                if (item.id == itemId) {
                    const index = items.indexOf(item);
                    if (index !== -1) items.splice(index, 1);
                }
            }
        },
        updateQuantity(itemId, quantity) {
            for (item of items) {
                if (item.id === itemId) {
                    const index = items.indexOf(item);
                    if (index !== -1) item.quantity = quantity;
                }
            }
        },
        getItems() {
            console.log(items);
        },
        getTotal() {
            return items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
        },
        clear() {
            items = [];
        },
    };
})();

const item1 = {
    id: 1,
    price: 100,
    quantity: 10,
};
const item2 = {
    id: 2,
    price: 100,
    quantity: 10,
};

CartModule.addItem(item1);
CartModule.addItem(item2);
CartModule.getItems();
CartModule.updateQuantity(1, 5);
CartModule.removeItem(2);
CartModule.getItems();
console.log(CartModule.getTotal());
CartModule.clear();
CartModule.getItems();

console.log(CartModule.items); // undefined
