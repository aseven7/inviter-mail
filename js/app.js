/* app.js */
var CLIENT_ID = {
  google : '',
  yahoo : '',
  microsoft : ''
};

var REDIRECT_URI = {
  google : 'http://inviter-mail.heroku.com/',
  yahoo : 'http://inviter-mail.heroku.com/redirect-yapi.php',
  microsoft : 'http://inviter-mail.heroku.com/redirect-live.php'
};

var ContactBook = {
    noDuplicateEmail : true,
	contact : [],
	isValidEmail : function(email) {
		var filter = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/igm;
		return (!filter.test(email.value) && email.trim() == '') ? false : true;
	},
	getContact : function(email) {
        if(email != null) {
          var newResult = $.map(this.contact, function(el, ind){
            if(el.email == email) return el;
          });

          return newResult;
        }

		return this.contact;
	},
	addContact : function(item) {
        var allow = true;
        if(this.noDuplicateEmail)
          allow = this.getContact(item.email).length === 0;

        if(allow && this.isValidEmail(item.email)) this.contact.push(item);
		return this.contact;
	}
};

/* google account */

function authGoogle() {
	var config = {
	  'client_id': CLIENT_ID.google,
	  'scope': 'https://www.google.com/m8/feeds'
	};

	gapi.auth.authorize(config, function() {
	  var access_token = gapi.auth.getToken().access_token;
	  fetchGoogleContact(access_token);
	});
}

function fetchGoogleContact(token) {
	$.ajax({
		url: 'https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=' + token,
		dataType: 'jsonp',
	}).done(function(data) {
		var result = "";
		var contact_feed = data.feed.entry;

		for( var i = 0; i < contact_feed.length ; i++ ) {
			var name = contact_feed[i].title.$t;
			var email = "";

			result+=name + "\n";

			var phones = contact_feed[i].gd$phoneNumber;
			var emails = contact_feed[i].gd$email;

			if(phones !== undefined && phones != null) {
				for( var j = 0; j < phones.length; j++ ) {
					result+=(phones[j].$t) + "\n";
				}
			}

			if(emails !== undefined && emails != null) {
				for( var j = 0; j < emails.length; j++ ) {
					if(j == 0) email = emails[j].address;
					result+=(emails[j].address) + "\n";
				}
			}

			result+="\n";
			ContactBook.addContact({"name": name, "email" : email});
		}

		$('#result').text(result);
		renderContact();
	});

}
/* google account */
/* microsoft account */
function authMicrosoft() {
	WL.init({
		client_id: CLIENT_ID.microsoft,
		redirect_uri: REDIRECT_URI.microsoft,
		scope: ["wl.signin", "wl.basic", "wl.contacts_emails"],
		response_type: "token"
	});

	WL.login({
		scope: ["wl.signin", "wl.basic", "wl.contacts_emails"]
	}).then(function(res) {
		WL.api({
			path: 'me/contacts',
			method: 'GET'
		}).then(function(res) {
			var result = "";
			var contacts = res.data;

			for(var i = 0; i < contacts.length; i++ ) {
				var fname = contacts[i].first_name;
				var lname = contacts[i].last_name;

				var name = (fname!=null?fname:"") + " " + (lname!=null?lname:"");
				var email = contacts[i].emails.preferred;

				result+=name +"\n";
				result+=email+"\n";
				result+="\n";

				ContactBook.addContact({"name": name, "email" : email});
			}

			$('#result').text(result);
			renderContact();
		});
	});
}

/* Yahoo Account */
function authYahoo() {
	var consumerKey = CLIENT_ID.yahoo;
	var returnUrl = REDIRECT_URI.yahoo;
	var url = "https://api.login.yahoo.com/oauth2/request_auth?client_id=" + consumerKey + "&redirect_uri=" + returnUrl + "&response_type=token&language=en-us";
	var wnd = window.open(url);
}

function fetchYahooContact(token) {
	var access_token = token;
	var apiurl = 'https://query.yahooapis.com/v1/yql?q=SELECT%20*%20from%20social.contacts%20WHERE%20guid%3Dme&format=json&diagnostics=true&callback=processYahooContact&access_token=' + access_token;

	$.getJSON('redirect-yapi.php?ytoken=' + access_token, function(data){
		var contacts = data.contacts.contact;
		var result = "";
		for( var i=0; i < contacts.length; i++) {
			var fields = contacts[i].fields;
			var name = "";email = "";

			for( var j=0; j < fields.length; j++ ) {
				var values = fields[j].value;
				if(fields[j].type=="name") {
					name = values.givenName;
				}else if(fields[j].type=="email") {
					email = values;
				}
			}

			result += name + "\n";
			result += email + "\n\n";

			ContactBook.addContact({"name": name, "email" : email});
		}

		$('#result').text(result);
		renderContact();
	});
}

function renderContact() {
	var allContact = ContactBook.getContact();
	$('#interact table tbody').text("");
	$.each(allContact, function(ind, item) {
		$('#interact table tbody').append("<tr>" +
			"<td>" + item.name + "</td>" +
			"<td>" + item.email + "</td>" +
			"<td><input type=\"checkbox\" name=\"mailcheck[]\" value=\"\" checked></td>" +
		"</tr>");
	});
}

function invite() {
	$('#interact table').eq(0).addClass('animated slideOutLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$(this).hide();
	});;

	$('#allcaughtup').show().addClass('animated bounce');
}

$(document).ready(function(){
	$('#inviter-social-button').fadeIn();
});
