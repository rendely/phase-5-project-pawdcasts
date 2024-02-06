from dotenv import load_dotenv
from openai import OpenAI
import requests
from pydub import AudioSegment
from pydub.silence import split_on_silence
import tempfile

load_dotenv()

client = OpenAI()

url = 'https://dts.podtrac.com/redirect.mp3/pdrl.fm/a5a3b4/dovetail.prxu.org/298/957272c1-1de9-4d5c-a062-42bfe52220e8/TED_Good_Sport_Trailer_v1_Master_v2_JTG_010623.mp3'

url = 'https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/chtbl.com/track/524GE/traffic.megaphone.fm/VMP4521893340.mp3?updated=1706908172'


file_path = "audio/audio.mp3"
output_dir = "audio"

print('Starting download...')

response = requests.get(url)
response.raise_for_status()
with open(file_path, "wb") as file:
    file.write(response.content)

print('Download complete')

audio = AudioSegment.from_mp3(file_path)
chunks = split_on_silence(audio, min_silence_len=2000, silence_thresh=-20, keep_silence=True,seek_step=100)

# now recombine the chunks so that the parts are at least 90 sec long
target_length = 90 * 1000
output_chunks = [chunks[0]]
for chunk in chunks[1:]:
    if len(output_chunks[-1]) < target_length:
        output_chunks[-1] += chunk
    else:
        # if the last output chunk is longer than the target length,
        # we can start a new one
        output_chunks.append(chunk)


for i, chunk in enumerate(output_chunks):
    with tempfile.NamedTemporaryFile(delete=True, suffix='.mp3') as tmp_file:
        file_name = f'{output_dir}/chunk{i}.mp3'
        chunk.export(file_name, format='mp3')
        # chunk.export(tmp_file.name, format="mp3")
        # tmp_file.seek(0) # Go to the start of the file
        # transcript = client.audio.transcriptions.create(
        #     model="whisper-1", 
        #     file=open(tmp_file.name, 'rb')
        # )
        # print(transcript)
        print(file_name)
print("Splitting complete!")




# audio_file = open(file_path, "rb")

# transcript = client.audio.transcriptions.create(
#   model="whisper-1", 
#   file=audio_file
# )

# print(transcript)
