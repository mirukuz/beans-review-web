import os
import base64

# Generate random strings
NUXT_OIDC_SESSION_SECRET = base64.urlsafe_b64encode(os.urandom(48)).decode('utf-8')
NUXT_OIDC_AUTH_SESSION_SECRET = base64.urlsafe_b64encode(os.urandom(48)).decode('utf-8')

# Generate a random AES key in base64
key = os.urandom(32)  # 256 bits key for AES-256
NUXT_OIDC_TOKEN_KEY = base64.b64encode(key).decode('utf-8')

print(f'NUXT_OIDC_SESSION_SECRET: {NUXT_OIDC_SESSION_SECRET}')
print(f'NUXT_OIDC_TOKEN_KEY: {NUXT_OIDC_TOKEN_KEY}')
print(f'NUXT_OIDC_AUTH_SESSION_SECRET: {NUXT_OIDC_AUTH_SESSION_SECRET}')