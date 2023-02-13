const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');
const bookingService = new BookingService();

const createBooking = async (req, res) => {
    try {
        const flight = await bookingService.createBooking(req.body);

        return res.status(StatusCodes.OK).json({
            data:flight,
            success:true,
            message: 'Successfully Complete Booking',
            error:{},
        });
    }
    catch(error){
        return res.status(error.statusCode).json({
            data:{},
            success:false,
            message: error.message,
            error:error.explanation,
        });
    }
}

module.exports = {
    createBooking,

}