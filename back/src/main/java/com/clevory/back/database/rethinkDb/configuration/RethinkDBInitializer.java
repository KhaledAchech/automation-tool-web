package com.clevory.back.database.rethinkDb.configuration;

import com.rethinkdb.RethinkDB;
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

    private String dbName = "editor";

    @Override
    public void afterPropertiesSet() throws Exception {
        createDb(dbName);
    }

    private void createDb(String dbName) throws TimeoutException {
        Connection connection = connectionFactory.createConnection();
        List<String> dbList = r.dbList().run(connection);

        if (!dbList.contains(dbName)) {
            r.dbCreate(dbName).run(connection);
        }

    }

    public void createTable(String name) throws TimeoutException {
        Connection connection = connectionFactory.createConnection();

        List<String> tables = r.db(dbName).tableList().run(connection);
        if (!tables.contains(name)) {
            r.db(dbName).tableCreate(name).run(connection);
        }
    }
}
