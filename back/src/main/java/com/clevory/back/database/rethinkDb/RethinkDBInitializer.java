package com.clevory.back.database.rethinkDb;

import com.rethinkdb.RethinkDB;
import com.rethinkdb.gen.ast.Db;
import com.rethinkdb.net.Connection;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.concurrent.TimeoutException;

@Getter
@Setter
public class RethinkDBInitializer implements InitializingBean {

    @Autowired
    private RethinkDBConnectionFactory connectionFactory;

    private static final RethinkDB r = RethinkDB.r;

    private String dbName = "network";

    @Override
    public void afterPropertiesSet() throws Exception {
        createDb();
    }

    private void createDb() throws TimeoutException {
        Connection connection = connectionFactory.createConnection();
        List<String> dbList = r.dbList().run(connection);

        if (!dbList.contains(dbName)) {
            r.dbCreate(dbName).run(connection);
        }
        List<String> tables = r.db(dbName).tableList().run(connection);
        if (!tables.contains("topology")) {
            r.db(dbName).tableCreate("topology").run(connection);
            System.out.println(insertFields(connection));
        }

    }

    public Object insertFields(Connection conn)
    {
        return (r.table("topology").insert(r.array(
                r.hashMap("name", "Test1")
                        .with("type", "Test1")
                        .with("nodes", r.array(
                                        r.hashMap("hostname", "R1")
                                                .with("type", "Router"),
                                        r.hashMap("hostname", "S2")
                                                .with("type", "Switch"),
                                        r.hashMap("hostname", "SE1")
                                                .with("type", "Server")
                                )
                        )
                        .with("links", r.array(
                                r.hashMap("from", "R1")
                                        .with("to", "S2"),
                                r.hashMap("from", "S2")
                                        .with("to", "SE1")
                                )
                        )
        )).run(conn));
    }
}
