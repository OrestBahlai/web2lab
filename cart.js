document.getElementById('cancelCart').onclick = () => {
    const cart = document.getElementById('cartModal');
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';
    cart.style.display = 'none';
}

document.getElementById('openCart').onclick = () => {
    const cart = document.getElementById('cartModal');
    const cartContainer = document.getElementById('cart-container');
    cart.style.display = 'block';
    let ids = JSON.parse(localStorage.getItem('cart'));
    ids.forEach(async (idToFetch) => {
        const product = await (await window.fetch(`${API_PRODUCTS}${idToFetch}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })).json();
        console.log(product)
        const elementToAppend = document.createElement('div');
        elementToAppend.className = 'product';
        const header = document.createElement('h3');
        header.innerHTML = product.name;
        const price = document.createElement('p');
        price.innerHTML = product.price;
        elementToAppend.appendChild(header);
        elementToAppend.appendChild(price);
        cartContainer.appendChild(elementToAppend);
    });
}