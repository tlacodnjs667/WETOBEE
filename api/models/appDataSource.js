const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
    type:process.env.TYPEORM_CONNECTION,
    host:process.env.TYPEORM_HOST,
    port:process.env.TYPEORM_PORT,
    password:process.env.TYPEORM_PASSWORD,
    username:process.env.TYPEORM_USERNAME,
    database:process.env.TYPEORM_DATABASE
})

appDataSource.initialize()
    .then(()=>{
        console.log('Data Source has been initialized!');
    })
    .catch((err)=>{
        console.error('Error during Data Source initialization')
        appDataSource.destroy();
    })


module.exports={appDataSource};