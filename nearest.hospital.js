const axios = require('axios');
exports.handler = async(context, event, callback) => {
  console.log("IN FUNC");
  let response='';
  let receipent_contact=event.receipent_contact;
  let latitude=event.latitude;
  let longitude=event.longitude;
  try {
    let userList = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=1500&type=hospital&keyword=hospital&key=AIzaSyBOnC7UL72njjD4hNtf6_hJ3tpqaulmscc`);
    console.log(userList.data);
    for(var i=0; i<userList.data.results.length-((userList.data.results.length)/2); i++){
      var lat=userList.data.results[i].geometry.location.lat;
      var lng=userList.data.results[i].geometry.location.lng;
      var name=userList.data.results[i].name
      var vicinity=userList.data.results[i].vicinity
      
      
      var link=`https://www.google.com/maps?q=${lat},${lng}`;
      response=response+`\n\n*${name}*\n_${vicinity}_\n${link}`;
    }

  } catch (error) {
    console.error(error);
  }
  //send the updated status
  const twilioClient = context.getTwilioClient();
  const from = event.From || 'whatsapp:+14155238886';
  const to = event.To || `${receipent_contact}`;
  const body = event.Body || `${response}`;
  twilioClient.messages
    .create({ body, to, from })
    .then((message) => {
      console.log('SMS successfully sent');
      console.log(message.sid);
      return callback(null, `Success! Message SID: ${message.sid}`);
    })
    .catch((error) => {
      console.error(error);
      return callback(error);
    });

};
