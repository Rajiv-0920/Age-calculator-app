const dayEl = document.querySelector(".day input");
const monthEl = document.querySelector(".month input");
const yearEl = document.querySelector(".year input");

const inputEl = document.querySelectorAll("input");

const btnEl = document.querySelector(".hr img");

const label = document.querySelectorAll("label");
const span = document.querySelectorAll(".date span");
const p = document.querySelectorAll(".date p");

const birthYear = document.querySelector("#year");
const birthMonth = document.querySelector("#month");
const birthDay = document.querySelector("#day");

birthDay.innerHTML = "--";
birthMonth.innerHTML = "--";
birthYear.innerHTML = "--";

var inputDays;

btnEl.addEventListener("click", () => {
  inputDays = getDaysInMonth(monthEl.value, yearEl.value);
  var cY = new Date().getFullYear();
  var cM = new Date().getMonth() + 1;
  var cD = new Date().getDate();
  inputEl.forEach((i, index) => {
    if (!i.value || +i.value === 0) {
      i.classList.add("error");
      span[index].classList.add("error");
      label[index].classList.add("error");
      birthDay.innerHTML = "--";
      birthMonth.innerHTML = "--";
      birthYear.innerHTML = "--";
      return;
    } else {
      if (i.value) {
        i.classList.remove("error");
        span[index].classList.remove("error");
        label[index].classList.remove("error");

        if (+dayEl.value < 0 || +dayEl.value > 31) {
          p[0].classList.add("error");
          return;
        } else if (
          +dayEl.value >= 32 ||
          +dayEl.value < 0 ||
          inputDays < +dayEl.value
        ) {
          p[0].classList.add("error");
        } else {
          p[0].classList.remove("error");
        }
        if (+monthEl.value < 0 || +monthEl.value > 12) {
          console.log(+monthEl.value);
          console.log(p[1]);
          p[1].classList.add("error");
          return;
        } else {
          p[1].classList.remove("error");
        }
        if (+yearEl.value > new Date().getFullYear()) {
          console.log(+yearEl.value);
          console.log(p[2]);
          p[2].classList.add("error");
        } else {
          if (+yearEl.value === new Date().getFullYear()) {
            if (
              +monthEl.value > new Date().getMonth() + 1 ||
              +dayEl.value > new Date().getDate()
            ) {
              p[2].classList.add("error");
            } else {
              p[2].classList.remove("error");
            }
          } else {
            p[2].classList.remove("error");
          }
        }
        var input0 = p[0].classList.contains("error");
        var input1 = p[1].classList.contains("error");
        var input2 = p[2].classList.contains("error");
        var span1;
        span.forEach((value) => {
          span1 = value.classList.contains("error");
        });
        console.log(span1);
        if (
          input0 == false &&
          input1 == false &&
          input2 == false &&
          span1 == false
        ) {
          ageCalculate();
        } else {
          birthDay.innerHTML = "--";
          birthMonth.innerHTML = "--";
          birthYear.innerHTML = "--";
        }
      }
    }
  });
});
function ageCalculate() {
  let currentDate = new Date();
  // Years Calculation
  let currentYear = currentDate.getFullYear();

  let year = currentYear - +yearEl.value;

  // Months Calculation
  let currentMonth = currentDate.getMonth() + 1;
  let month = 0;
  if (currentMonth < +monthEl.value) {
    year -= 1;
    currentMonth += 12;
    month = currentMonth - +monthEl.value;
  } else {
    month = currentMonth - +monthEl.value;
  }
  // Days Calculation
  let currentDay = currentDate.getDate();
  let day = 0;
  if (currentDay < +dayEl.value) {
    month -= 1;
    day =
      currentDay + getDaysInMonth(currentMonth - 1, currentYear) - +dayEl.value;
  } else {
    day = currentDay - +dayEl.value;
  }
  birthYear.innerHTML = year;
  birthMonth.innerHTML = month;
  birthDay.innerHTML = day;
}

var getDaysInMonth = function (month, year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
};
