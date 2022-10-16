import wixWindow from 'wix-window';
import {fetch} from 'wix-fetch';
$w.onReady(function () {

});

export function sendButton_click(event) {
	
	wixWindow.getCurrentGeolocation()
    .then( (obj) => {
		console.log("IN FUNCT");
        let latitude = obj.coords.latitude;             // 32.0971036
        let longitude = obj.coords.longitude;           // 34.774391099999995          
		console.log(latitude);
		let phoneNum = $w('#phoneNumber').value;
		fetch(`https://med-circle-1873.twil.io/nearest-hospital?receipent_contact=whatsapp:%2B94${phoneNum.slice(1)}&latitude=${latitude}&longitude=${longitude}`, {"method": "get"})
			.then( (httpResponse) => {
				if (httpResponse.ok) {
				return httpResponse.json();
				} else {
				return Promise.reject("Fetch did not succeed");
				}
			} )
			.then(json => console.log(json.someKey))
			.catch(err => console.log(err));
		})
    .catch( (error) => {
        let errorMsg = error;
    });
}
