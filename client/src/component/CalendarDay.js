import "./CalendarDay.scss";
import { $ } from "../util/util";
import {
  getLedgerItemByDate,
  getIsLedgerIncomeVisible,
  getIsLedgerOutcomeVisible,
  subscribe,
  unsubscribeByKey,
} from "../store";
import { getDailyOutcomeSum, getDailyIncomeSum } from "../util/sumCalculator";

export default function CalendarDay(props) {
  const componentClass = "calendar-day";
  const componentName = `calendar-day-${props.month}-${props.day + 1}`;

  function onMonthMove() {
    unsubscribeByKey(componentName, "isLedgerIncomeVisible");
    unsubscribeByKey(componentName, "isLedgerOutcomeVisible");
  }

  let { isToday, isPrevMonthDay, isNextMonthDay, year, month, day } = props;
  const isCurrentMonthDay = !(isPrevMonthDay || isNextMonthDay);

  isToday =
    isToday &&
    new Date().getFullYear() === year &&
    new Date().getMonth() + 1 === month;

  const date = `${year}-${month < 10 ? `0${month}` : month}-${
    day < 9 ? `0${day + 1}` : day + 1
  }`;

  function render() {
    const isLedgerIncomeVisble = getIsLedgerIncomeVisible();
    const isLedgerOutcomeVisible = getIsLedgerOutcomeVisible();

    let records = getLedgerItemByDate(date);

    let incomeSum;
    let outcomeSum;
    if (records) {
      incomeSum = getDailyIncomeSum(records);
      outcomeSum = getDailyOutcomeSum(records);
    }

    const html = `
            <div class="calendar-day-number">${props.day + 1}</div>
            <p class="calendar-day-income income-text ${
              isCurrentMonthDay && isLedgerIncomeVisble && incomeSum ? "" : "hidden"
            }">+${incomeSum}원</p>
            <p class="calendar-day-outcome outcome-text ${
              isCurrentMonthDay && isLedgerOutcomeVisible && outcomeSum ? "" : "hidden"
            }">-${outcomeSum}원</p>
        `;

    const $calendarDay = $(`div#${componentName}`);
    $calendarDay.innerHTML = html;
  }

  
  if (isCurrentMonthDay) {
    subscribe(componentName, "currentDate", onMonthMove.bind(this));
    subscribe(componentName, "isLedgerIncomeVisible", render);
    subscribe(componentName, "isLedgerOutcomeVisible", render);
  }

  setTimeout(render, 0);

  return `<div class="${componentClass}
            ${isToday ? "today" : ""}
            ${isPrevMonthDay ? "prev-month-day" : ""}
            ${isNextMonthDay ? "next-month-day" : ""}
            "
            id=${componentName}></div>`;
}
