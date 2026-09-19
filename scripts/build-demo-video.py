#!/usr/bin/env python3
"""Build the narrated Secret Pond Proof hackathon demo."""

from pathlib import Path
import subprocess
import textwrap

from PIL import Image, ImageDraw, ImageFont, ImageOps
import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "demo-output"
W, H = 1280, 720
BG, PANEL, INK = "#070814", "#12152a", "#f4f3ff"
MUTED, PURPLE, CYAN, GREEN, RED = "#b9bdd7", "#9b7cff", "#5cd8ff", "#63f7b1", "#ff7185"


def font(size, bold=False):
    names = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/SFNS.ttf",
    ]
    for name in names:
        if Path(name).exists():
            return ImageFont.truetype(name, size)
    return ImageFont.load_default()


def wrap(draw, text, xy, width, size=28, color=INK, bold=False):
    chars = max(12, int(width / (size * .55)))
    draw.multiline_text(xy, "\n".join(textwrap.wrap(text, chars)), font=font(size, bold), fill=color, spacing=11)


def canvas(title, kicker="SECRET POND PROOF · MIDNIGHT"):
    image = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((44, 38, 1236, 682), radius=26, fill=PANEL, outline="#30365f", width=2)
    draw.text((82, 72), kicker, font=font(18, True), fill=CYAN)
    draw.text((82, 112), title, font=font(46, True), fill=INK)
    return image, draw


def title_slide():
    image, draw = canvas("Prove the opportunity. Keep the route private.", "MIDNIGHT KOREA HACKATHON 2026")
    wrap(draw, "A zero-knowledge policy proof for time-sensitive market opportunities.", (84, 230), 1080, 35, MUTED)
    draw.rounded_rectangle((84, 408, 1195, 560), radius=22, fill="#090b1c", outline=PURPLE, width=3)
    draw.text((122, 445), "PRIVATE WITNESS  →  COMPACT CIRCUIT  →  PUBLIC PROOF", font=font(29, True), fill=INK)
    draw.text((84, 635), "Asset · venues · trade size · route remain hidden", font=font(22, True), fill=PURPLE)
    return image


def dashboard_slide():
    image, draw = canvas("The public result reveals zero route fields")
    source = Image.open(ROOT / "assets" / "secret-pond-evidence.png").convert("RGB")
    source = ImageOps.fit(source, (1070, 475), method=Image.Resampling.LANCZOS, centering=(.5, .44))
    image.paste(source, (105, 180))
    draw.rounded_rectangle((755, 195, 1175, 330), radius=16, fill="#090b1c", outline=GREEN, width=3)
    draw.text((785, 220), "POLICY PASSED", font=font(29, True), fill=GREEN)
    draw.text((785, 270), "Private fields disclosed: 0", font=font(21, True), fill=INK)
    return image


def policy_slide():
    image, draw = canvas("Three rules are enforced inside Compact")
    cards = [
        ("NET RETURN", "≥ 25 bps", "Profit remains after modeled costs", GREEN),
        ("BRIDGE TIME", "≤ 20 min", "The inventory path is fast enough", CYAN),
        ("LIQUIDITY", "≥ $10,000", "The market can support execution", PURPLE),
    ]
    for i, (label, value, detail, color) in enumerate(cards):
        x = 82 + i * 382
        draw.rounded_rectangle((x, 220, x + 350, 525), radius=20, fill="#090b1c", outline="#353b65", width=2)
        draw.text((x + 28, 258), label, font=font(18, True), fill=color)
        draw.text((x + 28, 315), value, font=font(42, True), fill=INK)
        wrap(draw, detail, (x + 28, 400), 285, 22, MUTED)
    draw.text((84, 625), "Only a commitment and proof counter enter public state.", font=font(22, True), fill=CYAN)
    return image


def rejection_slide():
    image, draw = canvas("Invalid opportunities fail before disclosure")
    draw.rounded_rectangle((84, 220, 560, 535), radius=20, fill="#090b1c", outline=RED, width=3)
    draw.text((120, 260), "PRIVATE INPUT", font=font(18, True), fill=MUTED)
    draw.text((120, 318), "24 bps", font=font(64, True), fill=RED)
    draw.text((120, 415), "Below the 25 bps policy", font=font(23, True), fill=INK)
    draw.rounded_rectangle((650, 220, 1195, 535), radius=20, fill="#090b1c", outline="#353b65", width=2)
    draw.text((690, 260), "CIRCUIT RESULT", font=font(18, True), fill=MUTED)
    draw.text((690, 318), "REJECTED", font=font(54, True), fill=RED)
    wrap(draw, "The proof counter does not advance and the private route is never published.", (690, 405), 450, 23, MUTED)
    return image


def proof_slide():
    image, draw = canvas("A real proof finalized on Midnight Preview")
    rows = [
        ("Contract", "5ff4ed8e…b53eea"),
        ("Transaction", "009f5592…638d9920"),
        ("Block", "925,805"),
        ("Accepted proofs", "1"),
        ("Public commitment", "f1947e77…bc0a9d1"),
    ]
    y = 215
    for label, value in rows:
        draw.rounded_rectangle((84, y, 1195, y + 70), radius=12, fill="#090b1c", outline="#2b3157", width=1)
        draw.text((112, y + 22), label, font=font(20, True), fill=MUTED)
        draw.text((445, y + 20), value, font=font(23, True), fill=GREEN if label in ("Block", "Accepted proofs") else INK)
        y += 82
    draw.text((84, 635), "Proof server 8.1.0 · Midnight.js 4.1.1 · public indexer verified", font=font(21, True), fill=CYAN)
    return image


def close_slide():
    image, draw = canvas("Audit the policy without revealing the edge")
    wrap(draw, "Nine tests cover acceptance, every rejection path, persistent state, commitment binding, and privacy output.", (84, 225), 1080, 34, MUTED)
    draw.rounded_rectangle((84, 420, 1195, 555), radius=20, fill="#090b1c", outline=PURPLE, width=3)
    draw.text((122, 457), "PRIVATE FACTS  ·  PUBLIC ASSURANCE  ·  USER CONTROL", font=font(30, True), fill=INK)
    draw.text((84, 635), "github.com/daveaire/midnight-secret-pond", font=font(22, True), fill=CYAN)
    return image


SLIDES = [
    (title_slide, "Secret Pond Proof proves that a time-sensitive market opportunity satisfies policy without revealing the asset, venues, position size, route, or salt. It resolves a practical conflict: an operator needs auditability, but publishing the evidence can destroy the edge being proved."),
    (dashboard_slide, "The dashboard shows the product boundary. A successful proof returns a policy-passed result, a binding commitment, and an accepted-proof count. The four commercially sensitive field groups remain hidden. The public response discloses zero private fields."),
    (policy_slide, "Private witnesses enter a generated Midnight Compact circuit. The circuit enforces three public rules: net return must be at least twenty-five basis points, bridge time must be at most twenty minutes, and executable liquidity must be at least ten thousand dollars. Only the commitment and proof counter become public ledger state."),
    (rejection_slide, "Policy failure happens inside the circuit. If net return is twenty-four basis points, the assertion rejects the opportunity. The accepted-proof counter does not advance, and the private route is never published. The tests also cover the bridge-time and liquidity rejection paths."),
    (proof_slide, "This is not only a local demonstration. A real proof-server transaction finalized on Midnight Preview at block nine hundred twenty-five thousand eight hundred five. The public indexer returned one accepted proof and the commitment. The route label and economic inputs stayed in encrypted local private state."),
    (close_slide, "Nine tests execute the generated Compact state machine and verify every policy path and privacy boundary. Secret Pond Proof lets an operator prove that an opportunity satisfies profitability, speed, and liquidity policy while keeping the market route confidential. The public source is available at github dot com slash daveaire slash midnight-secret-pond."),
]


def run():
    OUT.mkdir(exist_ok=True)
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    segments = []
    for index, (make_slide, narration) in enumerate(SLIDES, 1):
        slide = OUT / f"slide-{index:02d}.png"
        audio = OUT / f"audio-{index:02d}.mp3"
        segment = OUT / f"segment-{index:02d}.mp4"
        make_slide().save(slide)
        subprocess.run([
            "edge-tts", "--voice", "en-US-AndrewMultilingualNeural", "--rate=-4%", "--pitch=-2Hz",
            "--text", narration, "--write-media", str(audio),
        ], check=True)
        subprocess.run([
            ffmpeg, "-y", "-loop", "1", "-framerate", "30", "-i", str(slide), "-i", str(audio),
            "-c:v", "libx264", "-tune", "stillimage", "-c:a", "aac", "-b:a", "160k",
            "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-pix_fmt", "yuv420p", "-shortest",
            "-movflags", "+faststart", str(segment),
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        segments.append(segment)

    listing = OUT / "segments.txt"
    listing.write_text("".join(f"file '{segment.name}'\n" for segment in segments))
    final = OUT / "secret-pond-proof-demo.mp4"
    subprocess.run([
        ffmpeg, "-y", "-f", "concat", "-safe", "0", "-i", str(listing),
        "-c", "copy", "-movflags", "+faststart", str(final),
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(final)


if __name__ == "__main__":
    run()
