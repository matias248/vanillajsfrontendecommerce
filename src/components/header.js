import { EcLogo } from "../images/ecPortofolio.js";
import { formsIcon } from "../images/formIcon.js";
import { shopIcon } from "../images/shopIcon.js";

export function Header({ onNavigate, currentRoute }) {
  const header = document.createElement("header");
  header.className = "h-[64px] mb-8";

  let buttons = "";

  if (currentRoute !== "/stores") {
    buttons += `
      <button data-route="/stores" class="nav-btn text-white bg-blue-600 hover:bg-blue-700 flex gap-1 px-4 py-2 rounded-lg">
        <div id=NavigationFormsApp class="size-6">${formsIcon}</div>
        <div class="hidden min-[320px]:inline">Forms</div>
      </button>
    `;
  }

  if (currentRoute !== "/shop") {
    buttons += `
      <button data-route="/shop" class="nav-btn text-white bg-blue-600 hover:bg-blue-700 flex gap-1 px-4 py-2 rounded-lg">
        <div id=NavigationShopApp class="size-6">${shopIcon}</div>
        <div class="hidden min-[320px]:inline">Shop</div>
      </button>
    `;
  }

  header.innerHTML = `
    <nav class="bg-slate-100 py-[10px] h-full dark:bg-gray-800 h-full">
      <div class="flex justify-between items-center px-2">

        <a href="/" class="flex items-center gap-1">
          <div class="size-12">${EcLogo} </div>
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white hidden sm:inline">ECportfolio</span>
        </a>

        <div class="flex gap-2">
          ${buttons}
        </div>

      </div>
    </nav>
  `;

  header.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => onNavigate(btn.dataset.route));
  });

  return header;
}
