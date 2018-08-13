var numberOfMessagesToSend;
var messageToSend;
var windows = [];
var inputs = [];
windows.length = 0;
var windowCounter = 0;

chrome.runtime.sendMessage('message', function(response) {
    chrome.runtime.sendMessage('bob', function(response2) {
        numberOfMessagesToSend = response;
        messageToSend = response2;
        test(numberOfMessagesToSend);

    });
});

function test(a){
    //opens all the profiles on the screen that haven't been messaged yet
    var allProfiles = document.getElementsByClassName("match_card_wrapper user-not-hidden matchcard-user");
    var tempSize = allProfiles.length;
    console.log('The size of the array before culling ' + tempSize);
    var bob;
    for(var i = 0; i < tempSize; i++){
        bob = document.getElementById(allProfiles[i].id).getElementsByClassName( 'bar last_contact' )[0];
        if(bob == null){

            inputs.push(allProfiles[i]);
        }
        else{

        }
    }

    console.log('The size of the array after culling ' + inputs.length);
    for(var i = 0; i < a; i++){
        (function () {
            testIfViewedAndOpen(inputs[i].id);
            var testWindow = windows[i];
            testWindow.onload = function() {
                sendMessageToWindow(testWindow);

            };

        }());
    }

    function testIfViewedAndOpen(testObjectId){

        //var bob = document.getElementById( testObjectId ).getElementsByClassName( 'bar last_contact' )[0];
        var findHref= document.getElementById(testObjectId ).getElementsByClassName('image_link')[0];
            windows.push(window.open(findHref.getAttribute('href'), windowCounter++, "height=1,width=1"));

    }

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sendMessageToWindow(currentWindow){
		flag = true
		//likes the profile
		inputs5 = currentWindow.document.getElementsByClassName("profile-buttons-actions-action profile-buttons-actions-like");
		for (var i = 0; i < inputs5.length; i++) {
					if(inputs5[i].getAttribute("id") == "like-button"){
						inputs5[i].click();

						flag = false
					}
				}
		
		//gets past pop up
		inputs4 = currentWindow.document.getElementsByClassName("flatbutton blue");
		inputs4[5].click();
			
        //console.log('clicking button for ' + currentWindow);
        /*inputs2 = currentWindow.document.getElementsByClassName("actions2015-chat flatbutton blue");

        inputs2[0].click(); */


        //if the profile is already liked
		if(flag){
			var xPathRes = currentWindow.document.evaluate ('//*[@id="profile_actions"]/div/div/span/div/div/button[2]/span[2]', currentWindow.document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			xPathRes.singleNodeValue.click();
		}
		


//for entering in the message
    async function writeMessage(currentWindow) {

        try {
            await sleep(5000);
			
			

            inputs = currentWindow.document.getElementsByClassName("textarea");
            var textBox;
            for(var i = 0; i < inputs.length; i++){
                s = inputs[i].id;
                if(s.substring(0, s.indexOf('_')) == 'message'){
                    textBox = inputs[i].id;
                    break;
                }
            }
            s = textBox;
            s = s.substring(0, s.indexOf('C'));


            z = currentWindow.document.getElementById(s).value = messageToSend;
        }
        catch(err) {
            console.log('There was an error');
        }

        await sleep(5000);
    }
    var readyState = currentWindow.document.readyState;
    function checkFlag() {
        if (readyState == 'complete') {
            writeMessage(currentWindow);
            //console.log(currentWindow + ' is ready... writing message');
        } else {
            window.setTimeout(checkFlag, 100);
        }
    }
    checkFlag();


//for sending message

    async function closeWindow(currentWindow) {
        //console.log('initiating close window function on ' + currentWindow);
        await sleep(5000);

        inputs3 = currentWindow.document.getElementsByClassName("flatbutton");
        for (var i = 0; i < inputs3.length; i++) {
            if(inputs3[i].getAttribute("type") == "submit"){
                inputs3[i].click();

            }
        }
        await sleep(5000);
        currentWindow.close();

    }

        closeWindow(currentWindow);
}


