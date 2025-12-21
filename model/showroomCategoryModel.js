var db = require('./databaseConfig.js');

var showroomDB = {
    // Create Category. Showrooms can have categories 
    addShowroomCategory: function (details) {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                } else {
                    var sql = `
                        INSERT INTO showroom_category (name, description)
                        VALUES (?, ?)
                    `;
                    conn.query(
                        sql,
                        [details.name, details.description],
                        function (err, result) {
                            if (err) {
                                conn.end();
                                return reject(err);
                            } else {
                                if (result.affectedRows > 0) {
                                    conn.end();
                                    return resolve({
                                        success: true,
                                        id: result.insertId
                                    });
                                }
                            }
                        }
                    );
                }
            })
        })
    }  
}

module.exports = showroomDB;