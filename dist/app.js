'use strict';

const cuisines = {
  indian: {label:'CURRIES, TANDOOR & MORE', image:'mutton-roganjosh', caption:'Mutton Roganjosh', dishes:[['Veg Tandoori Platter',375,'Paneer tikka, malai tikka, stuffed aloo & vegetable seekh kebab'],['Paneer Tikka Lababdar',425,'From our Indian main course'],['Murgh Makhanwala',545,'Boneless · served as a main course'],['Mutton Roganjosh',375,'Two-piece portion']]},
  chinese: {label:'CRISP, TANGY & WOK-TOSSED',image:'drums-of-heaven',caption:'Drums of Heaven',dishes:[['Drums of Heaven',300,'Classic · also available in tangy tomato sauce'],['Chilly Paneer',250,'From our vegetarian starters'],['Shredded Chicken in Hot Garlic Sauce',450,'From our Chinese main course'],['Vegetable Chilly Garlic Noodles',225,'From our noodles & fried rice selection']]},
  continental:{label:'PASTA, PIZZA & COMFORT FOOD',image:'pasta',caption:'Pasta from our kitchen',dishes:[['Spaghetti Aglio e Olio',275,'From our spaghetti selection'],['Penne in Cheese Sauce',275,'From our penne selection'],['Veggie Feast Pizza',280,'Onion, capsicum, tomato, corn, mushroom & black olives'],['Chicken Tikka Tortilla Wrap',229,'From our comfort food selection']]},
  drinks:{label:'SOMETHING COOL. SOMETHING SWEET.',image:'garden-seating',caption:'Stay for a little longer',dishes:[['Virgin Mojito',150,'From our quenchers selection'],['Cold Coffee',150,'From our shakes selection'],['Masala Tea',50,'From our hot beverages selection'],['Hot Chocolate Fudge',150,'A sweet finish to your meal']]}
};
const moreMenu = [
  ['Indian & grills', [['Veg Tandoori Platter',375],['Non-Veg Tandoori Platter',425],['Paneer Tikka Classic',300],['Dahi Kebab',325],['Tandoori Murgh Classic',300],['Mutton Seekh Kebab',300],['Dal Dera Peshawari',300],['Paneer Tikka Lababdar',425],['Murgh Makhanwala — Boneless',545],['Mutton Roganjosh',375],['Subz Biryani',260],['Murgh Biryani',320],['Garlic Naan',90],['Butter Naan',80]]],
  ['Chinese & Thai', [['Drums of Heaven — Classic',300],['Chilly Paneer',250],['Honey Chilly Potatoes',250],['Vegetable Manchurian Gravy',395],['Chilly Chicken Gravy',450],['Chicken in Hot Garlic Sauce',450],['Vegetable Chilly Garlic Noodles',225],['Chicken Fried Rice',240],['Vegetable Thai Green Curry with Rice',450],['Chicken Thai Red Curry with Rice',450]]],
  ['Continental & comfort food', [['Spaghetti Aglio e Olio',275],['Pasta Napolitana',275],['Penne in Cheese Sauce',275],['Penne in Mixed Sauce',275],['Veggie Feast Pizza',280],['Chicken Tikka Pizza',280],['Chicken Tikka Tortilla Wrap',229],['Paneer Tikka Tortilla Wrap',229],['Cheesy Spinach & Corn Rolls',325],['Herbed Potato Wedges',195]]],
  ['Sips & sweets', [['Virgin Mojito',150],['Watermelon Mojito',150],['Fresh Lime Soda',100],['Lemon Iced Tea',100],['Cold Coffee',150],['Oreo Shake',160],['Cappuccino',90],['Masala Tea',50],['Hot Chocolate Fudge',150],['Ice Cream Sundae',150]]]
];

const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectCuisine(tab) {
  const cuisine = cuisines[tab.dataset.cuisine];
  tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1;});
  document.querySelector('#menu-panel').setAttribute('aria-labelledby',tab.id);
  const img = document.querySelector('#cuisine-image');
  img.src=`assets/${cuisine.image}.webp`; img.alt=cuisine.caption;
  document.querySelector('#cuisine-caption').textContent=cuisine.caption;
  document.querySelector('#cuisine-label').textContent=cuisine.label;
  document.querySelector('#dish-list').replaceChildren(...cuisine.dishes.map(([name,price,description])=>{
    const row=document.createElement('div');row.className='dish';
    const title=document.createElement('h3');title.textContent=name;
    const cost=document.createElement('span');cost.textContent=`₹${price}`;
    const detail=document.createElement('p');detail.textContent=description;
    row.append(title,cost,detail);return row;
  }));
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>selectCuisine(tab));
  tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight')next=(index+1)%tabs.length;
    if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=tabs.length-1;
    if(next!==undefined){event.preventDefault();selectCuisine(tabs[next]);tabs[next].focus();}
  });
});

const navToggle=document.querySelector('.nav-toggle');
const mobileNav=document.querySelector('#mobile-nav');
function closeNav(){navToggle.setAttribute('aria-expanded','false');navToggle.setAttribute('aria-label','Open navigation');mobileNav.hidden=true;}
navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';navToggle.setAttribute('aria-expanded',String(open));navToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');mobileNav.hidden=!open;});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav();});
window.matchMedia('(min-width: 701px)').addEventListener('change',e=>{if(e.matches)closeNav();});

const menuDialog=document.querySelector('#menu-dialog');
document.querySelector('#expanded-menu').replaceChildren(...moreMenu.map(([name,dishes])=>{
  const section=document.createElement('section');
  const title=document.createElement('h3');title.textContent=name;section.append(title);
  dishes.forEach(([name,price])=>{const row=document.createElement('div');row.className='expanded-dish';const dish=document.createElement('span');dish.textContent=name;const cost=document.createElement('span');cost.textContent=`₹${price}`;row.append(dish,cost);section.append(row);});
  return section;
}));
function openDialog(dialog){closeNav();dialog.showModal();document.body.classList.add('dialog-open');}
document.querySelector('#open-menu').addEventListener('click',()=>openDialog(menuDialog));
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
  dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
});

const gallery=[...document.querySelectorAll('.gallery-item')];
const photoDialog=document.querySelector('#photo-dialog');
let photoIndex=0;
function showPhoto(index){photoIndex=(index+gallery.length)%gallery.length;const photo=gallery[photoIndex];const img=document.querySelector('#lightbox-image');img.src=photo.dataset.image;img.alt=photo.querySelector('img').alt;document.querySelector('#lightbox-caption').textContent=`${photoIndex+1} / ${gallery.length} — ${photo.dataset.caption}`;}
gallery.forEach((photo,index)=>photo.addEventListener('click',()=>{showPhoto(index);openDialog(photoDialog);}));
document.querySelector('.photo-prev').addEventListener('click',()=>showPhoto(photoIndex-1));
document.querySelector('.photo-next').addEventListener('click',()=>showPhoto(photoIndex+1));
photoDialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(photoIndex-1);}if(event.key==='ArrowRight'){event.preventDefault();showPhoto(photoIndex+1);}});
document.querySelector('#year').textContent=new Date().getFullYear();
