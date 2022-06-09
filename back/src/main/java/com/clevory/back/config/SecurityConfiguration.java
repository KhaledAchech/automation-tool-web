package com.clevory.back.config;

import com.clevory.back.filter.CustomAuthenticationFilter;
import com.clevory.back.filter.CustomAuthorizationFilter;
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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean());
        customAuthenticationFilter.setFilterProcessesUrl("/app/login");
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(STATELESS);

        //public access.
        http.authorizeRequests()
                .antMatchers(
                        "/app/login/**",
                        "/token/refresh/**")
                .permitAll();

        //Only CTNAS Admins.
        http.authorizeRequests()
                .antMatchers(
                        "/api/tenants/**",
                        "/api/dcAutomation/**")
                .hasAnyAuthority( "ROLE_CTNAS_ADMIN");

        //Only Tenant Admins and CTNAS admins.
        http.authorizeRequests()
                .antMatchers(
                        "/api/users/**",
                        "/api/roles/**",
                        "/editor/diagram/**",
                        "/api/topologies/**")
                .hasAnyAuthority( "ROLE_TENANT_ADMIN");

        //All the authenticated users with the roles defined as : 'ROLE_CTNAS_ADMIN' , 'ROLE_TENANT_ADMIN' , 'ROLE_MODERATOR'.
        http.authorizeRequests()
                .antMatchers(
                        "/api/configurations/**",
                        "/api/devices/**",
                        "/api/interfaces/**",
                        "/api/protocols").
                hasAnyAuthority( "ROLE_MODERATOR");
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
