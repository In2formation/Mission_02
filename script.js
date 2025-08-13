console.log("connected");

// The first 3 variables   i.e. Global. They hold the data that drives the UI.

// "let" starts at 0 and will increase when a user clicks “Add to Cart.” This will indicate how many items are in the cart.
let itemCount = 0;

//This array[] also starts empty then everytime a user adds an item, a new object (with name, price, and image) is pushed into this list which is the cart.
const cartItems = [];

// The cartOpen boolean is on default "false" so the right panel is closed unless triggered by onclick (further down) where it can be opened and then closed again with a close button.
let cartOpen = false; 





// Below are the item count display and the shop cart button accessed via script.

const itemCountDisplay = document.getElementById("item-count");
const shopCartBtn = document.getElementById("ShopCartBtn");


// Here are the shopping cart button styles and hover effects to match the home buttons etc. in the navbar incl. when mouse is over the buton. 
shopCartBtn.style.backgroundColor = "#dedede";
shopCartBtn.style.cursor = "pointer";
shopCartBtn.style.transition = "background-color 0.8s ease";

shopCartBtn.onmouseenter = function() {
  shopCartBtn.style.backgroundColor = "#9da6a6";
};

shopCartBtn.onmouseleave = function() {
  shopCartBtn.style.backgroundColor = "white";
};


//This object relates to the counter display and contains style properties. The element shows the number of items in the cart. It was grabbed earlier using: 'const itemCountDisplay = document.getElementById("item-count"); '

const itemCountDisplayStyles = {
  fontSize: "17px",
  fontFamily: "Arial, sans-serif",
  fontWeight: "normal",
  backgroundColor: "#dedede",
  color: "black",
  marginTop: "6px",
  textAlign: "right"
};
//The object assign below takes all the style rules from 'itemCountDisplayStyles' and applies them to itemCountDisplay.” 
Object.assign(itemCountDisplay.style, itemCountDisplayStyles);


// This first function locates all the chair images, wraps each in a container, adds the price tag and the "add to cart" button on each product then also handles the click behaviour to update the cart. 
function addChairOverlays() {
  const allChairImages = document.querySelectorAll('.chair-img');

  allChairImages.forEach(img => {
    const wrapper = document.createElement('div');
    const overlay = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);

    img.style.display = 'block';
    img.style.width = '100%';
    img.style.height = 'auto';

const overlayStyles = {
  position: 'absolute',
  bottom: '8px',
  right: '12px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  padding: '4px 8px',
  fontSize: '18px',
  fontWeight: 'bold',
  borderRadius: '4px',
  pointerEvents: 'auto',
  zIndex: '10',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '4px'
};
Object.assign(overlay.style, overlayStyles);

//This line below creates a new element in memory.
    const priceTag = document.createElement('div');

//This next line pulls the price from the image’s data and formats it. 
    priceTag.textContent = `$${img.dataset.price}`;

    // This next line inserts the price tag into the overlay.
    overlay.appendChild(priceTag);


// The next line creates a new  element which is a button, so buyers can click to add the item to their cart.
const button = document.createElement('button');

// Sets the button’s label to “Add to Cart”:
button.textContent = `Add to Cart`;

//Add to cart button styles and placement
const buttonStyles = {
  backgroundColor: '#ff9800',
  color: 'white',
  border: 'none',
  padding: '6px 10px',
  fontSize: '12px',
  borderRadius: '4px',
  cursor: 'pointer'
};
//C
Object.assign(button.style, buttonStyles);



//This section shows what happens when the "add to cart" button is clicked i.e. it adds +1 to the counter each time 
    button.addEventListener("click", () => {
      itemCount++;
      itemCountDisplay.textContent = itemCount === 1 ? "1 item" : `${itemCount} items`;
      itemCountDisplay.style.display = "inline-block";


      // Here below a new object has been created . This object will hold all the relevant data about the chair the user clicked on. 
      const item = {

        name: img.alt || "Chair",
        price: parseFloat(img.dataset.price),
        imageSrc: img.src
      };
      cartItems.push(item);
      addCartItemsTogether();
    });

    overlay.appendChild(button);
    wrapper.appendChild(overlay);
  });
}


// This makes it so when click on shopping cart it will open panel on right
shopCartBtn.onclick = function () {
  cartOpen = !cartOpen;
  if (cartOpen) {
    cartPanel.style.right = "0";
  } else {
    cartPanel.style.right = "-320px";
  }
};

// Shopping cart panel properties inc. style etc.
const cartPanel = document.createElement("div");
cartPanel.id = "cart-panel";

const cartPanelStyles = {
  position: "fixed",
  top: "0",
  right: "-320px",
  width: "300px",
  height: "100%",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  transition: "right 0.4s ease",
  padding: "20px",
  overflowY: "auto"
};
Object.assign(cartPanel.style, cartPanelStyles);


//This second function goes through the cartItems then adds each item’s image, info. and calculates and displays the total price. It also adds the close button and the styling for inside the panel. 
function addCartItemsTogether() {
  cartPanel.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "Your Items For Purchase";
  title.style.marginTop = "0";
  cartPanel.appendChild(title);

  let total = 0;

  cartItems.forEach(item => {
    total += item.price;


    const itemDiv = document.createElement("div");
    itemDiv.style.display = "flex";
    itemDiv.style.alignItems = "center";
    itemDiv.style.marginBottom = "12px";
    itemDiv.style.borderBottom = "1px solid #ccc";
    itemDiv.style.paddingBottom = "8px";

    const img = document.createElement("img");
    img.src = item.imageSrc;
    img.alt = item.name;
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.objectFit = "cover";
    img.style.marginRight = "12px";
    img.style.borderRadius = "4px";

    const info = document.createElement("div");
    info.innerHTML = `<strong>${item.name}</strong><br>$${item.price.toFixed(2)}`;

    itemDiv.appendChild(img);
    itemDiv.appendChild(info);
    cartPanel.appendChild(itemDiv);
  });

  const totalDiv = document.createElement("div");
  totalDiv.style.marginTop = "20px";
  totalDiv.style.fontSize = "18px";
  totalDiv.style.fontWeight = "bold";
  totalDiv.textContent = `Total: $${total.toFixed(2)}`;
  cartPanel.appendChild(totalDiv);

  cartPanel.appendChild(closeBtn);
}


// Shopping cart title for right panel
const cartTitle = document.createElement("h2");
cartTitle.textContent = "Your Items For Purchase";
cartTitle.style.marginTop = "0";
cartPanel.appendChild(cartTitle);


// Close button inside the right panel
const closeBtn = document.createElement("button");
closeBtn.textContent = "Close";
closeBtn.onclick = () => {
  cartOpen = false;
  cartPanel.style.right = "-320px";
};

//Close button styles
const closeBtnStyles = {
  marginTop: "20px",
  padding: "6px 12px",
  backgroundColor: "#ccc",
  border: "none",
  cursor: "pointer",
  borderRadius: "4px"
};
Object.assign(closeBtn.style, closeBtnStyles);
cartPanel.appendChild(closeBtn);


// Add the shop cart panel to the original page
document.body.appendChild(cartPanel);
 
document.addEventListener('DOMContentLoaded', addChairOverlays);










































