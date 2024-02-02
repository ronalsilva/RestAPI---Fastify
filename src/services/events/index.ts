import { TicketmasterAPI } from '../../integration/ticketmaster';
import env from "dotenv";
env.config();

export async function getEvents(country:string) {
    try {
        const apiKey = process.env.TICKETMASTER_KEY?? process.exit(1);
        const ticketmasterAPI = new TicketmasterAPI(apiKey);

        // Exemplo: Obtendo todos os eventos nos Estados Unidos
        const allEventsResponse = await ticketmasterAPI.getAllEventsIn(country);

        console.log(allEventsResponse.data._embedded.events)
        return allEventsResponse.data._embedded.events;
    } catch (err:any) {
        return 500
    }
}
