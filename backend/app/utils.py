def verify_password(plain_password: str, stored_password: str) -> bool:
    return plain_password == stored_password

def get_password_hash(password: str) -> str:
    return password