const switchInput = document.getElementById("switchInput");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if(savedTheme){
	body.classList.add(savedTheme);
}

const savedSwitchState = localStorage.getItem("switchState");
if (savedSwitchState) {
  switchInput.checked = savedSwitchState === "true"; 
}

switchInput.addEventListener("click", () => {
  document.body.classList.toggle("dark");

	if(body.classList.contains("dark")){
		localStorage.setItem("theme", "dark");
	}else{
		localStorage.removeItem("theme");
	}
});

switchInput.addEventListener("change", () => {
  localStorage.setItem("switchState", switchInput.checked);
});