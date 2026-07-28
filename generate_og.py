import os
import sys

try:
    from PIL import Image, ImageDraw, ImageFont, ImageFilter
except ImportError:
    print("Installing Pillow...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_og_image():
    # 1200x630 canvas
    width, height = 1200, 630
    
    # Background color - Dark futuristic
    bg_color = (6, 10, 24)
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)

    # Add gradient or subtle pattern
    for y in range(height):
        # subtle gradient from top to bottom
        r = int(6 + (24-6)*(y/height))
        g = int(10 + (32-10)*(y/height))
        b = int(24 + (52-24)*(y/height))
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Add abstract geometric shapes / blur
    blur_img = Image.new('RGBA', (width, height), (0,0,0,0))
    bdraw = ImageDraw.Draw(blur_img)
    # Blue glow sphere
    bdraw.ellipse([-200, -200, 400, 400], fill=(26, 107, 255, 30))
    bdraw.ellipse([800, 300, 1500, 1000], fill=(14, 165, 233, 20))
    
    blur_img = blur_img.filter(ImageFilter.GaussianBlur(100))
    img.paste(blur_img, (0, 0), blur_img)

    # Paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    assets_dir = os.path.join(base_dir, 'assets', 'images')
    logo_path = os.path.join(assets_dir, 'logo.png')
    
    # Load and place Logo
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert("RGBA")
        # Resize logo to a reasonable width
        target_width = 300
        w_percent = (target_width / float(logo.size[0]))
        target_height = int((float(logo.size[1]) * float(w_percent)))
        logo = logo.resize((target_width, target_height), Image.Resampling.LANCZOS)
        
        # Center horizontally, place in upper third
        logo_x = (width - target_width) // 2
        logo_y = 120
        img.paste(logo, (logo_x, logo_y), logo)
    
    # We don't have font files, so we'll just try standard ones or use ImageDraw text
    try:
        title_font = ImageFont.truetype("arialbd.ttf", 64)
        subtitle_font = ImageFont.truetype("arial.ttf", 40)
        footer_font = ImageFont.truetype("arial.ttf", 32)
    except:
        try:
            title_font = ImageFont.truetype("segoeuib.ttf", 64)
            subtitle_font = ImageFont.truetype("segoeui.ttf", 40)
            footer_font = ImageFont.truetype("segoeui.ttf", 32)
        except:
            title_font = ImageFont.load_default()
            subtitle_font = ImageFont.load_default()
            footer_font = ImageFont.load_default()

    # Draw text
    title = "AeroLifeLine"
    subtitle = "AI-powered Emergency Response Platform"
    tagline = "Emergency Medical Mobility"
    website = "skyflyaviations.in"
    
    # Function to center text horizontally
    def draw_text_centered(d, text, font, y_pos, color):
        try:
            # Pillow 8.0+
            bbox = font.getbbox(text)
            tw = bbox[2] - bbox[0]
        except AttributeError:
            tw, th = d.textsize(text, font=font)
        x_pos = (width - tw) // 2
        d.text((x_pos, y_pos), text, font=font, fill=color)
    
    # Only draw text if we got proper fonts, default font is too small
    if title_font != ImageFont.load_default():
        draw_text_centered(draw, title, title_font, 300, (255, 255, 255))
        draw_text_centered(draw, subtitle, subtitle_font, 390, (148, 163, 184))
        draw_text_centered(draw, tagline, subtitle_font, 450, (26, 107, 255))
        draw_text_centered(draw, website, footer_font, 550, (100, 116, 139))
    
    # Save image
    output_path = os.path.join(assets_dir, 'og-image.png')
    img.save(output_path, "PNG")
    print(f"Created OG image at: {output_path}")

if __name__ == "__main__":
    create_og_image()