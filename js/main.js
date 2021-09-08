// DOM Category 
const catg = document.querySelectorAll('.nav-links.category');
const menus = document.querySelectorAll('.menu');
const addCart = document.querySelectorAll('.menu button');
const listOrder = document.querySelector('.order-inner');
const sidenav = document.querySelector('nav .nav-links');


Array.from(sidenav.children).forEach(targetMenu => {
    //  console.log(targetMenu);
    targetMenu.addEventListener('click', () => {
        const targetName = targetMenu.firstElementChild.dataset.target;
        const targetPage = document.getElementById(targetName);
        const mainPage = document.querySelector('.main-menu');

        Array.from(sidenav.children).forEach(navMenu => {
            if (navMenu.firstElementChild.classList.contains('active')) {
                navMenu.firstElementChild.classList.remove('active');
            }
        });

        Array.from(mainPage.children).forEach(page => {
            if (page.classList.contains('show-up')) {
                page.classList.remove('show-up');
            }
        });

        targetMenu.firstElementChild.classList.add('active');
        targetPage.classList.add('show-up');

    });
});

catg.forEach(el => {
    // console.log(el);
    el.addEventListener('click', e => {
        let links = el.querySelectorAll('a');
        let all = links[0].getAttribute('id');
        let id = e.target.id;
        let parentID = el.parentElement.parentElement.getAttribute('id');
        let menuCatg = document.querySelectorAll('.menu.' + parentID);

        // Remove Class Active on Another Link
        links.forEach(link => {
            if (link.classList.contains('active')) {
                link.classList.remove('active');
            }
        });

        // Add Class Active on Target link
        e.target.classList.add('active');

        // Filter Each Menu 
        menuCatg.forEach(menu => {
            menu.style.display = 'block';

            if (id == all) {
                menu.style.display = 'block';
            }
            else if (menu.dataset.menu !== id) {
                menu.style.display = 'none';
            }
        });
    });
});


// DOM Checkout List
addCart.forEach(el => {
    el.addEventListener('click', e => {
        const img_Item = e.target.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute('src');
        const price_Item = e.target.previousElementSibling.previousElementSibling.firstChild.data;
        const tittle_Item = e.target.previousElementSibling.querySelector('h3').firstChild.data;
        const orderIconNull = listOrder.querySelector('.order-null');

        if (orderIconNull != undefined) {
            listOrder.removeChild(orderIconNull);
        }

        // Create Elements
        let parentDiv = makeElement('div', 3);
        let link = makeElement('a', 3);
        let icons = makeElement('i', 1);
        let h5 = makeElement('h5', 1);
        let h2 = makeElement('h2', 1);
        let img = makeElement('img', 1);
        let small = makeElement('small', 1);
        let textSmall = document.createTextNode('1');
        let removeText = document.createTextNode('delete');

        // Add Class Names
        const divOrder = addClassElement(parentDiv[0], 'order-item');
        const divDetail = addClassElement(parentDiv[1], 'details');
        const divDetailItem = addClassElement(parentDiv[2], 'detail-item');
        link = addClassElement(link, 'btn-sm');
        icons = addClassElement(icons, 'fas');
        h2 = addClassElement(h2, 'price');

        // Assign Variables from Array 
        let btnMin = link[0];
        let btnPlus = link[1];
        let btnRemv = link[2];
        let icCheck = icons[0]; // index [2]
        const imgOrder = img[0];
        const costOrder = h2[0];
        const orderTittle = h5[0];
        const smallCount = small[0];
        const childList = [orderTittle, btnMin, smallCount, btnPlus, btnRemv];

        btnMin = addClassElement(btnMin, 'min');
        btnPlus = addClassElement(btnPlus, 'max');
        btnRemv = addClassElement(btnRemv, 'remove');
        icCheck = addClassElement(icCheck, 'fa-check');

        btnRemv.classList.remove('btn-sm');
        btnMin.setAttribute('href', 'javascript:void(0)');
        btnPlus.setAttribute('href', 'javascript:void(0)');
        btnMin.setAttribute('onClick', 'btnMinusOrder(event)');
        btnPlus.setAttribute('onClick', 'btnPlusOrder(event)');
        btnRemv.setAttribute('href', 'javascript:void(0)');
        btnRemv.setAttribute('onClick', 'btnRemoveOrder(event)');
        orderTittle.setAttribute('style', 'margin-bottom:10px');
        imgOrder.setAttribute('src', img_Item);

        costOrder.append(price_Item);
        btnRemv.append(removeText);
        smallCount.append(textSmall);
        orderTittle.append(tittle_Item);

        for (let i = 0; i < childList.length; i++) {
            divDetailItem.append(childList[i]);

            if (i == childList.length - 1) {
                let childListTwo = [imgOrder, divDetailItem];

                for (let j = 0; j < childListTwo.length; j++) {
                    divDetail.append(childListTwo[j]);

                    if (j == childListTwo.length - 1) {
                        let childListThree = [divDetail, costOrder];

                        for (let h = 0; h < childListThree.length; h++) {
                            divOrder.append(childListThree[h]);
                        }
                    }

                }
            }
        }

        listOrder.prepend(divOrder);

        e.target.firstChild.data = '';
        e.target.append(icCheck);
        e.target.classList.add('active');
        checkOutPrint();
    });
});


/**** Count Order Button Event ****/
// Button Plus
const btnPlusOrder = (event) => {
    const countText = event.target.previousElementSibling;
    let count = event.target.previousElementSibling.firstChild.data;
    count = parseInt(count) + 1;
    countText.innerHTML = count;
    checkOutPrint();
    // console.log(count);
}

// Button Minus
const btnMinusOrder = (event) => {
    const countText = event.target.nextElementSibling;
    let count = event.target.nextElementSibling.firstChild.data;
    count = parseInt(count);

    if (count > 1) {
        count = count - 1;
    }
    countText.innerHTML = count;
    checkOutPrint();
    // console.log(count);
}

const btnRemoveOrder = (event) => {
    const removeOrder = event.target.parentElement.parentElement.parentElement;
    const nameOrderItem = event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.data;

    listOrder.removeChild(removeOrder);
    addCart.forEach(btnCart => {
        if (nameOrderItem == btnCart.previousElementSibling.firstChild.nextElementSibling.firstChild.data) {
            btnCart.classList.remove('active');
            btnCart.innerHTML = '&#43;';
        }
    });
    checkOutPrint();
    // console.log(nameOrderItem);
}

const checkOutSum = () => {
    let items = listOrder.querySelectorAll('.order-item');
    let itemCount = listOrder.querySelectorAll('small');
    let itemCost = listOrder.querySelectorAll('.price');
    let tax = document.querySelector('#tax').dataset.tax;
    let subTotal = 0;
    let Qty = 0;
    let total = 0;

    items = items.length;

    for (let i = 0; i < itemCount.length; i++) {

        let cost = itemCost[i].firstChild.data.split('');
        let iCount = parseInt(itemCount[i].firstChild.data);
        cost.shift();
        cost = parseFloat(cost.join(''));

        Qty += iCount;
        subTotal += iCount * cost;
    }
    total = subTotal + (subTotal * percent(parseFloat(tax)));

    if (subTotal == 0) {
        total = 0;
    }

    return [items, Qty, subTotal, total];
}

const checkOutPrint = () => {
    const [items, qty, subTotal, total] = checkOutSum();

    document.querySelector('#qty h5').textContent = `${items} item(s)`;
    document.querySelector('#qty span').textContent = `${qty}`;
    document.querySelector('#subtotal h4').textContent = `$${String(subTotal).substring(0, 5)}`;
    document.querySelectorAll('#total h3')[1].textContent = `$${String(total).substring(0, 5)}`;

}

const percent = (number) => {
    return number / 100;
}

const addClassElement = (element, className) => {
    if (Array.isArray(element)) {
        for (let i = 0; i < element.length; i++) {
            element[i].classList.add(className);
        }
    } else {
        element.classList.add(className);
    }

    return element;
}


const makeElement = (element, count) => {
    let arr = [];
    for (let i = 0; i < count; i++) {

        switch (element) {
            case 'div':
                let div = document.createElement('div');
                arr.push(div);
                break;

            case 'img':
                let img = document.createElement('img');
                arr.push(img);
                break;

            case 'button':
                let button = document.createElement('button');
                arr.push(button);
                break;

            case 'a':
                let a = document.createElement('a');
                arr.push(a);
                break;

            case 'small':
                let small = document.createElement('small');
                arr.push(small);
                break;

            case 'i':
                let i = document.createElement('i');
                arr.push(i);
                break;

            case 'h5':
                let h5 = document.createElement('h5');
                arr.push(h5);
                break;

            case 'h2':
                let h2 = document.createElement('h2');
                arr.push(h2);
                break;

            case 'p':
                let p = document.createElement('p');
                arr.push(p);
                break;
        }
    }
    return arr;
}

