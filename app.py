from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from TTS.api import TTS
import uuid
import os

app = FastAPI(title="XTTS Voice Cloning API")

# 🔹 Load XTTS model (CPU by default)
tts = TTS(
    model_name="tts_models/multilingual/multi-dataset/xtts_v2",
    progress_bar=False
)

@app.get("/health")
def health():
    return {"status": "AI service running"}

@app.post("/clone")
async def clone_voice(
    text: str = Form(...),
    voice: UploadFile = File(...)
):
    if not voice.filename.endswith(".wav"):
        raise HTTPException(status_code=400, detail="Only WAV files allowed")

    if len(text) > 200:
        raise HTTPException(
            status_code=400,
            detail="Text too long for CPU mode"
        )

    uid = str(uuid.uuid4())
    speaker_path = f"/tmp/{uid}.wav"
    output_path = f"/tmp/{uid}_out.wav"

    with open(speaker_path, "wb") as f:
        f.write(await voice.read())

    tts.tts_to_file(
        text=text,
        speaker_wav=speaker_path,
        language="en",
        file_path=output_path
    )

    return FileResponse(
        output_path,
        media_type="audio/wav",
        filename="output.wav"
    )
