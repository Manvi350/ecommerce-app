const products = [
  {
    
    name: "Wireless Headphones",
    price: 2499,
    image: "https://x.imastudent.com/content/0050443_jbl-tune-760nc-noise-canceling-wireless-over-ear-headphones_500.jpeg",
    
    description: "High-quality wireless headphones with noise cancellation.",
    category:"Electronics"
  },
  {
    
    name: "Smart Watch",
    price: 3499,
    image: "https://m.media-amazon.com/images/I/61ZjlBOp+rL.jpg",
    
    description: "Track fitness, heart rate and give fast notifications.",
    category:"Electronics"
  },
  {
    
    name:"Pasta",
    price:392,
    image:"https://rukminim2.flixcart.com/image/704/844/xif0q/pasta/i/x/u/-original-imahcfd3vensgyvg.jpeg?q=90&crop=false",
    description:"Maggi Pazzta Cheese Macaroni Instant Pasta",
    category:"Grocery"
  },
  {
    
    name:"DSLR Camera",
    price:39999,
    image:"https://t3.ftcdn.net/jpg/00/79/36/04/360_F_79360425_13tH0FGR7nYTNlXWKOWtLmzk7BAikO1b.jpg",
    description:"Effective in dim-lighting ,autofocused and extending battery life.",
    category:"Electronics"
  },
  {
    
    name:"Cargo Pants",
    price:699,
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAw4GrRU6cAAxMPPdCGQ3f2ylzZjJzNIWRCA&s",
    description:"Shadow Black Comfy Cargo Pants",
    category:"Fashion"
  },
  {
    
    name:"Laptop Stand",
    price:999,
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiZMOS7fAMsmyCqVzXMXZLE59W_TcimNOSQQ&s",
    description:"Ergonomic laptop stand made of aluminum with adjustable height.",
    category:"Electronics"
  },
  {
    
    name:"Mechanical Keyboard",
    price:4999,
    image:"https://m.media-amazon.com/images/I/61wHCR2sz9L._AC_SL1500_.jpg",
    description:"RGB mechanical keyboard with tactile switches for fast and accurate typing.",
    category:"Electronics"
  },
  {
    
    name:"Sweatshirt",
    price:476,
    image:"https://rukminim2.flixcart.com/image/704/844/xif0q/sweatshirt/4/j/3/s-far-hoodie-women-fairiano-original-imahdthwtryrznsg.jpeg?q=90&crop=false",
    description:"Fairiano Full Sleeve Self Design Women Sweatshirt",
    category:"Fashion"
  },
  {
    
    name:"Olive Green Cargo Pants",
    price:499,
    image:"https://arbazapparel.com/cdn/shop/files/WhatsAppImage2024-07-07at3.41.19AM_1.jpg?v=1720306965&width=1445",
    description:"Stuff Cotton, Easy Washable, Premium Quality , Wide Leg Pants ",
    category:"Fashion"
  },
  {
   
    name:"Crop top",
    price:399,
    image:"https://pronk.in/cdn/shop/files/10_cbc3656e-0607-4e59-8218-fb5de5d55cf7_1800x1800.jpg?v=1751264918",
    description:"Solid Wine Half Sleeve Crop Top.",
    category:"Fashion"
  },
  {
    
    name:"T-Shirts",
    price:299,
    image:"https://gogirgit.com/cdn/shop/products/awesome-women-round-neck-royal-blue-t-shirt-hanger-gogirgit-com_1800x.jpg?v=1680501165",
    description:"Awesome Women Royal Blue Tshirt.",
    category:"Fashion"
  },
  {
    
    name:"Nike Air Max",
    price:1599,
    image:"https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/lddanijntooidcnakfzc/NIKE+AIR+MAX+EXCEE.png",
    description:"Nice and comfortable sneakers",
    category:'Fashion'
  },
  {
   
    name:"Bluetooth Speaker",
    price:2499,
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkzm330_QXVLpQJnT6jKW3ixSYYI9Vka9t6Q&s",
    description:"Portable speaker with loud sound, waterproof design, and long battery life.",
    category:"Electronics"
  },
  {
    
    name:"Black Pleated Women's Straight Korean Pants",
    price:2049,
    image:"https://freakins.com/cdn/shop/files/09june2024_6729-Edit_5d7385bd-380e-48fa-8f97-39a0ed87e235.jpg?v=1749907045&width=1201",
    description:"Fabric Specification: 100% Polyester, Crafted from premium polyester",
    category:"Fashion"
  },
  {
    
    name:"LED Monitor",
    price:9999,
    image:"https://m.media-amazon.com/images/I/81-pe8AZQLL._UF1000,1000_QL80_.jpg",
    description:"24-inch Full HD LED monitor with ultra-thin bezels and eye care technology.",
    category:"Electronics"
  },
  {
   
    name:"Sneakers",
    price:1299,
    image:"https://m.media-amazon.com/images/I/61bD2Aqng9L._UY1000_.jpg",
    description:"Lightweight casual and comfortable sneakers",
    category:"Fashion"
  },
  {
    
    name:"Necklace",
    price:19199,
    image:"https://clara.in/cdn/shop/files/CSNSN6E6_1_1024x1024.jpg?v=1744796161",
    description:"Silver elegant and beautiful necklace jewellery set",
    category:"Fashion"
  },
  {
   
    name:"Maggi Noodles",
    price:115,
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY8TkKNQWjtvSfJ6ucM9MHRNytB6SGj5pRVPh-CKcRc_XFnkYoVgfyw1nPJ1hJ-HlCHJk&usqp=CAU",
    description:"Maggi 2-minute masala noodles 8 pack 560 gm",
    category:"Grocery"
  },
  {
   
    name: "Gaming Mouse",
    price: 1499,
    image: "https://www.mysocially.com/image/cache/catalog/products/1317/HyperX-Pulsefire-FPS-Pro-USB-Gaming-Mouse-Software-Controlled-RGB-Light-Effects-Macro-Customization-_9-450x519.jpg",
    description: "Ergonomic mouse with RGB lighting and fast response.",
    category:"Electronics"
  },
  {
    
    name:"Namkeen combo",
    price:299,
    image:"https://m.media-amazon.com/images/I/71cQjpQMasL._UF1000,1000_QL80_.jpg",
    description:" Combo - Haldiram's Namkeen Bhujia Sev, 150g (Pack of 2) Promo Pack",
    category:"Grocery"
  },
  {
    
    name:"Kaju Katli",
    price:799,
    image:"https://m.media-amazon.com/images/I/719rRlOjVaL._UF1000,1000_QL80_.jpg",
    description:" Traditional Sweet 400g Fine Cashew Delight Deliciously  and Creamy ",
    category:"Grocery"
  }
];

export default products;