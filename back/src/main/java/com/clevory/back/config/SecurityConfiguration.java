package com.clevory.back.config;

import com.clevory.back.filter.CustomAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.security.config.http.SessionCreationPolicy.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(STATELESS);
        http.authorizeRequests().antMatchers( "/api/tenants/**").hasAnyAuthority( "ROLE_CTNAS_ADMIN");
        http.authorizeRequests().antMatchers( "/editor/**").hasAnyAuthority("ROLE_TENANT_ADMIN", "ROLE_CTNAS_ADMIN");
        http.authorizeRequests().antMatchers( "/api/users/**").hasAnyAuthority("ROLE_TENANT_ADMIN", "ROLE_CTNAS_ADMIN");
        http.authorizeRequests().antMatchers( "/api/roles/**").hasAnyAuthority("ROLE_TENANT_ADMIN", "ROLE_CTNAS_ADMIN");
        http.authorizeRequests().antMatchers( "/api/**").hasAnyAuthority("ROLE_TENANT_ADMIN", "ROLE_CTNAS_ADMIN", "ROLE_MODERATOR");
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(new CustomAuthenticationFilter(authenticationManagerBean()));
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
