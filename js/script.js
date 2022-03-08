const formSiteName = document.querySelector("#sname");
const formDestination = document.querySelector("#destination");
const formCategory = document.querySelector("#category");
const formAbout = document.querySelector("#about");
const formImage = document.querySelector("#image");
const allVisitors = document.querySelector("#visitor");
const UserInfo = document.querySelector(".tablet");
const UserInfo2 = document.querySelector("#username");
const Loc_menu = document.querySelector(".menu-location");
const all_sites = document.querySelector(".sites");
const all_booked = document.querySelector(".allBooked");
// hidden division
const booked_places = document.querySelector(".all-booked");
const all_places = document.querySelector(".all-places");
const add_newPlace = document.querySelector(".add-new");
const user_profile = document.querySelector(".user-profile");
const booking_form = document.querySelector(".booking-form");
// hidden list
const add_list = document.querySelector(".icon-plus");
const add_button = document.querySelector("#plus");
// check user
(async () => {
  const token = await localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const checkUser = await localStorage.getItem("isAdmin");
  if (token && user) {
    UserInfo.innerHTML = `${user} (${checkUser == '1' ? 'Admin' : checkUser == '2' ? 'Manager' : 'Tourist'})`
    if (checkUser == '1') {
      allVisitors.style.display = 'block'
      Loc_menu.innerHTML = `<li onclick="showProfile()"><a>Settings<i class="icon-cog"></i></a></li>
      <li onclick="showAllPlaces()"><a>All sites <i class="icon-home"></i></a></li>`
    } else if ((checkUser == '3')) {
      Loc_menu.innerHTML = `<li onclick="showProfile()"><a>Settings<i class="icon-cog"></i></a></li>
      <li onclick="showAllPlaces()"><a>Reservation <i class="icon-bookmark"></i></a></li>`
      add_list.parentElement.parentElement.style.display = 'none'
      add_button.style.display = 'none'
    }
    // get all locations
    all_sites.innerHTML = ""
    let API = `/api/v1/tourism`
    if (checkUser == '2') {
      API = `/api/v1/tourism/owner`
    }
    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "Application/JSON",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        response.json().then(results => {
          const { data } = results
          data.map(res => {
            if (res.site_name) {
              all_sites.innerHTML += `<tr>
                              <td>${res.site_name}</td>
                              <td>${res.category}</td>
                              <td>${res.dest_name}</td>
                              <td>${res.owner_email}</td>
                              <td>${res.owner_phonenumber}
                              ${checkUser == '3' ? `<span class="icon-small" onclick="showPlaceInfo(${res.id})">
                              <img src="../images/icons/info.jpg" alt="*" srcset="" title="View Place Info"
                                  class="lg-icon">
                          </span>`: `
                                  <span class="icon-small" onclick="deletePlace(${res.id})">
                                      <img src="../images/icons/delete.svg" alt="*" srcset="" title="Delete Site"
                                          class="lg-icon">
                                  </span>
                                  <span class="icon-small" onclick="editPlace(${res.id})">
                                      <img src="../images/icons/edit.svg" alt="*" srcset="" title="Edit site"
                                          class="lg-icon">
                                  </span>
                              </td>
                          </tr>`}
                    `
            }
          })
        });
      })
      .catch(err => {
        alert("Sorry, something went wrong!");
        return;
      });

    return;
  }
})();
const alltourism = document.querySelector(
  ".content"
);
const allCard = document.querySelector(
  ".tourism-card"
);
// display booked places
const showBooked = async () => {
  const token = await localStorage.getItem("token");
  const checkUser = await localStorage.getItem("isAdmin");
  booked_places.style.display = 'block'
  all_places.style.display = 'none'
  add_newPlace.style.display = 'none'
  user_profile.style.display = 'none'
  booking_form.style.display = 'none'
  // all booked
  all_booked.innerHTML = ""
  let API = `/api/v1/tourism/booked`
  if (checkUser !== '3') {
    API = `/api/v1/tourism/allBooked`
  }
  fetch(API, {
    method: "GET",
    headers: {
      "Content-Type": "Application/JSON",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => {
      response.json().then(results => {
        const { data } = results
        data.map(res => {
          if (res.site_name) {
            all_booked.innerHTML += `<tr>
                            <td>${res.first_name} ${res.last_name}</td>
                            <td>${res.phonenumber}</td>
                              <td>${res.site_name}</td>
                              <td>${res.booked_on}</td>
                              <td>${res.end_on}</td>
                              <td>${res.dest_name}
                              ${res.confirmed ? `<span class="icon-small">
                              <img src="../images/icons/checked.svg" alt="*" srcset="" title="Confirmed"
                                  class="lg-icon">
                          </span>
                      </td>
                  </tr>`: `${checkUser !== '3' ? `<span class="icon-small" onclick="confirm(${res.id})">
                  <img src="../images/icons/check.svg" alt="*" srcset="" title="Confirm Reservation"
                      class="lg-icon">
              </span>
          </td>`: `<span class="icon-small">
          <img src="../images/icons/waiting.svg" alt="*" srcset="" title="Waiting for confirmation"
              class="lg-icon">
      </span>
  </td>`}`}
      </tr>
                                  
                  `
          }
        })
      });
    })
    .catch(err => {
      alert("Sorry, something went wrong!");
      return;
    });
}
// date validation
const isDateSelected = () => {
  const today = new Date().valueOf();
  let inputBDate = new Date(document.querySelector('#bdate').value).valueOf();
  let inputEDate = new Date(document.querySelector('#edate').value).valueOf();
  if (!inputBDate || !inputEDate) {
    return false;
  } else if ((inputBDate < today) || (inputBDate > inputEDate)) {
    return false;
  } else {
    return true;
  }
}
const confirm = id => {
  let API = `/api/v1/tourism/confirm/${id}`
  fetch(API, {
    method: "PATCH",
    headers: {
      "Content-Type": "Application/JSON"
    }
  })
    .then(response => {
      response.json().then(results => {
        if (results.message) {
          alert(results.message)
          location.reload();
          return;
        }
        alert(results.error)
      })
    })
}
// add new place
const showaddNew = () => {
  const update = document.querySelector('#addSite')
  booked_places.style.display = 'none'
  all_places.style.display = 'none'
  user_profile.style.display = 'none'
  booking_form.style.display = 'none'
  add_newPlace.querySelector('#sname').value = ""
  add_newPlace.querySelector('#destination').value = ""
  add_newPlace.querySelector('#category').value = ""
  add_newPlace.querySelector('#about').value = ""
  add_newPlace.querySelector('#image').value = ""
  update.parentElement.parentElement.querySelector('#message').innerHTML = ''
  update.parentElement.innerHTML = `<input class='button' id="addSite" onclick="addSite()" type='submit' value='Publish'>`
  add_newPlace.style.display = 'block'
}
// display all places
const showAllPlaces = () => {
  booked_places.style.display = 'none'
  all_places.style.display = 'block'
  add_newPlace.style.display = 'none'
  user_profile.style.display = 'none'
  booking_form.style.display = 'none'
}
// get specific place to edit
const editPlace = async id => {
  const add = document.querySelector('#addSite')
  all_places.style.display = 'none'
  add_newPlace.style.display = 'block'
  const token = await localStorage.getItem("token");

  let API = `/api/v1/tourism/site/${id}`
  fetch(API, {
    method: "GET",
    headers: {
      "Content-Type": "Application/JSON",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => {
      response.json().then(results => {
        if (results.message) {
          const { data } = results
          data.map(res => {
            add.parentElement.parentElement.querySelector('#sname').value = res.site_name
            add.parentElement.parentElement.querySelector('#destination').value = res.dest_id
            add.parentElement.parentElement.querySelector('#category').value = res.category
            add.parentElement.parentElement.querySelector('#about').value = res.about
            add.parentElement.parentElement.querySelector('#image').value = res.image_url
            add.parentElement.innerHTML = `<input class='button' id="addSite" onclick="updateSite(${id})" type='submit' value='Update'>`
          })
        }
      })
    })

}
// update edited place
const updateSite = async (id) => {
  const update = document.querySelector('#addSite')
  const site_name = update.parentElement.parentElement.querySelector('#sname').value
  const dest_ID = update.parentElement.parentElement.querySelector('#destination').value
  const category = update.parentElement.parentElement.querySelector('#category').value
  const about = update.parentElement.parentElement.querySelector('#about').value
  const image_url = update.parentElement.parentElement.querySelector('#image').value
  const message = update.parentElement.parentElement.querySelector('#message')
  const token = await localStorage.getItem("token");

  let API = `/api/v1/tourism/${id}`
  const data = {
    site_name, dest_ID, category, about, image_url
  };
  fetch(API, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "Application/JSON",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => {
      response.json().then(results => {
        if (results.message) {
          message.style.color = 'green'
          message.innerHTML = results.message
          return;
        } else {
          message.style.color = 'red'
          message.innerHTML = results.error
        }
      })
    })
}
// book site
const bookSite = async row => {
  const token = await localStorage.getItem("token");
  const sID = row.parentElement.parentElement.querySelector('#sid').value
  const people = row.parentElement.parentElement.querySelector('#people').value
  let bdate = row.parentElement.parentElement.querySelector('#bdate').value
  let edate = row.parentElement.parentElement.querySelector('#edate').value

  let booked_on = new Date(bdate).getFullYear() + `/` + new Date(bdate).getMonth() + `/` + new Date(bdate).getDate();
  let end_on = new Date(edate).getFullYear() + `/` + new Date(edate).getMonth() + `/` + new Date(edate).getDate();
  if (isDateSelected() === false) {
    alert("Please enter a valid Date range");
    return false;
  } else {
    const data = {
      people_no: people,
      booked_on,
      end_on
    };
    fetch(`/api/v1/tourism/${sID}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "Application/JSON",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        response.json().then(async results => {
          if (results.data) {
            alert("Booked, you've booked successfully!");
            location.reload();
          }
          if (results.error) {
            row.parentElement.parentElement.querySelector(
              "#message"
            ).style.color = 'red'
            row.parentElement.parentElement.querySelector(
              "#message"
            ).innerHTML = results.error;
            return;
          }
        });
      })
      .catch(err => {
        alert("Sorry, something went wrong!");
        location.reload();
        return;
      });
  }
}
// display place info
const showPlaceInfo = id => {
  booking_form.style.display = 'block'
  booked_places.style.display = 'none'
  all_places.style.display = 'none'
  add_newPlace.style.display = 'none'
  user_profile.style.display = 'none'

  let API = `/api/v1/tourism/site/${id}`
  fetch(API, {
    method: "GET",
    headers: {
      "Content-Type": "Application/JSON"
    }
  })
    .then(response => {
      response.json().then(results => {
        const { data } = results
        data.map(res => {
          if (res.site_name) {
            booking_form.querySelector('#sid').value = res.id
            booking_form.querySelector('#sname').value = res.site_name
            booking_form.querySelector('#destination').value = res.dest_name
            booking_form.querySelector('#category').value = res.category
            booking_form.querySelector('#about').value = res.about
          }
        })
      });
    })
    .catch(err => {
      alert("Sorry, something went wrong!");
      return;
    });

}
// show user's profile
const showProfile = async () => {
  user_profile.style.display = 'block'
  booked_places.style.display = 'none'
  all_places.style.display = 'none'
  add_newPlace.style.display = 'none'
  const token = await localStorage.getItem("token");
  let API = `/api/v1/auth/user`
  fetch(API, {
    method: "GET",
    headers: {
      "Content-Type": "Application/JSON",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => {
      response.json().then(results => {
        if (results.message) {
          const { data } = results
          data.map(res => {
            user_profile.querySelector('#email').value = res.email
            user_profile.querySelector('#fname').value = res.first_name
            user_profile.querySelector('#lname').value = res.last_name
            user_profile.querySelector('#address').value = res.address
            user_profile.querySelector('#phone').value = res.phonenumber
          })
        }
      })
    })
}
// update user info
const saveChanges = async (row) => {
  const first_name = row.parentElement.parentElement.querySelector('#fname').value
  const last_name = row.parentElement.parentElement.querySelector('#lname').value
  const address = row.parentElement.parentElement.querySelector('#address').value
  const phonenumber = row.parentElement.parentElement.querySelector('#phone').value
  const password = row.parentElement.parentElement.querySelector('#password').value
  const confirm = row.parentElement.parentElement.querySelector('#confirm').value
  const message = row.parentElement.parentElement.querySelector('#message')
  if (password !== confirm) {
    message.style.color = 'red'
    message.innerHTML = `Password mismatch`
    return;
  }
  const token = await localStorage.getItem("token");
  let API = `/api/v1/auth/user`
  const data = {
    first_name, last_name, address, phonenumber, password
  };
  fetch(API, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "Application/JSON",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => {
      response.json().then(results => {
        if (results.message) {
          message.style.color = 'green'
          message.innerHTML = results.message
          return;
        } else {
          message.style.color = 'red'
          message.innerHTML = results.error
        }
      })
    })
}
// delete place
const deletePlace = async (id) => {
  const token = await localStorage.getItem("token");
  let API = `/api/v1/tourism/${id}`
  fetch(API, {
    method: "DELETE",
    headers: {
      "Content-Type": "Application/JSON",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => {
      response.json().then(results => {
        if (results.message) {
          alert(results.message)
          location.reload();
          return;
        }
        alert(results.error)
      })
    })
}
// search place
const searchSite = row => {
  const loc = row.parentElement.querySelector("#dname").value
  let cat = row.parentElement.querySelector("#category").value
  alltourism.innerHTML = ""
  cat = cat.replace("/", "-")
  if(cat==='Culture & Heritage'){
    cat = cat.replace(" & ", "-")
  }
  if(cat==='Sports & Advanture'){
    cat = cat.replace(" & ", "-")
  }
  console.log(cat)
  let API = `/api/v1/tourism/${loc}/${cat}`
  fetch(API, {
    method: "GET",
    headers: {
      "Content-Type": "Application/JSON"
    }
  })
    .then(response => {
      response.json().then(results => {
        const { data } = results
        data.map(res => {
          if (res.site_name) {
            alltourism.innerHTML += `<div class="tourism-card">
                  <div class="meta">
                    <img
                      src="${res.image_url}"
                      class="photo" />
                  </div>
                  <div class="description">
                    <h1 class="sname">${res.site_name}</h1>
                    <h2 class="location">Located in ${res.dest_name}</h2>
                    <p class="about">
                      ${res.about}
                    </p>
                  </div>
                </div>
                  `
          }
        })
      });
    })
    .catch(err => {
      alert("Sorry, something went wrong!");
      return;
    });

}

const getLocation = loc => {
  alltourism.innerHTML = ""
  let API = `/api/v1/tourism/${loc}`
  if (loc === 'all') {
    API = `/api/v1/tourism`
  }
  fetch(API, {
    method: "GET",
    headers: {
      "Content-Type": "Application/JSON"
    }
  })
    .then(response => {
      response.json().then(results => {
        const { data } = results
        data.map(res => {
          if (res.site_name) {
            alltourism.innerHTML += `<div class="tourism-card">
                  <div class="meta">
                    <img
                      src="${res.image_url}"
                      class="photo" />
                  </div>
                  <div class="description">
                    <h1 class="sname">${res.site_name}</h1>
                    <h2 class="location">Located in ${res.dest_name}</h2>
                    <p class="about">
                    ${res.about}
                    </p>
                  </div>
                </div>
                  `
          }
        })
      });
    })
    .catch(err => {
      alert("Sorry, something went wrong!");
      return;
    });

}
// add new place
const addSite = async () => {
  const token = await localStorage.getItem("token");
  cleanError();
  const data = {
    site_name: formSiteName.value,
    dest_ID: formDestination.value,
    category: formCategory.value,
    about: formAbout.value,
    image_url: formImage.value
  };
  fetch("/api/v1/tourism", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "Application/JSON",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      response.json().then(async results => {
        if (results.data) {
          return (window.location = await "/dashboard");
        }
        if (results.error) {
          formSiteName.parentElement.querySelector(
            "#error"
          ).innerHTML = results.error;
          return;
        }
      });
    })
    .catch(err => {
      alert("Sorry, something went wrong!");
      location.reload();
      return;
    });
};
// clean errors
const cleanError = () => {
  formSiteName.parentElement.querySelector(
    "#error"
  ).innerHTML = ``;
};
// Table filter
const Filter = row => {
  let input, filter, table, tr, td, cell;
  input = row.parentElement.parentElement.querySelector("#t_search");
  filter = input.value.toUpperCase();
  table = row.parentElement.parentElement.querySelector("#tourists_Table");
  tr = table.getElementsByTagName("tr");
  for (let i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = "none";

    td = tr[i].getElementsByTagName("td");
    for (let j = 0; j < td.length; j++) {
      cell = tr[i].getElementsByTagName("td")[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        }
      }
    }
  }
}
