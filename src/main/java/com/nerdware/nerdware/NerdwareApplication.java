package com.nerdware.nerdware;
/*
import org.apache.catalina.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import java.util.Collections;*/
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NerdwareApplication {

	public static void main(String[] args) {
		SpringApplication.run(NerdwareApplication.class, args);
	}
}

/*
Võtsin selle Spring Booti ametlikust tutvustusest ehk annab sellega midagi analoogset teha adminile
@Configuration
@EnableWebSecurity
class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	@Bean
	UserDetailsService users () {
		return new InMemoryUserDetailsManager(Collections.singleton(User.withUsername().roles("ADMIN").password("pw").build()))
	}
}*/
