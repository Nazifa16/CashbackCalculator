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
// --------------------------------------------------------------
btncalcCash.addEventListener("click", function () {
  const value = inpt.value;
  const calcCashFunc = Cashback.calcCash(Number(value));
  showCash.innerHTML = calcCashFunc;
  inpt.value = "";
});
// ----------------------------------------------------------------
btnshowCashbackList.addEventListener("click", function () {
  const value = inpt.value;
  Cashback.showCashbackList(Number(value));
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
});
