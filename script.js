// =============================
// Library Delivery System
// Version 1.0
// =============================

let orders = [];

let orderNumber = localStorage.getItem("lastOrderNumber") || 1000;

const booksContainer = document.getElementById("booksContainer");
const orderInput = document.getElementById("orderNumber");

function generateOrderNumber() {
    orderNumber++;
    localStorage.setItem("lastOrderNumber", orderNumber);
    orderInput.value = orderNumber;
}

generateOrderNumber();

function addBookRow() {

    const row = document.createElement("div");

    row.className = "book-row";

    row.innerHTML = `
        <input class="book-name" placeholder="اسم الكتاب">

        <input class="book-qty" type="number" min="1" value="1">

        <input class="book-reservation" placeholder="رقم الحجز">

        <button type="button" onclick="this.parentElement.remove()">
        ❌
        </button>
    `;

    booksContainer.appendChild(row);

}

document
.getElementById("addBookBtn")
.addEventListener("click", addBookRow);

addBookRow();
//========================
// حفظ الطلب
//========================

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", saveOrder);

function saveOrder(){

    const customerName=document.getElementById("customerName").value;
    const phone1=document.getElementById("phone1").value;
    const phone2=document.getElementById("phone2").value;
    const address=document.getElementById("address").value;

    if(customerName===""){
        alert("اكتبي اسم العميل");
        return;
    }

    const books=[];

    document.querySelectorAll(".book-row").forEach(row=>{

        const name=row.querySelector(".book-name").value;

        const qty=row.querySelector(".book-qty").value;

        const reserve=row.querySelector(".book-reservation").value;

        if(name!=""){

            books.push({

                name:name,

                qty:qty,

                reserve:reserve

            });

        }

    });

    const order={

        id:orderInput.value,

        customer:customerName,

        phone1:phone1,

        phone2:phone2,

        address:address,

        books:books,

        status:"قيد التجهيز"

    };

    orders.push(order);

    drawTable();

    clearForm();

}

function clearForm(){

document.getElementById("customerName").value="";

document.getElementById("phone1").value="";

document.getElementById("phone2").value="";

document.getElementById("address").value="";

booksContainer.innerHTML="";

addBookRow();

generateOrderNumber();

}
//=====================
// رسم الجدول
//=====================

function drawTable(){

const tbody=document.querySelector("#ordersTable tbody");

tbody.innerHTML="";

orders.forEach((order,index)=>{

const tr=document.createElement("tr");

tr.innerHTML=`

<td>
<input type="checkbox">
</td>

<td>${order.id}</td>

<td>${order.customer}</td>

<td>${order.phone1}</td>

<td>${order.books.length}</td>

<td>${order.status}</td>

<td>
<button onclick="editOrder(${index})">
✏
</button>
</td>

<td>
<button onclick="deleteOrder(${index})">
🗑
</button>
</td>

<td>
<button onclick="window.print()">
🖨
</button>
</td>

`;

tbody.appendChild(tr);

});

}
//==================
// حذف الطلب
//==================

function deleteOrder(index){

if(confirm("حذف الطلب؟")){

orders.splice(index,1);

drawTable();

}

}

//==================
// تعديل الطلب
//==================

function editOrder(index){

alert("سيتم إضافة التعديل في الخطوة القادمة.");

}
//======================
// حفظ البيانات
//======================

function saveLocal() {

    localStorage.setItem(
        "libraryOrders",
        JSON.stringify(orders)
    );

}
//======================
// تحميل البيانات
//======================

window.onload = function () {

    generateOrderNumber();

    const data = localStorage.getItem("libraryOrders");

    if (data) {

        orders = JSON.parse(data);

        drawTable();

    }

}
