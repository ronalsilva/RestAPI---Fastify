import { getEvents } from './';

// Simula uma resposta bem-sucedida da API Ticketmaster
jest.mock('../../integration/ticketmaster', () => ({
    TicketmasterAPI: jest.fn().mockImplementation(() => ({
        getAllEventsIn: jest.fn().mockResolvedValue({
            data: {
                _embedded: {
                    events: ['Event1', 'Event2']
                }
            }
        })
    }))
}));

describe('getEvents function', () => {
    it('should return an array of events for a valid country', async () => {
        const country = 'USA';
        const result = await getEvents(country);
        expect(result).toEqual(['Event1', 'Event2']);
    });

    it('should return 500 for an invalid country', async () => {
        // Mockar uma resposta de erro da API Ticketmaster
        jest.spyOn(console, 'log').mockImplementation(() => {}); // Suprimir o log de erro na console
        jest.requireMock('../../integration/ticketmaster').TicketmasterAPI.mockImplementation(() => ({
            getAllEventsIn: jest.fn().mockRejectedValue(new Error('Error fetching events'))
        }));

        const country = 'InvalidCountry';
        const result = await getEvents(country);
        expect(result).toEqual(500);
    });
});