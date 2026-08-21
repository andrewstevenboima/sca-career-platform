/* =============================================================
   account.html page logic — profile + saved opportunities
   ============================================================= */
document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("saved-grid");
  if (!grid) return; // not on account.html

  const welcome = document.getElementById("account-welcome");
  const profileBox = document.getElementById("account-profile");
  const savedEmpty = document.getElementById("saved-empty");
  const logoutBtn = document.getElementById("btn-logout");

  if (!window.SCA || !window.SCA.ready) {
    welcome.textContent = "Accounts aren't set up yet — the site owner still needs to connect Supabase.";
    return;
  }

  const session = await window.SCA.getSession();
  if (!session) {
    window.location.href = "login.html";
    return;
  }

  const user = session.user;

  logoutBtn.addEventListener("click", async () => {
    await window.SCA.signOut();
    window.location.href = "index.html";
  });

  try {
    const profile = await window.SCA.getProfile(user.id);
    welcome.textContent = `Welcome back, ${profile?.full_name || user.email}.`;
    document.getElementById("profile-region").textContent = profile?.region || "—";
    document.getElementById("profile-country").textContent = profile?.country || "—";
    document.getElementById("profile-year").textContent = profile?.year_of_study || "—";
    document.getElementById("profile-university").textContent = profile?.university || "—";
    profileBox.hidden = false;
  } catch (err) {
    welcome.textContent = `Welcome back, ${user.email}.`;
  }

  try {
    const bookmarks = await window.SCA.listBookmarks(user.id);
    if (!bookmarks.length) {
      savedEmpty.hidden = false;
      return;
    }
    grid.innerHTML = bookmarks
      .map(
        (b) => `
      <article class="saved-card" data-opportunity-id="${escapeAttr(b.opportunity_id)}">
        <h3>${escapeHTML(b.opportunity_title || "Saved opportunity")}</h3>
        ${b.opportunity_org ? `<p>${escapeHTML(b.opportunity_org)}</p>` : ""}
        <div class="saved-card-actions">
          <a href="${escapeAttr(b.opportunity_apply_link || "opportunities.html")}" target="_blank" rel="noopener" class="opp-apply">Apply →</a>
          <button class="saved-remove" data-id="${escapeAttr(b.opportunity_id)}">Remove</button>
        </div>
      </article>
    `
      )
      .join("");

    grid.querySelectorAll(".saved-remove").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        try {
          await window.SCA.removeBookmark(user.id, id);
          btn.closest(".saved-card").remove();
          if (!grid.querySelector(".saved-card")) savedEmpty.hidden = false;
        } catch (err) {
          alert(err.message || "Couldn't remove that saved opportunity.");
        }
      });
    });
  } catch (err) {
    grid.innerHTML = `<p>Couldn't load your saved opportunities. Please try refreshing.</p>`;
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));
  }
  function escapeAttr(str) {
    return escapeHTML(str);
  }
});
