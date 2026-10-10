#!/bin/bash
# Encode the loops in the Motion section from the delivered Green Thumb Depot
# renders: silent H.264, faststart, seamless at the loop point, sized for the
# slot each one is shown in. Writes <slug>.mp4 and <slug>.jpg (the poster) into
# public/motion; the slugs are the ones listed under `loops` in src/data/work.ts.
#
#   bash scripts/encode-motion.sh
#
# The renders are not in this repo. Point the variables below at wherever
# they live on the machine you are on.
set -euo pipefail
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/motion"
mkdir -p "$OUT"; cd "$OUT"
E14="${GTD_EP14_EXPLAINERS:-$HOME/Downloads/podcast 14/03-ANIMATIONS/explainers-v2}"
V14="${GTD_EP14_VERTICALS:-$HOME/Downloads/podcast 14/06-SHORTS/vertical-animations}"
M="${GTD_SHORTS_ARCHIVE:-$HOME/Movies/GTD-MAC-WEEKEND/03-media-shorts/Downloads}"
BC10="${GTD_BC10:-$HOME/Downloads/GTD/bc/bc 10}"
X=(-an -c:v libx264 -profile:v high -pix_fmt yuv420p -preset slow -movflags +faststart)

# Every loop is made seamless: the last half second cross-fades into the first
# half second, so the restart is invisible and frame 0 is never a black frame.
F=0.5

# loopfilter <pre-filters> <length>  ->  filtergraph producing [out]
loopfilter() {
  local L=$2
  local off; off=$(echo "$L - 2*$F" | bc)
  echo "[0:v]$1,fps=30,split[a][b];[a]trim=start=$F:end=$L,setpts=PTS-STARTPTS[main];[b]trim=start=0:end=$F,setpts=PTS-STARTPTS[head];[main][head]xfade=transition=fade:duration=$F:offset=$off[out]"
}

# land <name> <src> <start> <length> <width> <crf> <poster-time>
land() {
  ffmpeg -v error -y -ss "$3" -t "$4" -i "$2"     -filter_complex "$(loopfilter "scale=$5:-2:flags=lanczos" "$4")" -map "[out]"     "${X[@]}" -crf "$6" "$1.mp4"
  ffmpeg -v error -y -ss "$7" -i "$2" -frames:v 1 -vf "scale=$5:-2:flags=lanczos" -q:v 4 "$1.jpg"
}

# vert <name> <src> <crf> <poster seconds-from-end>
# Crops the top 1080x1350: the bottom third of a vertical cutaway is the
# caption zone and is left blank by design.
vert() {
  local L; L=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$2")
  L=$(printf "%.2f" "$(echo "$L - 0.1" | bc)")
  ffmpeg -v error -y -t "$L" -i "$2"     -filter_complex "$(loopfilter "crop=1080:1350:0:0,scale=720:900:flags=lanczos" "$L")" -map "[out]"     "${X[@]}" -crf "$3" "$1.mp4"
  ffmpeg -v error -y -sseof "-$4" -i "$2" -frames:v 1     -vf "crop=1080:1350:0:0,scale=720:900:flags=lanczos" -q:v 4 "$1.jpg"
}

land wasp-inside-aphid       "$E14/ep14-WaspInsideAphid-preview.mp4"       0.4  32.2 1280 26 24
land sticky-trap             "$E14/ep14-StickyTrapSensor-preview.mp4"      17.6 19   960  26 30
land defoliate-spray-release "$E14/ep14-DefoliateSprayRelease-preview.mp4" 0.2  12.5 960  26 8

vert one-hunter-per-stage "$V14/ep14-ThripsHuntersVert.mp4" 27 1.5
vert pore-air             "$BC10/BC10-animation-1-PoreAirVert.mp4" 27 1.5
vert redeploy             "$M/podcast 8/shorts/short-1/assets/ep08-short1-Redeploy.mp4" 27 1.5
vert scissor-chamber      "$M/podcast 8/shorts/short-3/assets/ep08-short3-ScissorChamber.mp4" 27 1.5

ls -la "$OUT" | awk 'NR>3{printf "%8.0f KB  %s\n", $5/1024, $9}'
du -sh "$OUT"
