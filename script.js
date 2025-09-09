const allCategoriesId=document.getElementById("allCategories-id");
const loadCategoriesItem=document.getElementById("loadCategoriesItem");
const allCategory=document.getElementById("allCategory");
const addCard=document.getElementsByClassName("addCart");
const cardBox=document.getElementById("card-id");
 const totalPriceId=document.getElementById("totalPriceId");
 const itemName=document.getElementsByClassName("itemName");
 const loadCategoriesCart=document.getElementById("loadCategoriesCart");
 const bodyScreen=document.getElementById("bodyScreen");
 const modalContainer=document.getElementById("modalContainer");
 const modalCard=document.getElementById("modal_card");
 const logoId= document.getElementById("logo-id")

const yourCart=[];


const allCategoriesPart=async()=>{
    try {
         loadCategoriesCart.innerHTML = `
      <div class="flex justify-center items-center col-span-3">
        <span class="loading loading-dots loading-xl"></span>
         <span class="loading loading-dots loading-xl"></span>
      </div>
    `;
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
               <div class="dropdown md:hidden">
                   <ul>
                       <div class="tabindex="0" dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm text-green-700 font-semibold hover:bg-green-600 rounded-md  hover:text-white  mt-2 font-semibold  gap-2 ">
                          
                          <li id=${name.id}  class="cursor-pointer py-1 px-10 pl-2 ">${name.category_name}</li>
                       </div>
                    </ul>
                </div>
                         
                <div class="hidden md:block hover:bg-green-600 rounded-md  hover:text-white cursor-pointer mt-2 font-semibold  gap-2 ">
                          
                          <li id=${name.id}  class="py-1 px-10 pl-2 ">${name.category_name}</li>
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
        e.target.classList.add("bg-green-600", "text-white","w-full","rounded-md")

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
       loadCategoriesCart.innerHTML = `
      <div class="flex justify-center items-center col-span-3">
        <span class="loading loading-dots loading-xl"></span>
         <span class="loading loading-dots loading-xl"></span>
      </div>
    `;
     const res=await fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    const data=await res.json();
   showLoadCategoriesItem(data.plants || [])
    // console.log(data.plants)

   } catch (error) {
    console.log(error);
    
   }

}

const showLoadCategoriesItem=(itemsCat)=>{
  loadCategoriesCart.innerHTML="";
  itemsCat.forEach((items)=>{
    if (!itemsCat.length) {
    loadCategoriesCart.innerHTML = `<p class="text-red-600 font-bold">No plants found!</p>`;
    return;
  }
      
  loadCategoriesCart.innerHTML+=`
      <div node-id="${items.id}"  class="bg-white rounded-md p-4 space-y-2  object-cover w-full mx-auto shadow-lg grid justify-center items-center">
                        <img class="rounded-lg h-60 w-full mx-auto object-cover" src="${items.image}" alt="">
                        <h1 data-id="${items.id}" class="itemName font-bold text-md text-left cursor-pointer text-green-700">${items.name}</h1>
                        <p class="text-left text-sm">${items.description}</p>
                        <div class="flex justify-between">
                            <button class="bg-[#DCFCE7] rounded-3xl px-2 py-1 text-green-700 font-semibold">${items.category}</button>
                            <button class="font-semibold">৳<span>${items.price}</span></button>
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
allCategory.addEventListener("click",(e)=>{
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
   if(e.target.classList.contains("itemName")){
    modalDescription (e);
   }
  })

  const modalDescription =(e)=>{
const id=e.target.getAttribute("data-id");

fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
.then(res=>res.json())
.then(data=>{
showDetailModal(data.plants)
})
.catch(err=>{
  console.log(err)
})

    //  modalCard.showModal();
// console.log(id)
}

const showDetailModal=(plants)=>{
  // console.log(plants)
    modalCard.showModal();
modalContainer.innerHTML=`
         <h3 class="text-lg font-bold">${plants.name}</h3>
        <img class="w-full rounded-md h-60 mx-auto object-cover" src="${plants.image}" alt="">
       
       <p class="text-green-700"><span class=" text-gray-800 font-semibold">Category:</span> ${plants.category}</p>
       <p class="text-green-700"><span class="text-gray-800 font-semibold">Price:</span>৳ ${plants.price} </p>
          <p class="py-4 text-gray-800"> <span class="font-semibold">Description :</span> ${plants.description || "No description available"}</p>

`
}

const loadHandleCard=(e)=>{
  
  const parentDiv = e.target.closest("div.bg-white"); 
  const titleCopy = parentDiv.querySelector("h1").innerText;
  const priceCopy = parseFloat(parentDiv.querySelector("span").innerText)
  alert( titleCopy +" has been add to Cart")
 

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
        cardBox.innerHTML+=`  <div class="flex justify-between bg-[#F0FDF4] px-2 py-1 rounded-lg mx-2 mt-1">
                            <div class="text-black space-y-2">
                                <h1 class="font-semibold text-md">${card.titleCopy}</h1>
                            <p class="text-left text-sm text-gray-700">৳${card.priceCopy} <i class="fa-solid fa-xmark"></i> 1</p>
                        </div>
                            <button onclick="deleteCartItem(${index})"><i class="fa-solid fa-xmark text-red-900"></i></button>
                        </div>`
   })
    const total = yourCart.reduce((sum, item) => sum + item.priceCopy, 0);
  totalPriceId.innerHTML = `
  <div class="border-t-2 border-green-900"><h2 class="text-md font-bold text-green-700 text-right">Total Price: ৳${total}</h2></div>`;
    
}

const deleteCartItem = (index) => {
  yourCart.splice(index, 1);
  showLoadHandleCard();    
}

logoId.addEventListener('click',function(e){
  e.preventDefault();
  const banner=document.getElementById('banner-id');
   banner.scrollIntoView({
      behavior: 'smooth', 
      block: 'start'})
})


allCategoriesPart();
allCategoryButton();