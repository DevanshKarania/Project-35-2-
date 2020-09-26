//Create variables here
var dog,happydog;
var database;
var food,foodstock;
var feed,addFood;
var fedTime,lastFed;
var Foodobj,feedDog,addFoods;


function preload(){
dog1 = loadImage("images/dogImg.png");
dogHappy = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1000, 600);

  Foodobj = new Food();
  
  foodstock=database.ref('Food');
  foodstock.on("value",readStock);
  
  dog = createSprite(700,250,50,50);
  dog.addImage(dog1);
  dog.scale = 0.3;
  
 
  feedPet = createButton("Feed The Dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Some Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  input = createInput('Name');
  input.position(430,450);

  button = createButton("ENTER");
  button.position(482.5,480);

  var dogName = createElement('h4');

  button.mousePressed(function()
  {
    var name = input.value();
    dogName.html("The name of the dog is " +name);
    dogName.position(700,300);
  })
}


function draw() {  
  background(46,139,87);


  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);

  if(lastFed >= 12)
  {
    text("Last Fed: " +lastFed%12+ "PM",460,30);
  }
  else if(lastFed == 0)
  {
    text("Last Fed: 12 AM",460,30);
  }
  else
  {
    text("Last Fed: " +lastFed+ "AM",460,30);
  } 

  drawSprites();
  textSize(20);
  fill("blue");
  text("Food: " + foodstock,250,100);
  
}
function readStock(data){
    foodstock = data.val();
}
/*function writeStock(x){
 if(x<=0){
   x=0;
 }else{
   x=x-1;
 }

 database.ref('/').update({
   Food:x
 })
}
*/
function feedDog()
{
  dog.addImage(happyDog);

  FoodObj.updateFoodStock(FoodObj.getFoodStock()-1);
  database.ref('/').update
  ({
     Food: FoodObj.getFoodStock(),
     FeedTime: hour()
  })
}

function addFoods()
{
  foodstock++;
  database.ref('/').update
  ({
     food: foodtock
  })
}


