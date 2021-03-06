function getMessages(timestamp){
  var queryString = {'timestamp' : timestamp};

  $.ajax({
          type: 'get',
          url: 'request.php',
          data: queryString,
          contentType: "application/json;charset=utf-8",
          success: function(data){
              // put result data into "obj"
              var arr = data.messages;
              // display the data
              var out = "";
              for (var i = 0; i < arr.length; i++){
                  out += '<li>' + toText(arr[i].message) + '-' + toText(arr[i].email_address) + '</li> ';
              }
              document.getElementById("data").innerHTML = out;
              // requcive call with upodated timestamp
              getMessages(data.timestamp);
          }
      }
  );
}
function toText( html ) {
    return html.replace(/</g, "&lt;").replace(/>/g, "&gt;"); //visualy more interesting for demo
    //return $( $.parseHTML(html) ).text();
}
function sendMessage() {
    var values =  {};
    values.email = document.getElementById("form_email").value;
    values.message = document.getElementById("form_message").value;
    var json = JSON.stringify(values);
    $.ajax({
            type: "post",
            url: "send.php",
            data: json,
            dataType: "json",
            success: function(data) {
              if (data.success) {
                document.getElementById("messageForm").reset();
                document.getElementById("servermessage").innerHTML ="";
              }else {
                document.getElementById("servermessage").innerHTML = data.status;
              }
            },
            error: function(jqXHR) {
                document.getElementById("servermessage").innerHTML = jqXHR.responseText;
            }
        });
      }
function getSpamer(){
  $.ajax({
          type: 'get',
          url: 'mostmessages.php',
          contentType: "application/json;charset=utf-8",
          success: function(data){
              document.getElementById("largest_email").innerHTML = data.email;
              document.getElementById("largest_count").innerHTML = data.count;
          }
      }
  );
}
// initialize jQuery
$(function() {
    getMessages();
    getSpamer();
});
