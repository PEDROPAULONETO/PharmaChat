package pharmachat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"pharmachat", "config", "ai", "controller"})
public class PharmaChatApplication {

	public static void main(String[] args) {
		SpringApplication.run(PharmaChatApplication.class, args);
	}

}
