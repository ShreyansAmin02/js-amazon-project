class Car {
  #brand;
  #model;
  speed = 0;
  topSpeed = 200;
  isTrunkOpen = false;
  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }
  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
    console.log(`Brand: ${this.#brand}, Model: ${this.#model}, Speed: ${this.speed}, Trunk: ${trunkStatus}`);
  };
  go() {
    if (!this.isTrunkOpen) {
      this.speed += 5;
    }
    // Limit the speed to 200.
    if (this.speed > 200) {
      this.speed = 200;
    }
  }
  brake() {
    this.speed -= 5;
    // Limit the speed to 0.
    if (this.speed < 0) {
      this.speed = 0;
    }
  }
  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }

  }
  closeTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = false;
    }
  }

}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});
const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});


class RaceCar extends Car {
  acceleration;
  topSpeed = 300;
  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    if (this.speed < this.topSpeed) {
      this.speed += this.acceleration;
    }
  }
  openTrunk() {
    console.log('Race cars do not have a trunk.');
  }
  closeTrunk() {
    console.log('Race cars do not have a trunk.');
  }
}


const raceCar = new RaceCar({ brand: 'McLaren', model: 'F1', acceleration: 20 })
console.log(car1);
console.log(car2);
car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();
// Trunk should not open since the car is moving.
console.log('Trunk should not open since the car is moving');
car1.openTrunk();
car1.displayInfo();
car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();
// Trunk should open since the car is not moving.
console.log("Trunk should open since the car is not moving.");
car2.openTrunk();
// Car should not go since the trunk is open.
console.log("Car should not go since the trunk is open.");
car2.go();
car2.displayInfo();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();