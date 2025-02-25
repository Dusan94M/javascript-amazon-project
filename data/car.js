export class Car { 
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false

  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = carDetails.speed;
    this.isTrunkOpen = carDetails.isTrunkOpen;
  }

  displayInfo(){
    console.log(`${this.#brand} ${this.#model} ${this.speed} km/h Trunk: ${this.isTrunkOpen}`);
  }

  go(){
    if(this.speed === 200){
      console.log('max speed');
    }else{
      this.speed += 5;
    }
  };

  break(){
    if(this.speed === 0){
      console.log('already min speed')
    }else{
      this.speed -= 5;
    }
  }

  openTrunk(){
    if(this.speed === 0){
      this.isTrunkOpen = true;
    }
  }

  closeTrunk(){
      this.isTrunkOpen = false;
  }

};

class RaceCar extends Car{
  acceleration;

  constructor(carDetails){
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go(){
    this.speed += this.acceleration;

    if(this.speed > 300){
      this.speed = 300;
    }
  }

  openTrunk(){
    console.log(`race car doesn't have trunk`);
  }

  openTrunk(){
    console.log(`race car doesn't have trunk`);
  }
}

const car1 = new Car({
  brand: 'Toyota',
  model:'Corrola',
  speed: 0
});

const car2 = new Car({
  brand: 'Tesla',
  model:'Model 3',
  speed: 0
});

const car3 = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  speed: 0,
  acceleration: 20
});


car3.go();
car3.closeTrunk();
car3.displayInfo();

car1.closeTrunk();
car1.displayInfo()

car2.openTrunk();
car2.displayInfo();

car1.go();
car1.go();
car1.go();
car1.go();

car1.break();

car2.go();
car2.go();
car2.go();

car2.break();
car2.break();

//car1.displayInfo();
//car2.displayInfo();


//console.log(car1);
//console.log(car2);