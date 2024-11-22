console.log("+26 Реализация burger menu на обеих страницах +26");
console.log("Реализация слайдера-карусели на странице Main: +32: \n не выполнено: сохраняется только одно предыдущее состояние. Т.е. при последовательном переходе два раза влево, а потом два раза вправо, мы получим набор карточек, отличный от исходного: -4");
console.log("Реализация пагинации на странице Pets: +36 ");
console.log("Реализация попап на обеих страницах: +12");
console.log("Total: 106");
const petsJSON = `[
  {
    "name": "Jennifer",
    "img": "assets/img/pets-jennifer.webp",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Sophia",
    "img": "assets/img/pets-sophie.webp",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Woody",
    "img": "assets/img/pets-woody.webp",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
  },
  {
    "name": "Scarlett",
    "img": "assets/img/pets-scarlet.webp",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    "age": "3 months",
    "inoculations": ["parainfluenza"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Katrine",
    "img": "assets/img/pets-katrine.webp",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    "age": "6 months",
    "inoculations": ["panleukopenia"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Timmy",
    "img": "assets/img/pets-timmy.webp",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    "age": "2 years 3 months",
    "inoculations": ["calicivirus", "viral rhinotracheitis"],
    "diseases": ["kidney stones"],
    "parasites": ["none"]
  },
  {
    "name": "Freddie",
    "img": "assets/img/../img/pets-freddie.webp",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    "age": "2 months",
    "inoculations": ["rabies"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Charly",
    "img": "assets/img/pets-charly.webp",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    "age": "8 years",
    "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
    "diseases": ["deafness", "blindness"],
    "parasites": ["lice", "fleas"]
  }
]`;


const iconMenu = document.querySelector(".header__icon");
const menu = document.querySelector(".menu");
const slider = document.querySelector(".our-friends__cards-body");
const petsSlider = document.querySelector(".pets__cards-body");
const wrapper = document.querySelector(".wrapper");
const petsBtnNext = document.querySelector(".pets__btn_next");
const petsBtnPrev = document.querySelector(".pets__btn_prev");
const petsBtnStart = document.querySelector(".pets__btn_start");
const petsBtnEnd = document.querySelector(".pets__btn_end");
const viewCount = document.querySelector(".pets__num");
const title = document.title;
let translatePets = 0;
let startTranslate = -1040;
let pets = JSON.parse(petsJSON);
let mainSliderState = [];
let countP = 0;
let countN = 0;
let petsN = 5;
let petsP = 0;
let flagP = 0;
let size = 0;
let countPage = 0;
let countView = 1;
let pop = document.createElement("div");


function random(min, max) {
  let rand = [];
  for(let i = 0; i < max + 1; i++){
    while(rand.length != max + 1){
      let n = Math.floor(Math.random() * (max - min + 1)) + min;
      if(rand.indexOf(n) == -1) rand.push(n);
    };
  }
  rand.push(rand[0]);
  return rand;
}
function createCard(img, name) {
    let el = document.createElement("div");
    el.classList = 'card';
    el.innerHTML = `
        <div class="card__image">
            <img src="${img}" alt="${name}" class="card__img">
        </div>
        <div class="card__title">${name}</div>
        <div class="card__button">
            Learn more
        </div>
    `;
    return el;
}

function createMainPets (pets){
 let masPets = [];
 if(title == "Main"){
    let rand = random(0, pets.length - 1)
    for(let i = 0; i < pets.length; i++){
    masPets.push(createCard(pets[rand[i]].img, pets[rand[i]].name));
    }
  }

 if(title == "Pets"){
    changeCountPage();
    viewCount.innerHTML = countView;
    for (let j = 0; j < 6; j++) {
      let rand = random(0, pets.length - 1)
      for(let i = 0; i < pets.length; i++){
      masPets.push(createCard(pets[rand[i]].img, pets[rand[i]].name));
      }
    }
 }

 mainSliderState = masPets;
 return masPets;
}

function changeCountPage(){
  if(parseInt(window.innerWidth) >= 1280) countPage = 5;
  if(parseInt(window.innerWidth) < 1280 && parseInt(window.innerWidth) >= 768 ) countPage = 7;
  if(parseInt(window.innerWidth) < 768 ) countPage = 15;
  petsN = countPage;
}

function insertHtml(node, masPets) {
 for(let i = 0; i < masPets.length; i++) {
    node.append(masPets[i]);
  }
}

function changeMainSlider(state, nextPrev){
  let mas = [];
  slider.style.transition = 'none';
  if(nextPrev == 0) { 
    if(parseInt(window.innerWidth) >= 1280){
      if (flagP < 1) {
        mas.push(state[3],state[4],state[5],state[6],state[7],state[0],state[1],state[2]);
        startTranslate = startTranslate + 1080;
       }
       if (flagP  >= 1) {
        mas.push(state[2],state[3],state[4],state[5],state[6],state[7],state[0],state[1]);
        startTranslate = 40;
        flagP = 0;
       }
    }
    if(parseInt(window.innerWidth) < 1280 && parseInt(window.innerWidth) >= 768){
      mas.push(state[2],state[3],state[4],state[5],state[6],state[7],state[0],state[1]);
      startTranslate = -290;    
    }
    if(parseInt(window.innerWidth) < 768){
      mas.push(state[1],state[2],state[3],state[4],state[5],state[6],state[7],state[0]);
      startTranslate = -620; 
    }
    slider.style.transform = `translateX(${startTranslate}px)`;
  };

  if(nextPrev == 1) {
    if(parseInt(window.innerWidth) >= 1280){
      if (flagP == 1) mas.push(state[6],state[7],state[0],state[1],state[2],state[3],state[4],state[5]);
      if (flagP > 1) mas.push(state[5],state[6],state[7],state[0],state[1],state[2],state[3],state[4]);
      startTranslate = -1760;
    }
    if(parseInt(window.innerWidth) < 1280 && parseInt(window.innerWidth) >= 768){
      mas.push(state[6],state[7],state[0],state[1],state[2],state[3],state[4],state[5]);
      startTranslate = -1530;
    }
    if(parseInt(window.innerWidth) < 768){
      mas.push(state[7],state[0],state[1],state[2],state[3],state[4],state[5],state[6]);
      startTranslate = -1240; 
    }
    slider.style.transform = `translateX(${startTranslate}px)`;  
  };
    mainSliderState = mas;
    for(let i = 0; i < mas.length; i++) {
      slider.append(mas[i]);
    }
}

function nextPrevMain(nextPrev) {
  let c = () =>{
    if (nextPrev == 0) {
      if(parseInt(window.innerWidth) >= 1280){
        startTranslate = startTranslate - 1080;
      }
      if(parseInt(window.innerWidth) < 1280 && parseInt(window.innerWidth) >= 768){
        startTranslate = startTranslate - 620;
      }
      if(parseInt(window.innerWidth) < 768){
        startTranslate = startTranslate - 310;
      }
    } 
    if (nextPrev == 1){
      if(parseInt(window.innerWidth) >= 1280){
        startTranslate = startTranslate + 1080;
      }
      if(parseInt(window.innerWidth) < 1280 && parseInt(window.innerWidth) >= 768){
       startTranslate = startTranslate + 620;
      }
      if(parseInt(window.innerWidth) < 768){
       startTranslate = startTranslate + 310;
      }
    } 

    slider.style.transition = 'all 0.3s ease 0s';
    slider.style.transform = `translateX(${startTranslate}px)`;
  }
  if (nextPrev == 0) {
    changeMainSlider(mainSliderState, nextPrev);
    setTimeout(c, 100);
  }
  if (nextPrev == 1) {
    changeMainSlider(mainSliderState, nextPrev);
    setTimeout(c, 100);
  }
};

function menuToggle() {
  if(parseInt(window.innerWidth) < 768){
    document.body.classList.toggle("_lock");
    menu.classList.toggle("_active");
    iconMenu.classList.toggle("_active");
  }
};

function popUp(namePets){
  let index = (namePets) =>{
    for(let i = 0; i < pets.length; i++){
      pets[i].name;
      if (pets[i].name == namePets){
        return i;
      } 
    }
  };
  let i = index(namePets);
  pop.classList = 'popup';
  pop.innerHTML = `
      <div class="popup__body">
              <div class="popup__image">
                  <img src="${pets[i].img}" alt="${pets[i].name}" class="popup__img">
              </div>
              <div class="popup__info">
                  <h3 class="popup__title">
                      ${pets[i].name}
                  </h3>
                  <h4 class="popup__subtitle">
                      ${pets[i].type} - ${pets[i].breed}
                  </h4>
                  <p class="popup__text">
                      ${pets[i].description}
                  </p>
                  <ul class="popup__items">
                      <li class="popup__item">
                          <span>Age:</span> ${pets[i].age}
                      </li>
                      <li class="popup__item">
                          <span>Inoculations:</span> ${pets[i].inoculations}
                      </li>
                      <li class="popup__item">
                          <span>Diseases:</span>  ${pets[i].diseases}
                      </li>
                      <li class="popup__item">
                          <span>Parasites:</span> ${pets[i].parasites}
                      </li>
                  </ul>
                  <div class="popup__closed"></div>
              </div>
          </div>
  `;
  document.body.classList.toggle("_lock");
  wrapper.prepend(pop);
}

function petsNextPrev(nextPrev) {
  /*size = 0;*/
  if(nextPrev == 0){
    if(parseInt(window.innerWidth) >= 1280) translatePets = translatePets - 928;
    if(parseInt(window.innerWidth) < 1280) translatePets = translatePets - 1392;
    countView++;
    viewCount.innerHTML = countView;  
  }
  if(nextPrev == 1){
    if(parseInt(window.innerWidth) >= 1280) translatePets = translatePets + 928;
    if(parseInt(window.innerWidth) < 1280) translatePets = translatePets + 1392;
    countView--;
    viewCount.innerHTML = countView;  
  }
  petsSlider.style.transform = `translateY(${translatePets}px)`;
}

function changeBtnNext() {
  if (petsN <= countPage && petsN > 0){
    petsP++;
    if (petsBtnPrev.classList.contains("pets__btn_inactive")){
      petsBtnPrev.classList.toggle("pets__btn_inactive");
      petsBtnPrev.classList.toggle("pets__btn_active");
      petsBtnStart.classList.toggle("pets__btn_inactive");
      petsBtnStart.classList.toggle("pets__btn_active");
    }
    petsN--;
  }
  if(petsN == 0) {
    petsBtnNext.classList.toggle('pets__btn_inactive');
    petsBtnNext.classList.toggle('pets__btn_active');
    petsBtnEnd.classList.toggle('pets__btn_inactive');
    petsBtnEnd.classList.toggle('pets__btn_active');
  }
}

function changeBtnPrev() {
  if (petsP <= countPage && petsP > 0){
    petsN++;
    if (petsBtnNext.classList.contains("pets__btn_inactive")){
      petsBtnNext.classList.toggle("pets__btn_inactive");
      petsBtnNext.classList.toggle("pets__btn_active");
      petsBtnEnd.classList.toggle("pets__btn_inactive");
      petsBtnEnd.classList.toggle("pets__btn_active");
    }
    petsP--;
  }
  if(petsP == 0) {
    petsBtnPrev.classList.toggle('pets__btn_inactive');
    petsBtnPrev.classList.toggle('pets__btn_active');
    petsBtnStart.classList.toggle('pets__btn_inactive');
    petsBtnStart.classList.toggle('pets__btn_active');
  }
}

window.addEventListener('resize', () => {
  if(parseInt(window.innerWidth) >= 768 && menu.classList.contains('_active')){
      document.body.classList.toggle("_lock");
      menu.classList.toggle("_active");
      iconMenu.classList.toggle("_active");
  }  
  if (title == "Main") {
    if(parseInt(window.innerWidth) >= 1280 && flagP < 1) {
      slider.style.transform = `translateX(${-1040}px)`;
    }
    if(parseInt(window.innerWidth) >= 1280 && flagP >= 1) {
      slider.style.transform = `translateX(${-680}px)`;
    }    
    if(parseInt(window.innerWidth) < 1280 && parseInt(window.innerWidth) >= 768 ) {
      slider.style.transform = `translateX(${-910}px)`;
    }
    if(parseInt(window.innerWidth) < 760 ) {
      slider.style.transform = `translateX(${-930}px)`;
    }
  } 
  if (title == "Pets") {
    translatePets  = 0;
    petsSlider.style.transform = `translateY(${translatePets}px)`;
    if (petsBtnPrev.classList.contains("pets__btn_active")){
      petsBtnPrev.classList.toggle('pets__btn_inactive');
      petsBtnPrev.classList.toggle('pets__btn_active');
      petsBtnStart.classList.toggle('pets__btn_inactive');
      petsBtnStart.classList.toggle('pets__btn_active');
    }
    if (petsBtnNext.classList.contains("pets__btn_inactive")){
      petsBtnNext.classList.toggle("pets__btn_inactive");
      petsBtnNext.classList.toggle("pets__btn_active");
      petsBtnEnd.classList.toggle("pets__btn_inactive");
      petsBtnEnd.classList.toggle("pets__btn_active");
    }
    petsP = 0;
    changeCountPage();
    petsN = countPage;
    countView = 1;
    viewCount.innerHTML = countView;
  } 
});
 
document.addEventListener("click", e => {
  const targetElement = e.target;
  if (targetElement.closest(".header__icon")) {
    menuToggle();
  };
  if (targetElement.closest(".menu__link")) {
    menuToggle();
  };
  if (targetElement.classList.contains("menu")) {
    menuToggle();
  };
  if (targetElement.classList.contains("card") || targetElement.classList.contains("card__img") || targetElement.classList.contains("card__title") || targetElement.classList.contains("card__button")) {
    let card = targetElement.closest('.card');
    popUp(card.querySelector('.card__title').innerHTML);
  };
  if (targetElement.classList.contains("popup__closed") || targetElement.classList.contains("popup")) {
    pop.remove();
    document.body.classList.toggle("_lock");
  };
  if (targetElement.closest(".arrow_left")) {
    countP++;
    flagP ++;
    nextPrevMain(1);
  };
  if (targetElement.closest(".arrow_right")) {
    countN++;
    nextPrevMain(0)
  }; 
  if (targetElement.closest(".pets__btn_next")) {
    changeBtnNext();
    petsNextPrev(0);
  };
  if (targetElement.closest(".pets__btn_prev")) {
    changeBtnPrev();
    petsNextPrev(1);
  };
  if (targetElement.closest(".pets__btn_end")) {
    if(parseInt(window.innerWidth) >= 1280) translatePets  = -4640;
    if(parseInt(window.innerWidth) < 1280 && parseInt(window.innerWidth) >= 768) translatePets  = -9744;
    if(parseInt(window.innerWidth) < 768) translatePets  = -20880;
    petsSlider.style.transform = `translateY(${translatePets}px)`;
    petsBtnNext.classList.toggle('pets__btn_inactive');
    petsBtnNext.classList.toggle('pets__btn_active');
    petsBtnEnd.classList.toggle('pets__btn_inactive');
    petsBtnEnd.classList.toggle('pets__btn_active');
    if (petsBtnPrev.classList.contains("pets__btn_inactive")){
      petsBtnPrev.classList.toggle("pets__btn_inactive");
      petsBtnPrev.classList.toggle("pets__btn_active");
      petsBtnStart.classList.toggle("pets__btn_inactive");
      petsBtnStart.classList.toggle("pets__btn_active");
    }
    petsP = countPage;
    petsN = 0;
    countView = countPage + 1;
    viewCount.innerHTML = countView;    
  };
  if (targetElement.closest(".pets__btn_start")) {
    translatePets  = 0;
    petsSlider.style.transform = `translateY(${translatePets}px)`;
    petsBtnPrev.classList.toggle('pets__btn_inactive');
    petsBtnPrev.classList.toggle('pets__btn_active');
    petsBtnStart.classList.toggle('pets__btn_inactive');
    petsBtnStart.classList.toggle('pets__btn_active');
    if (petsBtnNext.classList.contains("pets__btn_inactive")){
      petsBtnNext.classList.toggle("pets__btn_inactive");
      petsBtnNext.classList.toggle("pets__btn_active");
      petsBtnEnd.classList.toggle("pets__btn_inactive");
      petsBtnEnd.classList.toggle("pets__btn_active");
    }
    petsP = 0;
    petsN = countPage;
    countView = 1;
    viewCount.innerHTML = countView;  
  }
});

if (title == "Main") insertHtml(slider, createMainPets(pets));
if (title == "Pets") insertHtml(petsSlider, createMainPets(pets));


