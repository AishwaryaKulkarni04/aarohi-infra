(function () {
  const STATUS = {
    completed: { label: "Completed", tableClass: "done", badgeClass: "" },
    progress: { label: "In Progress", tableClass: "progress", badgeClass: "project-showcase-badge--progress" },
    upcoming: { label: "Upcoming", tableClass: "upcoming", badgeClass: "project-showcase-badge--upcoming" },
  };

  function formatSqftDisplay(n) {
    return n.toLocaleString("en-IN");
  }

  function sliderMeta(project) {
    const status = STATUS[project.status]?.label || project.status;
    return `${formatSqftDisplay(project.sqft)} sqft · ${project.typeShort} · ${status}`;
  }

  function renderSliderThumb(project) {
    const thumb = document.createElement("div");
    const img = project.image;
    if (img?.src) {
      thumb.className = `project-thumb${img.modifier ? ` project-thumb--${img.modifier}` : ""}`;
      const el = document.createElement("img");
      el.src = img.src;
      el.alt = img.alt || project.displayName;
      el.loading = "lazy";
      thumb.appendChild(el);
    } else {
      thumb.className = "project-thumb photo-placeholder";
      const span = document.createElement("span");
      span.textContent = "Image";
      thumb.appendChild(span);
    }
    return thumb;
  }

  function renderSliderCard(project) {
    const link = document.createElement("a");
    link.href = `#${project.id}`;
    link.className = "project-card";

    link.appendChild(renderSliderThumb(project));

    const text = document.createElement("div");
    text.className = "project-card-text";

    const h3 = document.createElement("h3");
    h3.textContent = project.displayName;

    const p = document.createElement("p");
    p.textContent = sliderMeta(project);

    text.append(h3, p);
    link.appendChild(text);
    return link;
  }

  function renderTableRow(project, index) {
    const tr = document.createElement("tr");
    const status = STATUS[project.status] || STATUS.completed;

    const cells = [
      String(index + 1),
      project.tableName,
      String(project.year),
      project.type,
      `${project.sqft} sqft`,
    ];

    cells.forEach((text) => {
      const td = document.createElement("td");
      td.textContent = text;
      tr.appendChild(td);
    });

    const statusTd = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = `status ${status.tableClass}`;
    badge.textContent = status.label;
    statusTd.appendChild(badge);
    tr.appendChild(statusTd);

    return tr;
  }

  function renderShowcaseMedia(project) {
    const media = document.createElement("div");
    media.className = "project-showcase-media";

    const img = project.image;
    if (img?.src) {
      const figure = document.createElement("figure");
      figure.className = `project-showcase-photo${img.modifier ? ` project-showcase-photo--${img.modifier}` : ""}`;
      const el = document.createElement("img");
      el.src = img.src;
      el.alt = img.alt || project.displayName;
      el.loading = "lazy";
      figure.appendChild(el);
      media.appendChild(figure);
    } else {
      const ph = document.createElement("div");
      ph.className = "photo-placeholder project-showcase-photo";
      const span = document.createElement("span");
      span.textContent = "Photo 1";
      ph.appendChild(span);
      media.appendChild(ph);
    }

    const status = STATUS[project.status] || STATUS.completed;
    const badge = document.createElement("span");
    badge.className = `project-showcase-badge${status.badgeClass ? ` ${status.badgeClass}` : ""}`;
    badge.textContent = status.label;
    media.appendChild(badge);

    return media;
  }

  function renderGalleryArticle(project) {
    const article = document.createElement("article");
    article.id = project.id;
    article.className = "gallery-block";

    const bar = document.createElement("div");
    bar.className = "section-bar";
    const h2 = document.createElement("h2");
    h2.textContent = project.sectionTitle;
    bar.appendChild(h2);

    const stagger = document.createElement("div");
    stagger.className = "project-showcase motion-stagger";

    const frame = document.createElement("div");
    frame.className = "project-showcase-frame motion-item";
    frame.appendChild(renderShowcaseMedia(project));

    const aside = document.createElement("aside");
    aside.className = "project-showcase-card motion-item";

    const eyebrow = document.createElement("p");
    eyebrow.className = "project-showcase-eyebrow";
    eyebrow.textContent = project.type;

    const name = document.createElement("h3");
    name.className = "project-showcase-name";
    name.textContent = project.displayName;

    const stats = document.createElement("ul");
    stats.className = "project-showcase-stats";

    const statRows = [
      [String(project.year), "Year"],
      [formatSqftDisplay(project.sqft), "Sq ft"],
      [project.location, "Location"],
    ];

    statRows.forEach(([value, label]) => {
      const li = document.createElement("li");
      const val = document.createElement("span");
      val.className = "project-showcase-stat-value";
      val.textContent = value;
      const lbl = document.createElement("span");
      lbl.className = "project-showcase-stat-label";
      lbl.textContent = label;
      li.append(val, lbl);
      stats.appendChild(li);
    });

    aside.append(eyebrow, name, stats);
    frame.appendChild(aside);
    stagger.appendChild(frame);
    article.append(bar, stagger);

    return article;
  }

  function computeProjectCount(projects) {
    let jadhavOngoing = 0;
    projects.forEach((p) => {
      const name = p.tableName.toLowerCase();
      if (name.includes("jadhav electricals") && p.status === "progress") {
        jadhavOngoing += 1;
      }
    });
    return projects.length + (jadhavOngoing >= 2 ? 2 : 0);
  }

  function computeDeliveredSqftK(site) {
    return site.deliveredSqftK ?? 75;
  }

  function renderProjects() {
    const projects = window.AAROHI?.PROJECTS || [];
    const site = window.AAROHI?.SITE || {};

    const track = document.querySelector("#project-slider-track");
    const tbody = document.querySelector("#projects-table-body");
    const galleries = document.querySelector("#project-galleries");

    if (track) {
      track.replaceChildren();
      projects
        .filter((p) => p.id && p.slider !== false)
        .forEach((p) => track.appendChild(renderSliderCard(p)));
    }

    if (tbody) {
      tbody.replaceChildren();
      projects.forEach((p, i) => tbody.appendChild(renderTableRow(p, i)));
    }

    if (galleries) {
      galleries.replaceChildren();
      projects
        .filter((p) => p.id && p.gallery !== false)
        .forEach((p) => galleries.appendChild(renderGalleryArticle(p)));
    }

    window.AAROHI.computeCompanyStats = function () {
      return {
        years: Math.max(1, new Date().getFullYear() - (site.foundedYear || 2021)),
        sqft: computeDeliveredSqftK(site),
        projects: computeProjectCount(projects),
      };
    };

    window.AAROHI.projectSectionIds = projects.filter((p) => p.id).map((p) => p.id);
  }

  window.AAROHI = window.AAROHI || {};
  window.AAROHI.renderProjects = renderProjects;
})();
