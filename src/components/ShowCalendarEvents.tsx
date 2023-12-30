import axios from "axios";
import { useState } from "react";
import clientData from "../data/client_data.json";
import { buildUrlFromParameters } from "../utils/urlBuilder";
import { Token } from "../google_oauth/interfaces";
import CalendarEventsList from "./CalendarEventsList";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";


type EventTypes = "default" | "focusTime" | "outOfOffice" | "workingLocation";
interface GoogleCalendarEventsListRequest {
  calendarId: "primary",
  alwaysIncludeEmail?: boolean,
  eventTypes?: EventTypes,
  maxAttendees?: number,
  maxResults: number,
  orderBy?: "startTime" | "updated",
  sharedExtendedProperty?: string,
  showDeleted?: boolean,
  timeMax?: Date | string,
  timeMin?: Date | string,
  updatedMin?: Date | string
}

interface CalendarEventTimestamp {
  date: Date,
  dateTime: string, //"2019-10-28T13:30:00+01:00",
  timeZone: string //"Europe/Prague"
};

interface CalendarEventRelatedPerson {
  id: string,
  email: string, //"viktorbjk@gmail.com",
  displayName: string,
  self: boolean, //true
};

export interface EventResource {
  kind: "calendar#event",
  etag: string,
  id: string,
  status: string,
  htmlLink: string,
  created: Date, //"2019-10-16T16:02:07.000Z",
  updated: Date, //"2019-10-16T16:02:07.930Z",
  summary: string, //Kadernik
  description: string,
  location: string,
  colorId: string,
  creator: CalendarEventRelatedPerson,
  organizer: CalendarEventRelatedPerson,
  start: CalendarEventTimestamp,
  end: CalendarEventTimestamp,
  endTimeUnspecified: boolean,
  recurrence: string[],
  transparency: string, //"transparent",
  iCalUID: string, //"6hj64p1g69j3gb9mckr64b9k74s30bb16pijgb9i6dgj4ob668smcdhlc4@google.com",
  sequence: number, //0
  reminders: {
    useDefault: boolean,
    overrides: [{
      method: string,
      minutes: number
    }]
  },
  eventType: string //"default"
};

interface GoogleCalendarEventsResponse {
  kind: "calendar#events",
  etag: string,
  summary: string,
  description: string,
  updated: Date,
  timeZone: string,
  accessRole: string,
  defaultReminders: [{
    method: string,
    minutes: number
  }],
  nextPageToken: string,
  nextSyncToken: string,
  items: Array<EventResource>
}

const ShowCalendarEvents = ({ token }: { token: Token }) => {

  const [calendarEvents, setCalendarEvents] = useState([] as EventResource[]);
  const [owner, setOwner] = useState("");
  const [displayResults, setDisplayResults] = useState(false);
  const [startDate, setStartDate] = useState(Date.now())

  const populateCalendarEventsListEndpointPlaceholder = () => {
    const uriTemplate = clientData.calendar_list_uri_template.template;
    const replacementValue: string = "primary";

    return uriTemplate.replace(clientData.calendar_list_uri_template.toReplace, replacementValue);
  }

  function getTokenFromLocalStorage(): Token {

    const localTokenString = localStorage.getItem("token");
    const empty: Token = {
      access_token: "",
      expires_in: 0,
      refresh_token: "",
      scope: "",
      token_type: "Bearer"
    } as Token;

    if (localTokenString === null) {
      console.log("Returning empty access token from local storage");
      return empty;
    }

    const localToken = JSON.parse(localTokenString) as Token;
    console.log("Returning from local storage: ", localToken);
    return localToken;
  }

  const getCalendarEvents = () => {

    const url: string = populateCalendarEventsListEndpointPlaceholder();

    const requestParameters: GoogleCalendarEventsListRequest = {
      calendarId: "primary",
      maxResults: 10,
      showDeleted: false,
      timeMin: new Date(startDate).toISOString()
    };

    console.log(requestParameters)

    console.log("Token parameter: ", token);
    const finalToken: Token = (token === null || token === undefined || Object.keys(token).length === 0)
      ? getTokenFromLocalStorage()
      : token;
    const requestUrl: string = buildUrlFromParameters(url, requestParameters, "EventsList GET");
    const requestHeader = {
      headers: {
        "Authorization": [finalToken.token_type, finalToken.access_token].join(" ")
      }
    }

    console.log(requestHeader);

    axios.get<GoogleCalendarEventsResponse>(requestUrl, requestHeader)
      .then(eventsListPromise => {
        let response: GoogleCalendarEventsResponse = eventsListPromise.data;
        const events: EventResource[] = response.items;

        setOwner(response.summary);
        setCalendarEvents(events);
        setDisplayResults(true);
      })
      .catch(error => {
        console.error("Error while getting calendar events list: ", error);
      })
  }

  const showCalendarEvents = () => {
    const eventsList = calendarEvents.length === 0
      ? <div>{"There are no events in the calendar"}</div>
      : <CalendarEventsList events={calendarEvents} />

    return (
      <>
        <div>{`Displaying events for ${owner}`}</div>
        {eventsList}
      </>
    )
  }

  const handleSetStartDate = (newDate: number | null, context: PickerChangeHandlerContext<DateValidationError>) => {

    if (newDate !== null) {
      console.log(`Setting new date: ${newDate}`)
      setStartDate(newDate);
    }
  }


  return (
    <div>
      <h1>Your calendar events</h1>
      <div>Choose start date for your calendar events: </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DatePicker label="Choose start day" onChange={handleSetStartDate} format="DD MMMM YYYY"/>
        </DemoContainer>
      </LocalizationProvider>

      <button onClick={getCalendarEvents}>Show Me</button>
      {displayResults
        ? showCalendarEvents()
        : <></>
      }
    </div>
  );
}

export default ShowCalendarEvents;