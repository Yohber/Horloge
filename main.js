var unChiffre;
var deuxChiffre;
var troisChiffre;
var quatreChiffre;
var monHorloge;
var time;
var reset = true;
afficher();

function afficher(){
console.log("afficher:" + reset);
if (!reset){
   effacer();
}
console.log("afficherDessousIf:" + reset);
var dejaAffiche = document.querySelectorAll("span");
   time = recupTime();
   /*time = "8888";*/
   unChiffre = splitage(0, time);
   deuxChiffre = splitage(1, time);
   troisChiffre = splitage(2, time);
   quatreChiffre = splitage(3, time);
   monHorloge = unChiffre+ "" + deuxChiffre+ "H" + troisChiffre + "" + quatreChiffre;
   document.getElementById("fiche").innerText = monHorloge;
   point();
   unos();
   function unos(){
      graph(unChiffre, 1);
      dos();
   }
   function dos(){
      graph(deuxChiffre, 2);
      tres();
   }
   function tres(){
      graph(troisChiffre, 3);
      quatro();
   }
   function quatro(){
      graph(quatreChiffre, 4);
   }
   detection();
}
function recupTime(){
   var date = new Date();
   var heure = date.getHours();
   var minutes = date.getMinutes();
   if (heure <10){
      heure = "0"+heure;
   }
   if (minutes <10){
      minutes = "0"+minutes;
   }
      return heure+""+minutes;
}
function splitage(rang, time){
   var tableau = time.split("");
   return tableau[rang]
}
function graph(chiffre, rang){
   var largeur = 500;
   switch (rang){
      case 1:
         var offset=((largeur/100*1)-10);
      break;
      case 2:
         var offset=(largeur/100*18);
      break;
      case 3:
         var offset=(largeur/100*52);
      break;
      case 4:
         var offset=(largeur/100*72);
      break;
   }
   barone = span(["barone", (offset+35), 87, "center", "green", "horizontal", 2]);
   bartwo = span(["bartwo", (offset+10), 115, "center", "green", "vertical", 2]);
   barthree = span(["barthree", (offset+61), 115, "center", "green", "vertical", 2]);
   barfour = span(["barfour", (offset+35), 143, "center", "green", "horizontal", 2]);
   barfive = span(["barfive", (offset+10), 171, "center", "green", "vertical", 2]);
   barsix = span(["barsix", (offset+61), 171, "center", "green", "vertical", 2]);
   barseven = span(["barseven", (offset+35), 200, "center", "green", "horizontal", 2]);
   reset = false;
   rotate([barone, chiffre, "a"]);
   rotate([bartwo, chiffre, "f"]);
   rotate([barthree, chiffre, "b"]);
   rotate([barfour, chiffre, "g"]);
   rotate([barfive, chiffre, "e"]);
   rotate([barsix, chiffre, "c"]);
   rotate([barseven, chiffre, "d"]); 
}
function span(objet){
   objet[0] = document.createElement("span");
   document.getElementById("myContainer").appendChild(objet[0]);
   objet[0].style.backgroundColor = objet[4];
   objet[0].innerText = "---------";
   objet[0].style.top = objet[2];
   objet[0].style.left = objet[1]
   objet[0].style.borderRadius = "10px";
   objet[0].style.position = "absolute";
   objet[0].style.transition = "transform 3s";
   objet[0].style.transformOrigin = objet[3];
   objet[0].classList.add("tous");
   if (objet[5] == "vertical"){
      objet[0].style.transform = "rotateZ(90deg)";
   }
   objet[0].style.zIndex = objet[6];
   return objet[0];
}
function rotate([element, chiffre, digit]){
   element.classList.add("rotate");
   if (digit=="b" || digit=="c" || digit=="e" || digit=="f"){
      element.classList.add("rotate2");
   }
   if (digit=="a" && (chiffre==1 || chiffre==4)){
      element.classList.add("invisible");
   }
   if (digit=="b" && (chiffre==5 || chiffre==6)){
   element.classList.add("invisible2");
   }
   if (digit=="c" && (chiffre==2)){
   element.classList.add("invisible2");
   }
   if (digit=="d" && (chiffre==1 || chiffre==4 || chiffre==7)){
   element.classList.add("invisible");
   }
   if (digit=="e" && (!(chiffre==0) && !(chiffre==2) && !(chiffre==6) && !(chiffre==8))){
   element.classList.add("invisible2");
   }
   if (digit=="f" && (chiffre==1 || chiffre==2 || chiffre==3 || chiffre==7)){
   element.classList.add("invisible2");
   }
   if (digit=="g" && (chiffre==0 || chiffre==1 || chiffre==7)){
   element.classList.add("invisible");
   }
}
function point(){
   var point1 = document.createElement("span");
   var point2 = document.createElement("span");
   document.getElementById("myContainer").appendChild(point1);
   document.getElementById("myContainer").appendChild(point2);
   point1.style.backgroundColor = "green";
   point2.style.backgroundColor = "green";
   point1.innerText = "----";
   point2.innerText = "----";
   point1.style.top = "120px";
   point2.style.top = "180px";
   point1.style.left = 500/100*49;
   point2.style.left = 500/100*49;
   point1.style.borderRadius = "50%";
   point2.style.borderRadius = "50%";
   point1.style.position = "absolute";
   point2.style.position = "absolute";
}
function effacer(){
   console.log("effacer:" + reset);
   var elements = document.getElementsByClassName('tous');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    reset = true;
    console.log("effacerfin:" + reset);
   return;
}

function detection(){
   console.log("detectiôn:" + reset);
   var tempsEnregistre = recupTime();
   console.log(tempsEnregistre);
   var temporisation = setInterval(recharger, 1000);
   function recharger(){
      var tempsNouveau = recupTime();
      if (tempsEnregistre !== tempsNouveau){
         tempsEnregistre = recupTime();
         reset = false;
         console.log("findetection:" + reset);
         afficher();
      }
   }
}