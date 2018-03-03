package com.nerdware.nerdware.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableJpaRepositories("com.nerdware.nerdware.entity")
@EnableTransactionManagement
@Configuration
public class JPAConfig {
    //kes suhtleb minu eest postgre andmebaasiga

}
