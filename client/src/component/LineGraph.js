import "./LineGraph.scss";
import { getStatisticsData, getCurrentDate, subscribe } from "../store";

export default function LineGraph() {
  const componentName = "linegraph";

  function render() {
    const statistics = getStatisticsData();
    const { year, month } = getCurrentDate();
    const lastDay = new Date(year, month, 0).toString().split(" ")[2];
    const iter = lastDay % 5 === 0 ? lastDay / 5 : parseInt(lastDay / 5) + 1;
    const html = `
      <figcaption>일별 지출</figcaption>
      <svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="graph" aria-labelledby="title" role="img">
    <g class="grid x-grid" id="xGrid">
      <line x1="90" x2="90" y1="5" y2="370"></line>
    </g>
    <g class="grid y-grid" id="yGrid">
      <line x1="90" x2="760" y1="370" y2="370"></line>
    </g>
      <g class="labels x-labels">
      ${Array(parseInt(iter))
        .fill()
        .map(
          (item, i) =>
            `<text x="${110 + i * (650 / (lastDay / 5))}" y="400">${month}월${
              5 * i + 1
            }일</text>`
        )
        .join("")}
      <text x="400" y="440" class="label-title">날짜</text>
    </g>
    <g class="labels y-labels">
    ${Array(10)
      .fill()
      .map((item, i) => `<text x="80" y="${370 - i * 36.5}">${5 * i}만</text>`)
      .join("")}
  <text x="30" y="200" class="label-title">금액</text>
    </g>
    <g class="data" data-setname="Our first data set">
        <circle cx="90" cy="192" data-value="7.2" r="4"></circle>
        <circle cx="240" cy="141" data-value="8.1" r="4"></circle>
        <circle cx="388" cy="179" data-value="7.7" r="4"></circle>
        <circle cx="531" cy="200" data-value="6.8" r="4"></circle>
        <circle cx="677" cy="104" data-value="6.7" r="4"></circle>
    </g>
    <polyline
    fill="none"
    stroke="#0074d9"
    stroke-width="3"
    points="
      90,192,
      240,141
      388,179
      531,200,
      677,104"/>
    </svg>
    
      `;

    const $header = document.querySelector(`.${componentName}`);
    $header.innerHTML = html;
  }
  subscribe(componentName, "currentDate", render);
  setTimeout(render, 0);

  return `<figure class=${componentName}></figure>`;
}