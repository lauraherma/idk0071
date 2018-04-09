package com.nerdware.nerdware;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

@SpringBootApplication(scanBasePackageClasses = {NerdwareApplication.class, Jsr310JpaConverters.class})
public class NerdwareApplication {

	public static void main(String[] args) {
		SpringApplication.run(NerdwareApplication.class, args);
	}

}


