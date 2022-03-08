(async () => {
      const token = await localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (token && user) {
            hideChat(1);
            return;
      } else {
            hideChat(0);
      }
})();
$('#prime').click(function () {
      toggleFab();
});
const Chatboard = document.querySelector('#chat_converse');
const Send = document.querySelector('#fab_send');
const message = document.querySelector("#chatSend")
$("#chatSend").keyup(function (event) {
      if (event.keyCode === 13) {
            $("#fab_send").click();
      }
});
const send = () => {
      let API = `/api/v1/tourism/chat`
      const data = {
            admin_id: 1,
            user_id: 1,
            message: message.value,
      };
      fetch(API, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                  "Content-Type": "Application/JSON"
            }
      }).then(response => {
            response.json().then(results => {
                  const { data } = results
                  let msg = data.message;
                  Chatboard.innerHTML += `<span class="chat_msg_item chat_msg_item_user">     
                            ${msg}</span>`
                  Chatboard.scrollTop = Chatboard.scrollHeight
                  message.value = "";
            })
      })

}
setInterval(function () {
      Chatboard.innerHTML += `<span class="chat_msg_item chat_msg_item_admin">
      <div class="chat_avatar">
         
      </div>Thank you!</span>`
      Chatboard.scrollTop = Chatboard.scrollHeight
}, 300000);
//Toggle chat and links
function toggleFab() {
      $('.prime').toggleClass('zmdi-comment-outline');
      $('.prime').toggleClass('zmdi-close');
      $('.prime').toggleClass('is-active');
      $('.prime').toggleClass('is-visible');
      $('#prime').toggleClass('is-float');
      $('.chat').toggleClass('is-visible');
      $('.fab').toggleClass('is-visible');

}

$('#chat_first_screen').click(function (e) {
      hideChat(1);
});

$('#chat_second_screen').click(function (e) {
      hideChat(2);
});

$('#chat_third_screen').click(function (e) {
      hideChat(3);
});

$('#chat_fourth_screen').click(function (e) {
      hideChat(4);
});

$('#chat_fullscreen_loader').click(function (e) {
      $('.fullscreen').toggleClass('zmdi-window-maximize');
      $('.fullscreen').toggleClass('zmdi-window-restore');
      $('.chat').toggleClass('chat_fullscreen');
      $('.fab').toggleClass('is-hide');
      $('.header_img').toggleClass('change_img');
      $('.img_container').toggleClass('change_img');
      $('.chat_header').toggleClass('chat_header2');
      $('.fab_field').toggleClass('fab_field2');
      $('.chat_converse').toggleClass('chat_converse2');
});

function hideChat(hide) {
      switch (hide) {
            case 0:
                  $('#fab_send').css('display', 'none');
                  $('#chatSend').css('display', 'none');
                  $('#chat_converse').css('display', 'none');
                  $('#chat_body').css('display', 'none');
                  $('#chat_form').css('display', 'none');
                  $('.chat_login').css('display', 'block');
                  $('.chat_fullscreen_loader').css('display', 'none');
                  break;
            case 1:
                  $('#fab_send').css('display', 'block');
                  $('#chatSend').css('display', 'block');
                  $('#chat_converse').css('display', 'block');
                  $('#chat_body').css('display', 'none');
                  $('#chat_form').css('display', 'none');
                  $('.chat_login').css('display', 'none');
                  $('.chat_fullscreen_loader').css('display', 'block');
                  break;
            case 2:
                  $('#chat_converse').css('display', 'none');
                  $('#chat_body').css('display', 'block');
                  $('#chat_form').css('display', 'none');
                  $('.chat_login').css('display', 'none');
                  $('.chat_fullscreen_loader').css('display', 'block');
                  break;
            case 3:
                  $('#chat_converse').css('display', 'none');
                  $('#chat_body').css('display', 'none');
                  $('#chat_form').css('display', 'block');
                  $('.chat_login').css('display', 'none');
                  $('.chat_fullscreen_loader').css('display', 'block');
                  break;
            case 4:
                  $('#chat_converse').css('display', 'none');
                  $('#chat_body').css('display', 'none');
                  $('#chat_form').css('display', 'none');
                  $('.chat_login').css('display', 'none');
                  $('.chat_fullscreen_loader').css('display', 'block');
                  break;
      }
}