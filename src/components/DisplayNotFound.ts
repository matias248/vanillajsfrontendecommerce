export function DisplayNotFound(): HTMLDivElement {
  const container = document.createElement("div");
  container.id = "itemNotFound";
  container.className =
    "flex flex-col gap-8 justify-center items-center h-screen dark:text-white";
  container.textContent =
    "The item was not found or it doesn't exist.";
  return container;
}
