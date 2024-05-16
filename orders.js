const API = 'http://127.0.0.1:8000/';
const API_ORDER = `${API}order/`;

const deleteOrder = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const parent = e.target.parentNode;
    const idToDelete = parent.getAttribute('data-id');
    console.log(idToDelete);
    const res = await window.fetch(`${API_ORDER}${idToDelete}`, {
        method: 'DELETE',
    })
    if(res.status == 200){
        alert(`Deleted order with id ${idToDelete} successfuly!`);
        window.location.reload();
    }else{
        alert(`Unexpected error! ${res.statusText} ${(await res.json()).message}`);
    }
}

window.onload = async () => {
    const data = Array.from(await (await window.fetch(API_ORDER, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })).json());
    const root = document.getElementById('order-container');
    data.forEach((value) => {
        const elementToAppend = document.createElement('div');
        const deleteButton = document.createElement('button');
        deleteButton.onclick = deleteOrder;
        elementToAppend.appendChild(deleteButton);
        elementToAppend.className = 'order';
        elementToAppend.setAttribute('data-id', value.orderId);
        const orderShipDate = document.createElement('p');  
        orderShipDate.innerHTML = value.shipDate != null?(new Date(value.shipDate)).toDateString():'none';
        const orderStatus = document.createElement('p');
        orderStatus.innerHTML = value.status;
        let priceAll = 0;
        const orderProducts = value.products;
        const orderProductsElement = document.createElement('div');
        orderProductsElement.className = 'order-products';
        orderProducts.forEach((product) => {
            const productToAppend = document.createElement('div');
            productToAppend.className = 'product';
            const productName = document.createElement('p');  
            productName.innerHTML = product.name;
            const productPrice = document.createElement('p');  
            productPrice.innerHTML = product.price;
            priceAll += parseInt(product.price.split(" ")[0]);
            productToAppend.appendChild(productName);
            productToAppend.appendChild(productPrice);
            orderProductsElement.appendChild(productToAppend);
        });
        const orderPrice = document.createElement('p');
        orderPrice.innerHTML = 'Full price: '+ priceAll;
        elementToAppend.appendChild(orderShipDate);
        elementToAppend.appendChild(orderStatus);
        elementToAppend.appendChild(orderPrice);
        elementToAppend.appendChild(orderProductsElement);
        elementToAppend.style = "width: 90%;border: 1px solid black; margin-left: auto; margin-right: auto; margin-top: 10px;";
        root.appendChild(elementToAppend);
    })
};

