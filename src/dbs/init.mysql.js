var mysql = require("mysql2");

class DbManager{
    static instances = null;
    static indexConnection = 0;
    constructor(){
        this.connection = null
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
                DbManager.indexConnection = DbManager.indexConnection + 1
                this.index = DbManager.indexConnection
                console.log(`New connection with index ${this.index} to mysql `)
            }
        })
        this.connection.on('end', () => {
            console.log(`The connection with index ${this.index} was closed by timeout`)
        })

    }

    makeQuery(queryStr)
    {
        this.connect()
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

module.exports = DbManager