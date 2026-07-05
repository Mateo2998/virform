let items = [];

function recordSubmission(record) {
 fetch('https://script.google.com/macros/s/AKfycbxqI9GhN5-B6_uRajMNtIJHuphUx3SajUsOSc8LnVt2kXeVp2jnJoSNNf0SeJJmpYv_nA/exec', {
 method: 'POST',
 body: JSON.stringify(record)
 }).catch(err => console.error('Could not record submission:', err));
}

function addItem(){

    let name = document.getElementById("itemName").value;
    let qty = parseInt(document.getElementById("itemQty").value);

    if(name === "" || isNaN(qty)){
        alert("Fill all fields");
        return;
    }

    items.push({
        name: name,
        qty: qty
    });

    recordSubmission({
        action: "ADD ITEM",
        name,
        qty
    });

    clearInputs();
    display();
}

function borrowItem(){

    let name = document.getElementById("borrowName").value;
    let qty = parseInt(document.getElementById("borrowQty").value);

    let item = items.find(i => i.name.toLowerCase() === name.toLowerCase());

    if(!item){
        alert("Item not found");
        return;
    }

    if(item.qty < qty){
        alert("Not enough stock");
        return;
    }

    item.qty -= qty;

    recordSubmission({
        action: "BORROW",
        name,
        qty,
        remaining: item.qty
    });

    clearBorrowInputs();
    display();
}

function returnItem(){

    let name = document.getElementById("returnName").value;
    let qty = parseInt(document.getElementById("returnQty").value);

    let item = items.find(i => i.name.toLowerCase() === name.toLowerCase());

    if(!item){
        alert("Item not found");
        return;
    }

    item.qty += qty;

    recordSubmission({
        action: "RETURN",
        name,
        qty,
        updatedStock: item.qty
    });

    clearReturnInputs();
    display();
}

function display(){

    let table = document.getElementById("table");

    table.innerHTML = `
        <tr>
            <th>Item</th>
            <th>Stock</th>
            <th>Status</th>
        </tr>
    `;

    for(let i = 0; i < items.length; i++){

        let item = items[i];

        let status = item.qty <= 2 ? "LOW STOCK" : "AVAILABLE";

        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td class="${item.qty <= 2 ? 'low' : 'ok'}">${status}</td>
            </tr>
        `;
    }
}

function searchItem(name){

    let i = 0;
    let found = false;

    while(i < items.length){

        if(items[i].name.toLowerCase() === name.toLowerCase()){
            alert(`FOUND: ${items[i].name} | Stock: ${items[i].qty}`);
            found = true;
            break;
        }

        i++;
    }

    if(!found){
        alert("Item not found");
    }
}

function clearInputs(){
    document.getElementById("itemName").value = "";
    document.getElementById("itemQty").value = "";
}

function clearBorrowInputs(){
    document.getElementById("borrowName").value = "";
    document.getElementById("borrowQty").value = "";
}

function clearReturnInputs(){
    document.getElementById("returnName").value = "";
    document.getElementById("returnQty").value = "";
}