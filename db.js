const mongoose =require('mongoose') ;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    // Si no quieres que tu aplicación se inicie si no puede conectarse a la base de datos,
    // puedes terminar el proceso aquí:
    process.exit(1);
  }
};

module.exports= connectDB

