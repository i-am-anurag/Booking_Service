const {BookingRepository} = require('../repository/index');
const axios = require('axios');
const {FLIFHT_SERVICE_PATH} = require('../config/serverConfig');
const ServiceError = require('../utils/errors/index');

class BookingService {
    constructor(){
        this.bookingRepository = new BookingRepository();
    }
    async createBooking(data) {
        try{
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLIFHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            
            let priceOfFlight = flightData.Price;
            if(data.noOfSeats>flightData.totalSeats){
                throw new ServiceError('Something went wrong in booking process','Seats are out of range','')
            }

            const totalCost = priceOfFlight * data.noOfseats;
            console.log(totalCost);
            const bookingPayload = {...data,totalCost}
            const booking = await this.bookingRepository.create(bookingPayload);

            const updateFlightRequestURL = `${FLIFHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestURL,{totalSeats:flightData.totalSeat-booking.noOfseats});
            const finalBooking = this.bookingRepository.update(booking.id,{status:'Booked'});

            return finalBooking;
        }
        catch(error){
            if(error.name == 'Repository Error' || error.name == 'validatioError')
            {
                throw error;
            }
            throw new ServiceError()
        }
    }
}

module.exports = BookingService;