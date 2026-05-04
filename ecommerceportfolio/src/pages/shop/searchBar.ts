type SearchBarProps = {
  textHover?: string;
  textFilter: string;
  functionOnSubmit: () => void;
  id: string;
  onChange: (text:string) => void;
};

export class SearchBar {
  root: HTMLFormElement;
  input: HTMLInputElement;
  button: HTMLButtonElement;
  onChange!: (text:string) => void;

  constructor(props: SearchBarProps) {
    // Crear el formulario
    this.root = document.createElement("form");
    this.root.className = "max-w-lg mx-auto";
    
    // Evitar submit por defecto
    this.root.addEventListener("submit", (event) => {
      event.preventDefault();
      props.functionOnSubmit();
    });

    // Label (oculto con sr-only)
    const label = document.createElement("label");
    label.htmlFor = "default-search" + props.id;
    label.className = "mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white";
    label.textContent = "Search";
    this.root.appendChild(label);

    // Contenedor relativo
    const container = document.createElement("div");
    container.className = "relative";
    this.root.appendChild(container);

    // Icono SVG
    const iconWrapper = document.createElement("div");
    iconWrapper.className = "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none";
    iconWrapper.innerHTML = `
      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
    `;
    container.appendChild(iconWrapper);

    // Input
    this.input = document.createElement("input");
    this.input.type = "search";
    this.input.id = "default-search" + props.id;
    this.input.className =
      "block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 " +
      "focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 " +
      "dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    this.input.placeholder = props.textHover ?? "";

    this.input.value = props.textFilter;
    
    this.input.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      props.onChange(target.value)
    });

    

    container.appendChild(this.input);

    // Botón
    this.button = document.createElement("button");
    this.button.type = "submit";
    this.button.id = "buttonSearch" + props.id;
    this.button.className =
      "text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-hidden " +
      "focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
    this.button.textContent = "Search";
    container.appendChild(this.button);

  }

  // Método para agregar al DOM
  mount(parent: HTMLElement) {
    parent.appendChild(this.root);
    
  }

  // Método opcional para actualizar valor desde código
  setValue(value: string) {
    this.input.value = value;
  }

  // Método opcional para remover
  remove() {
    this.root.remove();
  }
}