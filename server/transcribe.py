from dotenv import load_dotenv
from openai import OpenAI
import requests

load_dotenv()

client = OpenAI()

url = 'https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/chtbl.com/track/524GE/traffic.megaphone.fm/VMP4521893340.mp3?updated=1706908172'

url = 'https://dts.podtrac.com/redirect.mp3/pdrl.fm/a5a3b4/dovetail.prxu.org/298/957272c1-1de9-4d5c-a062-42bfe52220e8/TED_Good_Sport_Trailer_v1_Master_v2_JTG_010623.mp3'

file_path = "audio.mp3"
response = requests.get(url)
response.raise_for_status()
with open(file_path, "wb") as file:
    file.write(response.content)

audio_file= open(file_path, "rb")

transcript = client.audio.transcriptions.create(
  model="whisper-1", 
  file=audio_file
)

print(transcript)
