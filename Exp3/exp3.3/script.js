// Base Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `Hello, my name is ${this.name}.`;
  }
}

// Student Class
class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }

  introduce() {
    return `Hello, my name is ${this.name} and I'm studying ${this.major}.`;
  }
}

// Teacher Class
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  introduce() {
    return `Hello, my name is ${this.name} and I teach ${this.subject}.`;
  }
}

// Objects
const person = new Person("Alex Johnson", 30);
const student = new Student("Emma Watson", 20, "Computer Science");
const teacher = new Teacher("Dr. James Wilson", 45, "Mathematics");

// UI Render Function
function createCard(obj, type, extraLabel, extraValue) {

  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <h2>${obj.name} (${type})</h2>
    <p><b>Age:</b> ${obj.age}</p>
    <p class="info">${obj.introduce()}</p>
    ${extraLabel ? `<p><b>${extraLabel}:</b> ${extraValue}</p>` : ""}
  `;

  return div;
}

// Display
const container = document.getElementById("container");

container.appendChild(createCard(person, "Person"));
container.appendChild(createCard(student, "Student", "Major", student.major));
container.appendChild(createCard(teacher, "Teacher", "Teaching", teacher.subject));
