export function createOrderConfirmModal(functionToDo: () => void): HTMLElement {
  const overlay = document.createElement("div");
  overlay.id = "orderConfirmModal";
  overlay.className =
    "flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%)]";

  const container = document.createElement("div");
  container.className = "relative w-full max-w-2xl max-h-full m-4";

  const modal = document.createElement("div");
  modal.className =
    "relative bg-white rounded-lg shadow-xs dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-800";

  const header = document.createElement("div");
  header.className =
    "flex items-center justify-between p-4 md:p-5 border-b border-gray-300 rounded-t dark:border-gray-600";

  const title = document.createElement("h3");
  title.className = "text-xl font-semibold text-gray-900 dark:text-white";
  title.textContent = "Order Accepted";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className =
    "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white";

  closeButton.innerHTML = `
    <svg class="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
  `;

  const body = document.createElement("div");
  body.className = "p-4 md:p-5 space-y-4";

  const text = document.createElement("p");
  text.className =
    "text-base leading-relaxed text-gray-500 dark:text-gray-400";
  text.textContent =
    "Thank you for your order! We have successfully received and considered your request.";

  // ---- EVENTOS ----

  closeButton.addEventListener("click", functionToDo);

  // click fuera del modal
  overlay.addEventListener("click", (event) => {
    if (!container.contains(event.target as Node)) {
      functionToDo();
    }
  });

  // ---- STRUCTURE ----

  body.appendChild(text);
  header.appendChild(title);
  header.appendChild(closeButton);

  modal.appendChild(header);
  modal.appendChild(body);

  container.appendChild(modal);
  overlay.appendChild(container);

  return overlay;
}