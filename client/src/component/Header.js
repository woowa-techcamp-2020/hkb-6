import "./Header.scss";
import { bindEvent } from "../util/util";
import { toggleModal, fetchPaymentList } from "../store";

export default function Header() {
  const componentName = "header";

  function onPaymentBtnClick(e) {
    toggleModal();
  }

  function render() {
    const html = `
      <i
        class="fa fa-cutlery"
        aria-hidden="true"
        style="margin-right: 10px;"
      ></i>
      <div class="header-title">배민 샐러드</div>
      <button class="header-payment-btn">결제수단관리</button>
      `;

    const $header = document.querySelector(`.${componentName}`);
    $header.innerHTML = html;

    bindEvent("button.header-payment-btn", "click", onPaymentBtnClick);
  }

  fetchPaymentList();
  setTimeout(render, 0);

  return `<header class=${componentName}></header>`;
}
