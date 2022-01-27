//const api_url = "<heroku_app_url>"
const api_url = "https://aakash2022.herokuapp.com/movie"
function loadData(records = []) {
var table_data = "";
for(let i=0; i<records.length; i++) {
table_data += `<tr>`;
table_data += `<td>${records[i].name}</td>`;
table_data += `<td>${records[i].release}</td>`;
table_data += `<td>${records[i].lead_actor}</td>`;
table_data += `<td>${records[i].director}</td>`;
table_data += `<td>${records[i].box_office}</td>`;
table_data += `<td>`;
table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
table_data += '&nbsp;&nbsp;';
table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
table_data += `</td>`;
table_data += `</tr>`;
}
//console.log(table_data);
document.getElementById("tbody").innerHTML = table_data;
}
function getData() {
fetch(api_url)
.then((response) => response.json())
.then((data) => {
console.table(data);
loadData(data);
});
}
function getDataById(id) {
fetch(`${api_url}/${id}`)
.then((response) => response.json())
.then((data) => {
console.log(data);
document.getElementById("id").value = data._id;
document.getElementById("name").value = data.name;
document.getElementById("release").value = data.release;
document.getElementById("lead_actor").value = data.lead_actor;
document.getElementById("director").value = data.director;
document.getElementById("box_office").value = data.box_office;
})
}
function postData() {
var name = document.getElementById("name").value;
var release = document.getElementById("release").value;
var lead_actor = document.getElementById("lead_actor").value;
var director = document.getElementById("director").value;
var box_office = document.getElementById("box_office").value;
data = {name: name, release: release, lead_actor: lead_actor, director:director, box_office:box_office};
fetch(api_url, {
method: "POST",
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then((response) => response.json())
.then((data) => {
console.log(data);
window.location.href = "index.html";
})
}
function putData() {
var _id = document.getElementById("id").value;
var name = document.getElementById("name").value;
var release = document.getElementById("release").value;
var lead_actor = document.getElementById("lead_actor").value;
var director = document.getElementById("director").value;
var box_office = document.getElementById("box_office").value;
data = {_id: _id, name: name,  release: release, lead_actor: lead_actor, director:director, box_office:box_office};
fetch(api_url, {
method: "PUT",
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then((response) => response.json())
.then((data) => {
console.table(data);
window.location.href = "index.html";
})
}
function deleteData(id) {
user_input = confirm("Are you sure you want to delete this record?");
if(user_input) {
fetch(api_url, {
method: "DELETE",
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: JSON.stringify({"_id": id})
})
.then((response) => response.json())
.then((data) => {
console.log(data);
window.location.reload();
})
}
}