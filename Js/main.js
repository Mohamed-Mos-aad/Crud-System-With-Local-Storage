var productNameInput = document.getElementById('productNameInput');
var productPriceInput = document.getElementById('productPriceInput');
var productCategoryInput = document.getElementById('productCategoryInput');
var productDescriptionInput = document.getElementById('productDescriptionInput');
var tableBody = document.getElementById('tableBody');

var productContainer=[];

if(localStorage.getItem('myProduct') != null)
{
    productContainer =JSON.parse(localStorage.getItem('myProduct'));
    displayProduct(productContainer);
}
else
{
    productContainer =[];
}

function addProduct()
{
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
    }

    productContainer.push(product);
    console.log(productContainer)
    localStorage.setItem('myProduct',JSON.stringify(productContainer));
    clearForm();
    displayProduct(productContainer);
}

function clearForm()
{
    productNameInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescriptionInput.value="";
}

function displayProduct(list)
{
    var cartoona=``;
    for(i=0; i<list.length;i++)
    {
        cartoona +=
        `
            <tr>
            <td>${i+1}</td>
            <td>${list[i].name}</td>
            <td>${list[i].price}</td>
            <td>${list[i].category}</td>
            <td>${list[i].description}</td>
            <td><button class="btn btn-outline-danger" onclick="setFormForUpdate(${i});">Update</button></td>
            <td><button class="btn btn-outline-warning" onclick="deleteProduct(${i});">Delete</button></td>
            </tr>
        `
    }
    tableBody.innerHTML = cartoona;
}

function searchProduct(searchItem)
{
    var searchResult = [];

    for(var i = 0 ; i < productContainer.length ;i++)
    {
        if(productContainer[i].name.toLowerCase().includes(searchItem) == true)
        {
            searchResult.push(productContainer[i]);
        }
    }
    displayProduct(searchResult);
}

function deleteProduct(deletedIndex)
{
    productContainer.splice(deletedIndex,1);
    localStorage.setItem('myProduct',JSON.stringify(productContainer));
    displayProduct(productContainer);
}

var globalIndex;

function setFormForUpdate(updateIndex)
{
    globalIndex = updateIndex;

    productNameInput.value = productContainer[updateIndex].name;
    productPriceInput.value = productContainer[updateIndex].price;
    productCategoryInput.value = productContainer[updateIndex].category;
    productDescriptionInput.value = productContainer[updateIndex].description;

    document.getElementById("addProduct").classList.add('d-none');
    document.getElementById("updateProduct").classList.replace('d-none','d-inline-block');
}
function updateProduct()
{
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
    }
    productContainer.splice(globalIndex,1,product);
    localStorage.setItem('myProduct',JSON.stringify(productContainer));
    displayProduct(productContainer);
    document.getElementById("addProduct").classList.replace('d-none','d-inline-block');
    document.getElementById("updateProduct").classList.replace('d-inline-block','d-none');
    clearForm();
}