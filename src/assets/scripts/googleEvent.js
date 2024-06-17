
const CLIENT_ID = 
    "46827845441-ou0ofhk3muuo2uhi10sde01bv4gscj1v.apps.googleusercontent.com";
const API_KEY = "AIzaSyCjPfzbxawfiS-dbHEUZVAWMAIo4YgYd7Y";
const DISCOVERY_DOC = 
   "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

   //" https://www.googleapis.com/auth/calendar
  //   https://www.googleapis.com/auth/calendar.events 
  //   https://www.googleapis.com/auth/calendar.events.readonly  
  //   https://www.googleapis.com/auth/calendar.readonly"
const SCOPES =
 //"https://www.googleapis.com/auth/admin.directory.resource.calendar";
  " https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly"
let tokenClient;
let gapiInited = false;
let gisInited = false;

function gapiloaded(){
    //alert("gapi enterd");
    gapi.load("client", initializeGapiClient);
}

async function initializeGapiClient(){
   // alert("enter initializegapiclient");
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
}

function gisloaded(){
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: "", // define later
    });
    gisInited = true;
}

function createGoogleEvent(eventDetails){
    //alert("enter gapi event"+ eventDetails.email);
    tokenClient.callback = async (resp) => {
        //alert("call back enterd"+ resp);
         if (resp.error !== undefined) {
            throw resp;
        }
        await scheduleEvent(eventDetails);
    };
     // alert("gapi logs"+ gapi.client.getToken());
    if (gapi.client.getToken() === null){
        tokenClient.requestAccessToken({ prompt: "consent"});
    } else {
        tokenClient.requestAccessToken({promt: ""});
    }
}

function scheduleEvent(eventDetails){
    const event = {
        summary: "Google I/O 2015",
        location: "800 Howard st, San Francisco, CA 94103",
        description: "A chance to hear more about Google's developer products",
        start: {
            dateTime: eventDetails.startTime,
            timeZone: "America/Los_Angeles",
        },
        end: {
            dateTime: eventDetails.endTime,
            timeZone: "America/Los_Angeles",
        },
        recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
        attendees: [{ email: eventDetails.email}],
        reminders: {
            useDefault: false,
            overrides: [
                { method: "email", minutes: 24*60 },
                { method: "popup", minutes: 10 },
            ],
        },
    };
    const request = gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
    });
    request.execute(function (event) {
        console.info("Event created: " + event.htmlLink);
    });

    function execute() {
        return gapi.client.calendar.events.list({})
            .then(function(response) {
                    // Handle the results here (response.result has the parsed body).
                    events.list('primary').setPageToken(pageToken).execute() ;
                    events.getItems();

                    console.log("Response", response);
                  },
                  function(err) { console.error("Execute error", err); });
      }

   

}