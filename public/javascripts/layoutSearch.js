const mainSearch = document.getElementById("mainSearchBar");
const mainForm = document.getElementById("mainForm");

mainSearch.addEventListener("input", async (e) => {
  if (e.target.value !== " ") {
    const formData = new FormData();
    formData.append("searchText", e.target.value);
    const data = await fetch("/inventory/fuzzy_search", {
      method: "POST",
      body: formData,
    });
    const dataObject = await data.json();
    console.log(dataObject);
    //console.log(data);
  }
});
