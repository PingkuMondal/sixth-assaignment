const allCategoriesId=document.getElementById("allCategories-id");
const loadCategoriesItem=document.getElementById("loadCategoriesItem");
const allCategory=document.getElementById("allCategory");
const addCard=document.getElementsByClassName("addCart");
const cardBox=document.getElementById("card-id");
 const totalPriceId=document.getElementById("totalPriceId");
 const itemName=document.getElementsByClassName("itemName");

const yourCart=[];


const allCategoriesPart=async()=>{
    try {
        const res= await fetch(`https://openapi.programming-hero.com/api/categories`);
        const data=await res.json();
       showAllCategoriesName(data.categories);
    } catch (error) {
        console.log(error);
    }

}
const showAllCategoriesName=(names)=>{
   names.forEach(name => {
   
    allCategoriesId.innerHTML+=`  
                          <div class=" list-none flex justify-between flex-wrap hover:bg-green-600 rounded-md  hover:text-white cursor-pointer ml-2 font-semibold  gap-5 ">
                          <li id=${name.id}  class="py-1 px-10 my-2 pl-2 ">${name.category_name}</li>
                          </div>

    `
   });
}

allCategoriesId.addEventListener("click",(e)=>{
    
     const allLi = document.querySelectorAll("#allCategories-id li, #allCategory");
 

    allLi.forEach((li)=>{
          li.classList.remove("bg-green-600", "text-white")
    })

    if(e.target.localName==="li"){
        e.target.classList.add("bg-green-600", "text-white","rounded-md")

          if (e.target.id === "allCategory") {
      allCategoryButton();
    } else {
      loadCategoriesId(e.target.id);
    }
        // console.log(e.target)
        
    }


})

const loadCategoriesId=async(id)=>{
   try {
     const res=await fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    const data=await res.json();
   showLoadCategoriesItem(data.plants || [])
    // console.log(data.plants)

   } catch (error) {
    console.log(error);
    
   }

}

const showLoadCategoriesItem=(itemsCat)=>{
  loadCategoriesItem.innerHTML="";
  itemsCat.forEach((items)=>{
    if (!itemsCat.length) {
    loadCategoriesItem.innerHTML = `<p class="text-red-600 font-bold">No plants found!</p>`;
    return;
  }
      
  loadCategoriesItem.innerHTML+=`
      <div class="bg-white rounded-md p-4 space-y-2 w-full">
                        <img class="rounded-lg h-60 w-full mx-auto" src="${items.image}" alt="">
                        <h1 class="itemName font-bold text-md text-left">${items.name}</h1>
                        <p class="text-left text-sm">${items.description}</p>
                        <div class="flex justify-between">
                            <button class="bg-[#DCFCE7] rounded-3xl px-2 py-1 text-green-700 font-semibold">${items.category}</button>
                            <button>💲<span>${items.price}</span></button>
                        </div>
                        <button class="bg-[#15803D] text-white px-15 py-2 rounded-3xl font-semibold addCart">Add to Cart</button>
                    </div>
  `
//  console.log(items)
  })
 



}


const allCategoryButton=async()=>{
   try {
     const res=await fetch(`https://openapi.programming-hero.com/api/plants`)
    const data=await res.json();
    // console.log(data.plants)
    if (data.plants) {
      showLoadCategoriesItem(data.plants);
    } else if (data.data && data.data.plants) {
      showLoadCategoriesItem(data.data.plants);
    } else {
      showLoadCategoriesItem([]);
    }

   } catch (error) {
    console.log(error);
    
   }

}
allCategory.addEventListener("click",()=>{
     const allLi = document.querySelectorAll("#allCategories-id li, #allCategory");
  allLi.forEach((li) => li.classList.remove("bg-green-600", "text-white", "rounded-md"));

   allCategory.classList.add("bg-green-600", "text-white", "rounded-md");

   allCategoryButton();
})

loadCategoriesItem.addEventListener("click",(e)=>{
  if(e.target.classList.contains("addCart")){
  
   console.log(yourCart)
    loadHandleCard(e);
  }
  
 
              
})

const loadHandleCard=(e)=>{
  alert("successfully clicked ")
  const parentDiv = e.target.parentNode; 
  const titleCopy = parentDiv.querySelector("h1").innerText;
  const priceCopy = parseFloat(parentDiv.querySelector("span").innerText)
 

   yourCart.push({
    titleCopy:titleCopy,
    priceCopy:priceCopy,
   })
  //  totalPrice.push({ priceCopy:priceCopy})
   showLoadHandleCard();

}

const showLoadHandleCard=()=>{
   cardBox.innerHTML = "";

   yourCart.forEach((card,index)=>{
        cardBox.innerHTML+=`  <div class="flex justify-between bg-gray-400 px-2 py-1 rounded-lg mx-1 mt-1">
                            <div class="text-white">
                                <h1 class="font-semibold text-lg">${card.titleCopy}</h1>
                            <p>${card.priceCopy}</p>
                        </div>
                            <button onclick="deleteCartItem(${index})"><i class="fa-solid fa-xmark"></i></button>
                        </div>`
   })
    const total = yourCart.reduce((sum, item) => sum + item.priceCopy, 0);
  totalPriceId.innerHTML = `<h2 class="text-lg font-bold text-green-700">Total: $${total}</h2>`;
    
}

const deleteCartItem = (index) => {
  yourCart.splice(index, 1);
  showLoadHandleCard();    
}




allCategoriesPart();
allCategoryButton();