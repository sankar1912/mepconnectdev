const app=require('./app');
const connectDb=require('./config/database')
connectDb();
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server running in the port:${process.env.PORT} in ${process.env.NODE_ENV}`)

})

process.on('unhandledRejection',(err)=>
    {
        console.log(`Error: ${err.message}`);
        console.log(`Shutting down server due to unhandled rejection`);
        server.close(()=>
        {
            process.exit(1);
        })
    })
    
    process.on('uncaughtException',(err)=>
    {
        console.log(`Error: ${err.message}`);
        console.log(`Shutting down server due to uncaught Exception`);
        server.close(()=>
        {
            process.exit(1);
        })
    })