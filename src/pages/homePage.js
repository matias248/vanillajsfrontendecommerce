export function HomePage() {
  const container = document.createElement("div");
  container.className = "flex mx-3 items-center flex-col";

  container.innerHTML = `
    <div class="mb-8 text-xl dark:text-white">
      Welcome to ECportfolio, a platform designed to simulate a simple e-commerce.
    </div>

    <div class="mb-6 dark:text-white self-start text-xl">
      ECportfolio integrates two applications:
    </div>

    <div class="mb-6 dark:text-white self-start text-base">
      <div class="font-bold">AppForms:</div>
      <div>Easily create and manage data with intuitive forms. FormsApp ensures you can build a comprehensive database effortlessly.</div>
    </div>

    <div class="mb-6 dark:text-white self-start text-base">
      <div class="font-bold">AppShop:</div>
      <div>Simulate a shop website. Present products with detailed descriptions and images, allowing visitors to browse as if they were shopping online.</div>
    </div>
  `;

  return container;
}
