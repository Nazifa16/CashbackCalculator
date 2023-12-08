const inpt = document.querySelector("#inpt");
const btncalcCash = document.querySelector("#btncalcCash");
const btnshowCashbackList = document.querySelector("#btnshowCashbackList");
const showCash = document.querySelector("#showCash");
const listShow = document.querySelector("#listShow");

const Cashback = {
  report: [],
  date: new Date(),
  calcCash: function (amount) {
    const cash = amount * 0.03;
    return cash;
  },

  showCashbackList: function (amount) {
    const cash = this.calcCash(amount);
    const history = {
      amount: amount,
      cash: cash,
      date: this.date,
    };
    this.report.push(history);
  },
};

let changedNumber;
let historyShown = false; //false because the history hasn't been shown yet.

// Event listener for the first button
btncalcCash.addEventListener("click", function () {
  const value = inpt.value;
  if (value && value != 0 && value > 0) {
    changedNumber = Number(value);
    const calcCashFunc = Cashback.calcCash(changedNumber);
    showCash.innerHTML = calcCashFunc;
    historyShown = false; // Reset the flag when the input changes
  } else {
    confirm("please enter a valid number");
  }
});

// Event listener for the second button
btnshowCashbackList.addEventListener("click", function () {
  // Check if the history has already been shown
  if (!historyShown && changedNumber !== undefined) {
    Cashback.showCashbackList(changedNumber);
    const cashList = Cashback.report
      .map(
        (item, index) => `
          <tr>
            <th scope="row">${index + 1}</th>
            <td class="text-success">${item.amount}</td>
            <td class="text-success">${item.cash}</td>
            <td>${item.date.getFullYear()}/${
          item.date.getMonth() + 1
        }/${item.date.getDate()}</td>
          </tr>
        `
      )
      .join("");
    listShow.innerHTML = cashList;
    inpt.value = "";
    historyShown = true; // Set the flag to true after showing the history
  }
});
