const opportunities = [
  { id: 1, title: "Frontend Developer Intern", company: "PixelCraft Studio", type: "Internship", mode: "Hybrid", location: "Noida", deadline: "15 Nov 2026", description: "Help build clean, accessible web interfaces with HTML, CSS and JavaScript.", skills: "HTML CSS JavaScript", mark: "PC", color: "lavender" },
  { id: 2, title: "Graduate Software Engineer", company: "Northstar Systems", type: "Placement", mode: "On-site", location: "Gurugram", deadline: "20 Nov 2026", description: "Start your engineering career by solving practical software problems with a team.", skills: "Programming Problem solving", mark: "NS", color: "blue" },
  { id: 3, title: "Data Analyst Intern", company: "Metric Grove", type: "Internship", mode: "Hybrid", location: "Delhi NCR", deadline: "18 Nov 2026", description: "Turn structured data into useful insights and support day-to-day reporting.", skills: "SQL Excel Analytics", mark: "MG", color: "mint" },
  { id: 4, title: "Backend Developer Trainee", company: "CodeHarbor", type: "Placement", mode: "On-site", location: "Noida", deadline: "25 Nov 2026", description: "Learn API development, databases and maintainable server-side application design.", skills: "Node.js APIs Databases", mark: "CH", color: "peach" },
  { id: 5, title: "Cloud Support Intern", company: "Skyward Labs", type: "Internship", mode: "Remote", location: "Remote", deadline: "22 Nov 2026", description: "Explore cloud fundamentals and help document reliable deployment workflows.", skills: "AWS Linux Networking", mark: "SL", color: "blue" },
  { id: 6, title: "QA Engineer — Fresher", company: "BrightPath Digital", type: "Placement", mode: "Hybrid", location: "Ghaziabad", deadline: "28 Nov 2026", description: "Help validate features, write test cases and report reproducible software bugs.", skills: "Testing Test cases Attention to detail", mark: "BP", color: "mint" }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const storeKey = "campuscareer-demo-v1";
let state = { profile: { fullName: "", email: "", course: "", graduationYear: "" }, applications: [], saved: [] };
try {
  const existing = JSON.parse(localStorage.getItem(storeKey) || "null");
  if (existing && typeof existing === "object") state = { ...state, ...existing, profile: { ...state.profile, ...(existing.profile || {}) }, applications: Array.isArray(existing.applications) ? existing.applications : [], saved: Array.isArray(existing.saved) ? existing.saved : [] };
} catch (_) { /* Continue with an empty demo state if local storage is unavailable. */ }

function persist() {
  try { localStorage.setItem(storeKey, JSON.stringify(state)); }
  catch (_) { toast("Browser storage is unavailable; changes may not persist after refresh."); }
}
function initials(name) {
  return (name || "Student").trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "ST";
}
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}
let toastTimer;
function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove("show"), 2600);
}
function navigate(page) {
  const valid = ["dashboard", "opportunities", "applications", "profile"].includes(page) ? page : "dashboard";
  $$(".page").forEach(section => section.classList.toggle("active", section.id === `page-${valid}`));
  $$(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.page === valid));
  const names = { dashboard: "Overview", opportunities: "Opportunities", applications: "My applications", profile: "My profile" };
  $("#crumbTitle").textContent = names[valid];
  $("#sidebar").classList.remove("open");
  if (valid === "opportunities") renderOpportunities();
  if (valid === "applications") renderApplications();
  if (valid === "profile") populateProfile();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function renderRecommended() {
  $("#recommendedList").innerHTML = opportunities.slice(0, 3).map(item => `
    <div class="recommended-item">
      <div class="company-mark">${escapeHTML(item.mark)}</div>
      <div class="recommended-info"><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.company)} · ${escapeHTML(item.mode)}</small></div>
      <span class="role-type">${escapeHTML(item.type)}</span>
    </div>`).join("");
}
function renderOpportunities() {
  const search = ($("#searchInput").value || "").trim().toLowerCase();
  const type = $("#typeFilter").value;
  const sort = $("#sortFilter").value;
  let list = opportunities.filter(item => {
    const matchesSearch = `${item.title} ${item.company} ${item.skills} ${item.location} ${item.description}`.toLowerCase().includes(search);
    return matchesSearch && (type === "All" || item.type === type);
  });
  if (sort === "title") list.sort((a,b) => a.title.localeCompare(b.title));
  $("#resultsCount").textContent = `${list.length} opportunit${list.length === 1 ? "y" : "ies"}`;
  $("#opportunityGrid").classList.toggle("hidden", list.length === 0);
  $("#noResults").classList.toggle("hidden", list.length !== 0);
  $("#opportunityGrid").innerHTML = list.map(item => {
    const applied = state.applications.some(application => application.opportunityId === item.id);
    const saved = state.saved.includes(item.id);
    return `<article class="opportunity-card">
      <div class="card-top"><div class="card-company"><div class="company-mark">${escapeHTML(item.mark)}</div><div class="company-name">${escapeHTML(item.company)}</div></div>
      <button class="bookmark-button ${saved ? "saved" : ""}" data-save="${item.id}" aria-label="${saved ? "Unsave" : "Save"} ${escapeHTML(item.title)}" title="${saved ? "Saved" : "Save opportunity"}">${saved ? "★" : "☆"}</button></div>
      <span class="role-type" style="align-self:flex-start;margin-bottom:10px">${escapeHTML(item.type)}</span>
      <h3>${escapeHTML(item.title)}</h3><p class="card-description">${escapeHTML(item.description)}</p>
      <div class="card-meta"><span class="meta-chip">⌖ ${escapeHTML(item.location)}</span><span class="meta-chip">◷ ${escapeHTML(item.mode)}</span></div>
      <div class="card-bottom"><span class="deadline">Apply by ${escapeHTML(item.deadline)}</span><button class="small-button" data-apply="${item.id}" ${applied ? "disabled" : ""}>${applied ? "Applied ✓" : "Quick apply"}</button></div>
    </article>`;
  }).join("");
}
function renderApplications() {
  const apps = state.applications.map(application => ({ ...application, opportunity: opportunities.find(item => item.id === application.opportunityId) })).filter(item => item.opportunity);
  const review = apps.filter(item => item.status === "Under review").length;
  const selected = apps.filter(item => item.status === "Shortlisted").length;
  $("#applicationSummary").innerHTML = `<div class="summary-tile"><span>Total applications</span><strong>${apps.length.toString().padStart(2,"0")}</strong></div><div class="summary-tile"><span>Under review</span><strong>${review.toString().padStart(2,"0")}</strong></div><div class="summary-tile"><span>Shortlisted</span><strong>${selected.toString().padStart(2,"0")}</strong></div>`;
  if (!apps.length) {
    $("#applicationList").innerHTML = `<div class="empty-applications"><div class="empty-symbol">◷</div><strong>Your journey starts with one application.</strong><p>When you apply to an opportunity, its status will appear here.</p><button class="button button-primary" data-page="opportunities">Explore opportunities <span>→</span></button></div>`;
    return;
  }
  $("#applicationList").innerHTML = apps.map(item => {
    const statusClass = item.status === "Shortlisted" ? "selected" : item.status === "Rejected" ? "rejected" : "";
    return `<div class="application-row"><div class="company-mark">${escapeHTML(item.opportunity.mark)}</div><div class="application-info"><strong>${escapeHTML(item.opportunity.title)}</strong><small>${escapeHTML(item.opportunity.company)} · Applied ${escapeHTML(item.appliedAt)}</small></div><span class="status-badge ${statusClass}">${escapeHTML(item.status)}</span></div>`;
  }).join("");
}
function updateDashboard() {
  const apps = state.applications;
  $("#statOpen").textContent = opportunities.length.toString().padStart(2, "0");
  $("#statApplied").textContent = apps.length.toString().padStart(2, "0");
  $("#statReview").textContent = apps.filter(item => item.status === "Under review").length.toString().padStart(2, "0");
  $("#statSelected").textContent = apps.filter(item => item.status === "Shortlisted").length.toString().padStart(2, "0");
  $("#opportunityCount").textContent = opportunities.length.toString().padStart(2, "0");
  $("#applyStep").classList.toggle("done", apps.length > 0);
  $("#applyStep").textContent = apps.length > 0 ? "✓" : "3";
  const complete = Boolean(state.profile.fullName && state.profile.email && state.profile.course);
  $("#profileStep").classList.toggle("done", complete);
  $("#profileStep").textContent = complete ? "✓" : "2";
}
function updateIdentity() {
  const name = state.profile.fullName.trim() || "Student";
  const initialsText = initials(name);
  $("#welcomeName").textContent = name.split(/\s+/)[0];
  $("#sideName").textContent = name;
  $("#topAvatar").textContent = initialsText;
  $("#profileAvatar").textContent = initialsText;
  $("#profileHeading").textContent = name === "Student" ? "Student profile" : name;
}
function populateProfile() {
  $("#fullName").value = state.profile.fullName || "";
  $("#email").value = state.profile.email || "";
  $("#course").value = state.profile.course || "";
  $("#graduationYear").value = state.profile.graduationYear || "";
  $("#profileMessage").textContent = "";
}
function applyToOpportunity(id) {
  if (state.applications.some(application => application.opportunityId === id)) return toast("You have already applied to this opportunity.");
  const item = opportunities.find(opportunity => opportunity.id === id);
  if (!item) return;
  state.applications.push({ opportunityId: id, status: "Under review", appliedAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) });
  persist();
  updateDashboard();
  renderOpportunities();
  toast(`Demo application submitted for ${item.title}.`);
}
function toggleSaved(id) {
  state.saved = state.saved.includes(id) ? state.saved.filter(item => item !== id) : [...state.saved, id];
  persist();
  renderOpportunities();
  toast(state.saved.includes(id) ? "Opportunity saved in this browser." : "Opportunity removed from saved items.");
}

document.addEventListener("click", event => {
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) navigate(pageButton.dataset.page);
  const applyButton = event.target.closest("[data-apply]");
  if (applyButton) applyToOpportunity(Number(applyButton.dataset.apply));
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) toggleSaved(Number(saveButton.dataset.save));
});
$("#searchInput").addEventListener("input", renderOpportunities);
$("#typeFilter").addEventListener("change", renderOpportunities);
$("#sortFilter").addEventListener("change", renderOpportunities);
$("#clearFilters").addEventListener("click", () => {
  $("#searchInput").value = "";
  $("#typeFilter").value = "All";
  $("#sortFilter").value = "recommended";
  renderOpportunities();
});
$("#mobileMenu").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
$("#profileForm").addEventListener("submit", event => {
  event.preventDefault();
  state.profile = {
    fullName: $("#fullName").value.trim(),
    email: $("#email").value.trim(),
    course: $("#course").value.trim(),
    graduationYear: $("#graduationYear").value.trim()
  };
  persist();
  updateIdentity();
  updateDashboard();
  $("#profileMessage").textContent = "Profile saved in this browser.";
  toast("Profile saved successfully.");
});

renderRecommended();
updateIdentity();
updateDashboard();
renderOpportunities();
