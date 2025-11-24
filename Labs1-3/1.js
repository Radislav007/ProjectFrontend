//Клас користувача (PascalCase) 
class UserAccount {
  constructor(surname, name, age, education, purpose, date, time) {
    this.surname = surname;
    this.name = name;
    this.age = age;
    this.education = education;
    this.purpose = purpose; 
    this.date = new Date(date); 
    this.time = time; 
  }

  _parseTime() {
    const [hours, minutes] = this.time.split(":").map(Number);
    return hours + minutes / 60;
  }
}

// Масив користувачів 
let users = [
  new UserAccount("Іваненко", "Марія", 22, "Вища", "Побажання", "2025-02-12", "10:30"),
  new UserAccount("Петренко", "Олег", 30, "Середня", "Претензія", "2025-02-25", "14:15"),
  new UserAccount("Сидоренко", "Анна", 26, "Вища", "Побажання", "2025-03-03", "20:10"),
  new UserAccount("Коваленко", "Юлія", 19, "Неповна", "Інше", "2025-02-08", "08:45"),
  new UserAccount("Мельник", "Ігор", 40, "Вища", "Претензія", "2025-02-17", "17:50"),
  new UserAccount("Ткаченко", "Людмила", 29, "Вища", "Побажання", "2025-03-01", "09:20"),
  new UserAccount("Бондар", "Сергій", 35, "Професійна", "Претензія", "2025-02-22", "12:10"),
  new UserAccount("Гончар", "Олена", 26, "Вища", "Інше", "2025-02-19", "18:30"),
  new UserAccount("Демченко", "Андрій", 22, "Вища", "Побажання", "2025-02-12", "11:00"),
  new UserAccount("Шевченко", "Катерина", 30, "Вища", "Претензія", "2025-03-03", "10:15")
];

console.log("Початковий список користувачів:");
console.table(users);

//Виведення користувачів за місяцем і часом 
function showUsersByMonthAndTime(month, targetTime) {
  let [hours, minutes] = targetTime.split(":").map(Number);
  let timeValue = hours + minutes / 60;

  let filtered = users.filter(u => {
    let userMonth = u.date.getMonth() + 1; // getMonth() => 0–11
    let userTime = u._parseTime();
    return userMonth === month && Math.abs(userTime - timeValue) <= 1; 
  });

  console.log(`\nКористувачі, що звернулись у місяці ${month} приблизно о ${targetTime}:`);
  console.table(filtered);
}

showUsersByMonthAndTime(2, "11:00");

// Середній вік та користувачі з таким віком 
let totalAge = 0;
for (let user of users) totalAge += user.age;
let avgAge = totalAge / users.length;

console.log(`\nСередній вік користувачів: ${avgAge.toFixed(1)}`);

for (let user of users) {
  if (user.age === Math.round(avgAge)) {
    console.log(`Користувач із віком ${user.age} має освіту: ${user.education}`);
  }
}

// Поділ користувачів за часом і метою 
let workStart = 9, workEnd = 18;
let classes = {
  "Претензія у робочий час": 0,
  "Побажання у робочий час": 0,
  "Інші": 0
};

for (let user of users) {
  let hour = Number(user.time.split(":")[0]);
  let purpose = user.purpose.toLowerCase();

  if (purpose.includes("претензія") && hour >= workStart && hour < workEnd) {
    classes["Претензія у робочий час"] = classes["Претензія у робочий час"] + 1;
  } 
  else if (purpose.includes("побажання") && hour >= workStart && hour < workEnd) {
    classes["Побажання у робочий час"] = classes["Побажання у робочий час"] + 1;
  } 
  else {
    classes["Інші"] = classes["Інші"] + 1;
  }
}


console.log("\nКількість користувачів у кожній категорії:");
console.table(classes);

users.sort((a, b) => {
  if (b.age !== a.age) return b.age - a.age; // спадання за віком
  return a.surname.localeCompare(b.surname); // алфавітно
});

console.log("\nВідсортований список користувачів (за віком ↓ і прізвищем ↑):");
console.table(users);
