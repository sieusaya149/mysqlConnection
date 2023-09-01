var mysql = require("mysql2");

class DbManagerV2{
    static instances = null;
    static indexConnection = 0;
    constructor(){
        this.connection = null
    }
    static getInstance()
    {
        if(DbManagerV2.instances == null)
        {
            DbManagerV2.instances = new DbManagerV2()
        }
        return DbManagerV2.instances
    }

    getConnection() {
        return mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'hiki',
            insecureAuth: true,
        })
    }

    connect()
    {
        this.connection = this.getConnection()
        this.connection.connect( err => {
            if(err) 
            {
                console.error(err)
                return;
            }
            else
            {
                DbManagerV2.indexConnection = DbManagerV2.indexConnection + 1
                this.index = DbManagerV2.indexConnection
                console.log(`New connection with index ${this.index} to mysql `)
            }
        })
        this.connection.on('end', () => {
            console.log(`The connection with index ${this.index} was closed by timeout`)
        })

    }

    makeQuery(queryStr)
    {
        return new Promise((resolve, reject) => {
            this.connection.query(queryStr, (error, records, fields) => {
                if (error) {
                reject(error);
                } else {
                resolve(records);
                }
            });
        });
    }

    end()
    {
        this.connection.end()
    }
}

module.exports = DbManagerV2