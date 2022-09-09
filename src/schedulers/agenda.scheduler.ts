import { DB_CONNECTION_STRING } from '@/config';
import Agenda from 'agenda';

const agenda = new Agenda({
  db: { address: DB_CONNECTION_STRING as string },
});


export default agenda;