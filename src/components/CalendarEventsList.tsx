import { EventResource } from "./ShowCalendarEvents";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const CalendarEventsList = ({ events }: { events: EventResource[] }) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Event Name</TableCell>
            <TableCell align="right">Event Creator</TableCell>
            <TableCell align="right">Event Start Date</TableCell>
            <TableCell align="right">Event End Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event, index) => {
            console.log(event);

            if (event.status === "cancelled") {
              return <></>;
            }

            return (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{event?.summary ?? "N/A"}</TableCell>
                <TableCell align="right">{event?.creator?.email ?? "N/A"}</TableCell>
                <TableCell align="right">{event?.start?.dateTime ?? "N/A"}</TableCell>
                <TableCell align="right">{event?.end?.dateTime ?? "N/A"}</TableCell>
                <TableCell align="right">{event?.status ?? "N/A"}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CalendarEventsList;