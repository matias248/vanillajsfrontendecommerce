import { EditIcon } from "../images/editIcon.js";

export function EditButton(props) {
  const button = document.createElement("button");

  // id igual que en React
  button.id = props?.id ? "editButton" + props.id : "editButton";

  // clases
  button.className =
    "w-14 bg-gray-600 rounded-lg dark:fill-white " +
    (props?.styleOverride ?? "");

  // click
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    props.functionToDo?.();
  });

  // icono
  button.innerHTML = EditIcon;

  return button;
}



export function FixedButton(props) {
  const button = document.createElement("button");

  button.id = "fixedButton";
  button.className =
    "fixed bottom-4 right-2 text-white bg-blue-600 hover:bg-blue-700 " +
    "focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium " +
    "rounded-lg text-lg px-2.5 py-2.5 text-center inline-flex items-center me-2 " +
    "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " +
    (props?.styleOverride ?? "");

  button.addEventListener("click", () => {
    props.functionToDo?.();
  });

  /* -------- Icono (+) -------- */
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("fill", "white");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-width", "2");
  icon.setAttribute("stroke-linecap", "round");
  icon.setAttribute("stroke-linejoin", "round");
  icon.classList.add("h-[20px]", "me-2");

  const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line1.setAttribute("x1", "12");
  line1.setAttribute("y1", "5");
  line1.setAttribute("x2", "12");
  line1.setAttribute("y2", "19");

  const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line2.setAttribute("x1", "5");
  line2.setAttribute("y1", "12");
  line2.setAttribute("x2", "19");
  line2.setAttribute("y2", "12");

  icon.appendChild(line1);
  icon.appendChild(line2);

  /* -------- Texto -------- */
  const span = document.createElement("span");
  span.textContent = props.title ?? "";

  button.appendChild(icon);
  button.appendChild(span);

  return button;
}
