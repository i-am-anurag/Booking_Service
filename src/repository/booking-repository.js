const {ValidationError,AppError} = require("../utils/errors/index");
const {Booking} = require("../models/index");
const {StatusCodes} = require('http-status-codes');

class BookingRepository{

    async create(data) {
        try {
            const response = await Booking.create(data);

            return response;
        } catch (error) {
            if(error.name == "SequelizeValidationError")
            {
                throw new ValidationError(error);
            }

            throw new AppError('Repository Error', 
                                'Cannot create booking',
                                'There is some problem creating booking please try again',
                                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async update(bookingId,data){
        try 
        {
            const booking = await Booking.findByPk(bookingId);
            if(booking.status)
            {
                booking.status = data.status;
            }
            booking.save();
            
            return booking;
        } catch (error) {
            throw new AppError('Repository Error', 
            'Cannot update booking',
            'There is some problem updating booking please try again later',
            StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = BookingRepository;