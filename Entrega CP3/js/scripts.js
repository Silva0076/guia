"use strict";

const savedProjectsKey = "portfolio:saved-projects";

function readSavedProjects() {
  try {
    const saved = JSON.parse(localStorage.getItem(savedProjectsKey) || "[]");
    return Array.isArray(saved) && saved.every((item) => typeof item === "string")
      ? saved
      : [];
  } catch (error) {
    console.error("Não foi possível ler os projetos salvos.", error);
    return null;
  }
}

function setupSavedProjects() {
  const buttons = document.querySelectorAll("[data-save-project]");
  const summary = document.querySelector("#saved-summary");
  if (!buttons.length) return;

  const storedProjects = readSavedProjects();
  let savedProjects = storedProjects || [];
  let storageAvailable = storedProjects !== null;
  const updateSummary = () => {
    if (!summary) return;
    summary.textContent = storageAvailable
      ? savedProjects.length
        ? `${savedProjects.length} ${savedProjects.length === 1 ? "projeto salvo" : "projetos salvos"} neste navegador.`
        : "Seus projetos salvos ficam disponíveis neste navegador."
      : "Não foi possível acessar o armazenamento deste navegador.";
  };

  buttons.forEach((button) => {
    const project = button.dataset.saveProject;
    const isSaved = savedProjects.includes(project);
    button.setAttribute("aria-pressed", String(isSaved));
    button.querySelector("span").textContent = isSaved ? "Salvo" : "Salvar";
    button.firstChild.textContent = isSaved ? "♥ " : "♡ ";

    button.addEventListener("click", () => {
      const alreadySaved = savedProjects.includes(project);
      savedProjects = alreadySaved
        ? savedProjects.filter((item) => item !== project)
        : [...savedProjects, project];

      try {
        localStorage.setItem(savedProjectsKey, JSON.stringify(savedProjects));
        storageAvailable = true;
      } catch (error) {
        console.error("Não foi possível salvar os projetos neste navegador.", error);
        storageAvailable = false;
        savedProjects = alreadySaved
          ? [...savedProjects, project]
          : savedProjects.filter((item) => item !== project);
        updateSummary();
        return;
      }

      button.setAttribute("aria-pressed", String(!alreadySaved));
      button.querySelector("span").textContent = alreadySaved ? "Salvar" : "Salvo";
      button.firstChild.textContent = alreadySaved ? "♡ " : "♥ ";
      updateSummary();
    });
  });

  updateSummary();
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const feedback = document.querySelector("#form-feedback");
  const fields = [...form.querySelectorAll("input, select, textarea")];
  const messages = {
    name: "Informe seu nome (pelo menos 2 caracteres).",
    email: "Informe um endereço de e-mail válido.",
    subject: "Selecione um assunto.",
    message: "Escreva uma mensagem com pelo menos 10 caracteres."
  };

  const validateField = (field) => {
    const error = document.querySelector(`#${field.id}-error`);
    const valid = field.checkValidity();
    field.setAttribute("aria-invalid", String(!valid));
    error.textContent = valid ? "" : messages[field.name];
    return valid;
  };

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
    field.addEventListener("change", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.textContent = "";
    feedback.classList.remove("is-error");

    const invalidFields = fields.filter((field) => !validateField(field));
    if (invalidFields.length) {
      feedback.textContent = "Revise os campos indicados antes de continuar.";
      feedback.classList.add("is-error");
      invalidFields[0].focus();
      return;
    }

    feedback.textContent = "Validação concluída! Esta demonstração não envia a mensagem.";
    form.reset();
    fields.forEach((field) => field.setAttribute("aria-invalid", "false"));
    fields.forEach((field) => {
      document.querySelector(`#${field.id}-error`).textContent = "";
    });
  });
}

function setupMobileNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#site-nav");
  if (!toggle || !navigation) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
setupSavedProjects();
setupContactForm();
setupMobileNavigation();
