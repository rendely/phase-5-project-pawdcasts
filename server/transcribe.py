from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI()

print(client.models.list())
