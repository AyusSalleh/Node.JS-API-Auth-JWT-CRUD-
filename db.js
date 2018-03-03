var mongoose    = require('mongoose');
mongoose.connect('mongodb://nodebearUsername:nodebearPass@ds153948.mlab.com:53948/nodebeardb');
mongoose.connection
     .once('open', () => console.log('Good to go!'))
     .on('error', (error) => {
        console.warn('Warning', error);
});