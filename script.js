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
                          <div class=" list-none flex justify-between flex-wrap hover:bg-green-600 rounded-md  hover:text-white cursor-pointer mt-2 ml-2 font-semibold  gap-5 ">
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
      <div node-id="${items.id}"  class="bg-white rounded-md p-4 space-y-2 w-full">
                        <img class="rounded-lg h-60 w-full mx-auto" src="${items.image}" alt="">
                        <h1 data-id="${items.id}" class="itemName font-bold text-md text-left">${items.name}</h1>
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
    <p class="py-4">${plants.description || "No description available"}</p>
`
}

const loadHandleCard=(e)=>{
  alert("successfully clicked ")
  const parentDiv = e.target.closest("div.bg-white"); 
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
        cardBox.innerHTML+=`  <div class="flex justify-between bg-[#F0FDF4] px-2 py-1 rounded-lg mx-1 mt-1">
                            <div class="text-black">
                                <h1 class="font-semibold text-lg">${card.titleCopy}</h1>
                            <p class="text-left">${card.priceCopy}</p>
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




// const showModalDescription = (plant) => {
//   const modalBox = document.getElementById("my_modal_8_content");
  
//   modalBox.innerHTML = `
//     <h3 class="text-lg font-bold">${plant.name}</h3>
//     <p class="py-4">${plant.description || "No description available"}</p>
//     <div class="modal-action">
//       <a href="#" class="btn">Close</a>
//     </div>
//   `;
// };


// loadCategoriesCart.addEventListener("click", (e) => {
//   if (e.target.classList.contains("itemName")) {
//     const id = e.target.getAttribute("data-id");
//     modalDescription(id);
   
//     document.getElementById("my_modal_8").showModal?.(); 
//   }
// });;


allCategoriesPart();
allCategoryButton();