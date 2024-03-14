
def check_mongo_uri(mongo_uri):
    if not mongo_uri:
        print("MONGO_URI is not provided.")
        exit(1)
    if not mongo_uri.startswith("mongodb+srv://"):
        print("Invalid MONGO_URI. It should start with 'mongodb+srv://'.")
        exit(1)

def check_jwt_key(jwt_key):
    if not jwt_key:
        print("JWT_KEY is not provided.")
        exit(1)

def main():
    mongo_uri = input("Enter MONGO_URI: ")
    jwt_key = input("Enter JWT_KEY: ")

    check_mongo_uri(mongo_uri)
    check_jwt_key(jwt_key)

    with open(".env", "w") as f:
        f.write(f"MONGO_URI='{mongo_uri}'\n")
        f.write(f"JWT_KEY='{jwt_key}'\n")

    print(".env file created successfully.")

if __name__ == "__main__":
    main()
