var aff_url = "";

function generateUrl() {
  $("#result-section").hide();
  $("#copyBtn").text("Copy");

  var url                 = $("#url").val();
  var tracking_id         = $("#tracking_id").val();
  var lastCharacterInUrl  = url.charAt(url.length-1);
  
  if (url == "" || tracking_id == "") {
    alert("Please enter both URL and Tracking ID");
  } else {
    checkLastCharacterInUrl();
  }

  function checkLastCharacterInUrl() {
    if (lastCharacterInUrl == "/") {
      checkTrackingIdLength();
    } else {
      url = url + "/"
      checkTrackingIdLength();
    }
  }

  function checkTrackingIdLength() {
    if (tracking_id.length < 25) {
      // proceed
      checkIsAlphaNumeric();
    } else {
      alert("Tracking ID too long. Only 24 characters allowed");
    }
  }

  function checkIsAlphaNumeric() {
    // check if tracking_id contains symbols or not
    if ( S(tracking_id).isAlphaNumeric() ) {
      // proceed with URL generation
      generateUrl();
    } else {
      alert("Tracking ID cannot contain symbols or spaces. Only numbers and alphabet allowed.");
    }
  }

  function generateUrl() {
    aff_url = url + "?tid=" + tracking_id.toLowerCase();
    console.log(aff_url);

    $("#result-section").show();
    $("#result").text(aff_url);

    $("#url").val("");
    $("#tracking_id").val("");

  }

}

// When Copy button is clicked, copy the `aff_url` into the clipboard
// Reference: https://github.com/zeroclipboard/jquery.zeroclipboard
$("body").on("copy", "#copyBtn", function(event) {
  event.clipboardData.clearData();
  event.clipboardData.setData("text/plain", aff_url);
  event.preventDefault();
  $("#copyBtn").text("Copied!");
});
