import { loadGameContent, loadGameContentFromDirectory } from "./core/contentLoader.js";
import { createInitialGameState } from "./core/createGameState.js";
import { createSaveManager } from "./core/saveManager.js";
import { renderAppShell } from "./ui/renderApp.js";

async function bootstrap() {
  const appRoot = document.querySelector("#app");

  if (!appRoot) {
    throw new Error("App root not found.");
  }

  appRoot.innerHTML = `<div class="loading-state">Loading Pastel Trails...</div>`;

  try {
    const saveManager = createSaveManager(window.localStorage);
    let content = await loadGameContent();
    let state = createInitialGameState({ content, saveManager });

    async function handleSelectProjectFolder() {
      if (!("showDirectoryPicker" in window)) {
        window.alert("This browser does not support local folder access.");
        return;
      }

      try {
        const rootHandle = await window.showDirectoryPicker();
        content = await loadGameContentFromDirectory(rootHandle);
        state = createInitialGameState({ content, saveManager });
        render();
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }

        console.error(error);
        window.alert(error instanceof Error ? error.message : "Failed to load local project data.");
      }
    }

    function render() {
      renderAppShell({
        root: appRoot,
        state,
        content,
        saveManager,
        onSelectProjectFolder: handleSelectProjectFolder,
      });
    }

    render();
  } catch (error) {
    console.error(error);

    appRoot.innerHTML = `
      <section class="error-state">
        <h1>Pastel Trails failed to load</h1>
        <p>${error instanceof Error ? error.message : "Unknown error."}</p>
        <p>Use a local static server so the browser can fetch JSON files.</p>
      </section>
    `;
  }
}

bootstrap();
