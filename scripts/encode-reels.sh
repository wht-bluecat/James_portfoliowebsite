#!/bin/bash
# Encode the OAX Media reels in the Client reels section from the delivered
# masters (2160x3840, 59.94 fps): 1080x1920 at 30 fps, H.264 + AAC, faststart,
# so a reel starts playing before it has finished downloading. Writes
# <slug>.mp4 and <slug>.jpg (the poster) into public/reels; the slugs are the
# ones listed under `agency.reels` in src/data/work.ts.
#
#   bash scripts/encode-reels.sh
#
# The masters are not in this repo. Point OAX_AHS at wherever they live on the
# machine you are on.
set -euo pipefail
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/reels"
mkdir -p "$OUT"; cd "$OUT"
AHS="${OAX_AHS:-$HOME/Downloads/OAX/2026-11-06 AHS/06 Exports}"

# reel <slug> <master> <poster-time>
# The poster is a frame where the edit's own graphics are on screen, so the
# still says what the reel does before anyone presses play.
reel() {
  ffmpeg -v error -y -i "$2" \
    -vf "fps=30,scale=1080:1920:flags=lanczos" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -preset slow -crf 27 \
    -c:a aac -b:a 128k -movflags +faststart "$1.mp4"
  ffmpeg -v error -y -ss "$3" -i "$2" -frames:v 1 \
    -vf "scale=720:1280:flags=lanczos" -q:v 4 "$1.jpg"
}

reel oax-water-mitigation "$AHS/07_WaterMitigation.mp4"   18.6
reel oax-one-call         "$AHS/08_1CallPeaceOfMind.mp4"  17.5
reel oax-meaning-of-ahs   "$AHS/09_MeaningOfAHS.mp4"      1.4

ls -la "$OUT" | awk 'NR>3{printf "%8.0f KB  %s\n", $5/1024, $9}'
du -sh "$OUT"
