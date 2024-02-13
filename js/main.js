const user = {
  firstName: 'Oleksii',
  lastName: 'S',
  getFullName() {
    console.log(`User's fullname: ${this.firstName} ${this.lastName}`);
  },
};

const user2 = {
  firstName: 'Oleksandra',
  lastName: 'Kitsyunka',
};

const pet = {
  type: 'dog',
  nickName: 'Chappi',
};

function getInfo() {
  if (this.firstName && this.lastName) {
    console.log(this.firstName, this.lastName);
  } else if (this.nickName) {
    console.log(`My ${this.type}'s name is ${this.nickName}`);
  }
}

const getUserInfo = getInfo.bind(user);
const getPetInfo = getInfo.bind(pet);
getUserInfo();
getPetInfo();

const sasha = user.getFullName.bind(user2);
const lyosha = user.getFullName.bind(user);

lyosha();
sasha();
sasha.call(user);
user.getFullName.call(user2);

const customer = {
  firstName: 'Jacob',
  lastName: 'Mercer',
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

function makeMessage(callback) {
  // callback() — це виклик методу getFullName в глобальному контексті
  const username = callback();
  console.log(`Processing an application from ${username}`);
}

makeMessage(customer.getFullName.bind(customer)); // TypeError: Cannot read properties of undefined (reading 'firstName')

// const animal = {
//   legs: 4,
// };

// const dog = Object.create(animal);
// dog.name = 'Mango';
// dog.legs = 5;

// const cow = Object.create(animal);
// // console.log(dog.legs);
// // console.log(cow.legs);
// console.log(cow.__proto__);
// const cat = (n) => console.log(n);

// const pet = cow.__proto__;
// console.log(pet);

// console.log(pet.isPrototypeOf(cow));

// class Human {
//   static #people = [];
//   constructor(firstName, lastName, age, town, country, sweetHeartName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.age = age;
//     this.town = town;
//     this.countryOfResidence = country;
//     this.sweetHeartName = sweetHeartName;
//     Human.#people.push(this);
//   }

//   static showUsers(parameter, value) {
//     return Human.#filterUsers(parameter, value);
//   }

//   static #filterUsers(parameter, value) {
//     if (!parameter || !value) {
//       console.log(Human.#people);
//       return Human.#people;
//     }
//     console.log(Human.#people.filter(x => x[parameter] === value));
//     return Human.#people.filter(x => x[parameter] === value);
//   }

//   isInLoveWith(person) {
//     if (this.sweetHeartName === person.firstName) {
//       console.log(`${this.firstName} is in love with ${person.firstName} 💘`);
//       return true;
//     } else {
//       console.log(
//         `${this.firstName} is not in love with ${person.firstName} 🤷‍♂️`,
//       );
//       return false;
//     }
//   }

//   isAmbigouslyInLove(person) {
//     const isInLove = this.isInLoveWith(person);
//     if (isInLove && person.sweetHeartName === this.firstName) {
//       console.log(`${this.firstName} + ${person.firstName} = ❤️‍🔥`);
//       return true;
//     } else {
//       console.log(
//         `Well, seems like ${person.firstName} doesn't love ${this.firstName} 💔`,
//       );
//       return false;
//     }
//   }

//   findMatch() {
//     let match;

//     Human.#people.forEach(person => {
//       if (
//         person.sweetHeartName === this.firstName &&
//         this.sweetHeartName === person.firstName
//       ) {
//         match = person.firstName;
//       }
//     });

//     console.log(
//       match
//         ? `There is a huge chance of ${this.firstName} being happy together with ${match} 😍`
//         : `This is so heartbreaking, but we couldn't find a match for ${this.firstName} 😔`,
//     );
//   }
// }

// const sasha = new Human('Sasha', 'Zironka', 30, 'Bordeaux', 'France', 'Lyosha');
// const lyosha = new Human('Lyosha', 'Zai', 35, 'Bordeaux', 'France', 'Sasha');
// const olena = new Human('Olena', 'Nihto', 30, 'Misto', 'Krayina', 'Lyosha');
// const vasya = new Human('Vasya', 'Nihto', 35, 'Misto', 'Krayina', 'Sasha');
// const katya = new Human('Katya', 'Nihto', 30, 'Misto', 'Krayina', 'Fedya');
// const fedya = new Human('Fedya', 'Nihto', 35, 'Misto', 'Krayina', 'Katya');
// const vitya = new Human('Vitya', 'Maliy', 24, 'Kyiv', 'Ukraine', 'Vika');
// const vika = new Human('Vika', 'Htos', 24, 'Kyiv', 'Ukraine', 'Vitya');

// // lyosha.isInLoveWith(sasha);
// // sasha.isInLoveWith(lyosha);
// lyosha.isAmbigouslyInLove(sasha);

// // vasya.isInLoveWith(sasha);
// vasya.isAmbigouslyInLove(sasha);

// // olena.isInLoveWith(lyosha);
// olena.isAmbigouslyInLove(lyosha);

// sasha.findMatch();
// lyosha.findMatch();
// olena.findMatch();
// vasya.findMatch();
// katya.findMatch();
// fedya.findMatch();
// vitya.findMatch();

// // Human.showUsers();

// Human.showUsers('age', 35);

// Human.showUsers('age', 24);

// Human.showUsers('town', 'Bordeaux');
// Human.showUsers();
// Human.showUsers('firstName', 'Lyosha');
