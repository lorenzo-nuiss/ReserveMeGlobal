package fr.ReserveMe.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;


import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SimpleSavedRequest;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//@Configuration
//@EnableWebSecurity
//
//public class SecurityConfiguration {
//
//    @Bean
//    public RequestCache refererRequestCache() {
//        return new HttpSessionRequestCache() {
//            @Override
//            public void saveRequest(HttpServletRequest request, HttpServletResponse response) {
//                String referrer = request.getHeader("referer");
//                if (referrer == null) {
//                    referrer = request.getRequestURL().toString();
//                }
//                request.getSession().setAttribute("SPRING_SECURITY_SAVED_REQUEST",
//                        new SimpleSavedRequest(referrer));
//            }
//        };
//    }
//}