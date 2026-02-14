const container = document.querySelector(".container");
const boxes = document.querySelectorAll(".box");

let currentTilt = 0;

//////////////////////////////
// 1️⃣ gap 생성 + 기울기 연동
//////////////////////////////

const gapSize = 20;

function createGapZones() {

  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box, index) => {

    if (index < boxes.length - 1) {

      const gap = document.createElement("div");

      gap.style.width = gapSize + "px";
      gap.style.height = box.offsetHeight + "px";
      gap.style.position = "relative";
      gap.style.flexShrink = "0";
      gap.style.cursor = "pointer";

      box.after(gap);

      let stackCount = 0;
      let interval;

      gap.addEventListener("mouseenter", () => {

        const gapHeight = gap.offsetHeight;

        // gap의 위치 (왼쪽이면 음수, 오른쪽이면 양수)
        const containerRect = container.getBoundingClientRect();
        const gapRect = gap.getBoundingClientRect();
        const gapCenter = gapRect.left + gapRect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;

        const direction = (gapCenter - containerCenter) / containerRect.width;

        interval = setInterval(() => {

          if (stackCount * 2 >= gapHeight) {
            clearInterval(interval);
            return;
          }

          const line = document.createElement("div");

          line.style.position = "absolute";
          line.style.left = "0";
          line.style.bottom = stackCount * 2 + "px";
          line.style.width = "100%";
          line.style.height = "2px";
          line.style.background = "#F5FF6B";

          gap.appendChild(line);
          stackCount++;

          // 🔥 쌓일수록 기울기 증가
          currentTilt = direction * stackCount * 0.8;

          container.style.transform =
            `translate(-50%, -50%) rotate(${currentTilt}deg)`;

        }, 70);
      });

      gap.addEventListener("mouseleave", () => {
        clearInterval(interval);

        // 부드럽게 원위치
        container.style.transition = "transform 0.6s ease";
        container.style.transform =
          "translate(-50%, -50%) rotate(0deg)";
      });

    }
  });
}

createGapZones();

