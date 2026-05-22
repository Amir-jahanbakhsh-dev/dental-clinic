function includeComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    })
    .catch(err => console.error("Error loading component:", err));
}

includeComponent("header", "/components/header.html");
includeComponent("footer", "/components/footer.html");