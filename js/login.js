const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const formFirstName = document.querySelector("#first_name");
const formLastName = document.querySelector("#last_name");
const formPhoneNumber = document.querySelector("#phone");
const formAddress = document.querySelector("#address");
const formSignupEmail = document.querySelector("#signup-email");
const formSignupPassword = document.querySelector("#signup-password");
const formLoginEmail = document.querySelector("#login-email");
const formLoginPassword = document.querySelector("#login-password");
const formPasswordConfirm = document.querySelector(
	"#password_confirm"
);
const FormsButton = document.querySelector("#btn-signup");
const FormlButton = document.querySelector("#btn-signin");

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
const signIn = () => {
	cleanError();
	const data = {
		email: formLoginEmail.value,
		password: formLoginPassword.value
	}
	fetch("/api/v1/auth/signin", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "Application/JSON"
		}
	})
		.then(response => {
			response.json().then(async results => {
				if (results.error) {
					FormlButton.parentElement.querySelector(
						"#error"
					).innerHTML = results.error;
					return;
				}
				const { id, token, email, first_name, last_name, isadmin } = results.data;
				if (id && email) {
					await localStorage.setItem("token", token);
					await localStorage.setItem(
						"user",
						JSON.stringify(first_name + " " + last_name)
					);
					await localStorage.setItem(
						"email",
						JSON.stringify(email)
					);
					await localStorage.setItem("isAdmin", isadmin);
					return (window.location =await "/dashboard");
				}

			});
		})
		.catch(err => {
			alert("Sorry, something went wrong!");
			location.reload();
			return;
		});
}
const signUp = () => {
	const userSValue = document.querySelector('input[name=user-option]:checked').value;
	cleanError();
	if (
		!checkMatch(formSignupPassword.value, formPasswordConfirm.value)
	) {
		formPasswordConfirm.parentElement.querySelector(
			"#error"
		).innerHTML = `Password mismatch`;
		return;
	}
	const data = {
		first_name: formFirstName.value,
		last_name: formLastName.value,
		phoneNumber: formPhoneNumber.value,
		address: formAddress.value,
		email: formSignupEmail.value,
		password: formSignupPassword.value,
		isAdmin: userSValue
	};

	fetch("/api/v1/auth/signup", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "Application/JSON"
		}
	})
		.then(response => {
			response.json().then(async results => {
				if (results.error) {
					FormsButton.parentElement.querySelector(
						"#error"
					).innerHTML = results.error;
					return;
				}
				const { id, token, email, first_name, last_name, isadmin } = results.data;
				if (id && email) {
					await localStorage.setItem("token", token);
					await localStorage.setItem(
						"user",
						JSON.stringify(first_name + " " + last_name)
					);
					await localStorage.setItem(
						"email",
						JSON.stringify(email)
					);
					await localStorage.setItem("isAdmin", isadmin);
					return (window.location = await "/dashboard");
				}

			});
		})
		.catch(err => {
			alert("Sorry, something went wrong!");
			location.reload();
			return;
		});
};

const checkMatch = (pwd, pwdConfirm) => {
	return pwd === pwdConfirm;
};

const cleanError = () => {
	FormsButton.parentElement.querySelector(
		"#error"
	).innerHTML = ``;
	FormlButton.parentElement.querySelector(
		"#error"
	).innerHTML = ``;
};
