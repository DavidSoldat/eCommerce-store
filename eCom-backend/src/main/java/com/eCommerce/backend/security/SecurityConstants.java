package com.eCommerce.backend.security;

public class SecurityConstants {
    public static final long JWT_EXPIRATION = 1296000000;
    public static final int TOKEN_MAXAGE = (int) (JWT_EXPIRATION / 1000);
}
