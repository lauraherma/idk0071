package com.nerdware.nerdware;
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
