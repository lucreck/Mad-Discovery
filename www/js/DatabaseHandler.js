var db = null;
function connectDB() {
    db = window.openDatabase("MadDiscovery", 1.0, "Mad Discovery", 2000000);
    if (db != null) {
        console.log("CONNECT DATABASE OK");
    }
};

function createTable() {
    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS EventLucreCkTBL(ID INTEGER PRIMARY KEY, name, location, mappoint, starts, ends, organizer, images,notes);");
    }, function(err) {
        console.log("CREATE TABLE ERROR " + err.code);
    }, function() {
        console.log("CREATE TABLE OK");
    });
};

function insertEvent(name, location, mappoint, dates, ends, organizer,images,notes, querySuccess) {
    db.transaction(function(tx) {
        tx.executeSql("INSERT INTO EventLucreCkTBL(name, location, mappoint, starts, ends, organizer, images,notes) VALUES(?, ?, ?, ?, ?,?,?,?);",
                        [name, location, mappoint, dates, ends, organizer,images,notes]);
    }, function(err) {
        console.log("INSERT EVENT ERROR " + err.code);
    }, function() {
        querySuccess();
    });
};

function getListEvent(querySuccess) {
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM EventLucreCkTBL;", [], function(tx, results) {
            var numberOfEvent = results.rows.length;
            var listEvents = [];
            for (var i = 0; i < numberOfEvent; i++) {
                listEvents.push({"id": results.rows.item(i).ID, "name": results.rows.item(i).name,
                "location": results.rows.item(i).location,"mappoint": results.rows.item(i).mappoint,  "starts": results.rows.item(i).starts,
                "ends": results.rows.item(i).ends,"organizer": results.rows.item(i).organizer,
                "images": results.rows.item(i).images,"notes": results.rows.item(i).notes});
            }
            querySuccess(listEvents);
        });
    }, function(err) {
        console.log("GET LIST EVENT ERROR " + err.code + err.message);
    });
  }

function deleteEvent(eventID) {
    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM EventLucreCkTBL WHERE ID = ?", [eventID]);
    }, function(err) {
        console.log("DELETE EVENT ERROR " + err.code);
    }, function() {
        console.log("DELETE EVENT OK");
    });
}

function editEvent(name, location, mappoint, dates, ends, organizer,images,notes,id, querySuccess) {
    db.transaction(function(tx) {
        tx.executeSql("UPDATE EventLucreCkTBL SET name = ?, location = ?, mappoint = ?, starts = ?, ends = ?, images = ?, organizer =?, notes = ? WHERE ID = ?",
        [name, location, mappoint, dates, ends, organizer,images,notes, id]);
    }, function(err) {
        console.log("EDIT EVENT ERROR " + err.code);
    }, function() {
        querySuccess();
    });
}

function searchEvent(eventID, querySuccess) {
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM EventLucreCkTBL WHERE ID = ?", [eventID], function(tx, results) {
            querySuccess({"id": results.rows.item(i).ID, "name": results.rows.item(i).name,
            "location": results.rows.item(i).location,"mappoint": results.rows.item(i).mappoint,  "starts": results.rows.item(i).starts,
            "ends": results.rows.item(i).ends,"organizer": results.rows.item(i).organizer,
            "images": results.rows.item(i).images,"notes": results.rows.item(i).notes});
        });
    }, function(err) {
        console.log("SEARCH EVENT ERROR " + err.code);
    });
}

function selectAnEventQuery(eventID, querySelectAnEventSuccess) {
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM EventLucreCkTBL WHERE ID = ?", [eventID], function(tx, results) {
            var numberOfEvent = results.rows.length;
            var listEvents = [];
            for (var i = 0; i < numberOfEvent; i++) {
                listEvents.push({"id": results.rows.item(i).ID, "name": results.rows.item(i).name,
                "location": results.rows.item(i).location,"mappoint": results.rows.item(i).mappoint,  "starts": results.rows.item(i).starts,
                "ends": results.rows.item(i).ends,"organizer": results.rows.item(i).organizer,
                "images": results.rows.item(i).images,"notes": results.rows.item(i).notes});
            }
            querySelectAnEventSuccess(listEvents);
        });
    }, function(err) {
        console.log("Get event error" + err.code + err.message);
    });
  }
